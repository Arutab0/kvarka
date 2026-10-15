import { validateBelarusPhone } from "@/lib/belarus-phone";
import {
  checkDuplicateSubmission,
  releaseSubmissionSlot,
  reserveSubmissionSlot,
} from "@/lib/lead-dedupe";
import {
  appendLead,
  type LeadType,
  type LeadUtm,
  type StoredLead,
} from "@/lib/leads-file";
import { notifyTelegramLead } from "@/lib/telegram-lead";

const LEAD_TYPES = new Set<LeadType>(["subscription", "order", "question"]);

type LeadRequestBody = {
  name?: unknown;
  phone?: unknown;
  type?: unknown;
  comment?: unknown;
  utm?: unknown;
};

function parseUtm(value: unknown): LeadUtm | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const raw = value as Record<string, unknown>;
  const utm: LeadUtm = {};
  const keys = [
    "source",
    "medium",
    "campaign",
    "content",
    "term",
    "referrer",
  ] as const;
  for (const key of keys) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) {
      utm[key] = v.trim();
    }
  }
  return Object.keys(utm).length > 0 ? utm : undefined;
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return Response.json(body, { status });
}

export async function POST(request: Request): Promise<Response> {
  let body: LeadRequestBody;
  try {
    body = (await request.json()) as LeadRequestBody;
  } catch {
    return jsonResponse({ error: "Некорректный JSON в теле запроса" }, 400);
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    return jsonResponse({ error: "Укажите имя" }, 400);
  }

  const phoneRaw = typeof body.phone === "string" ? body.phone : "";
  const phoneResult = validateBelarusPhone(phoneRaw);
  if (!phoneResult.ok) {
    return jsonResponse({ error: phoneResult.error }, 400);
  }

  const type = body.type;
  if (typeof type !== "string" || !LEAD_TYPES.has(type as LeadType)) {
    return jsonResponse(
      { error: "Укажите тип заявки: subscription, order или question" },
      400,
    );
  }

  const comment =
    typeof body.comment === "string" && body.comment.trim()
      ? body.comment.trim()
      : undefined;

  const utm = parseUtm(body.utm);
  const phoneKey = phoneResult.digitsKey;

  if (checkDuplicateSubmission(phoneKey)) {
    return jsonResponse(
      {
        error:
          "Заявка с этого номера уже принята. Менеджер свяжется с вами в ближайшее время.",
      },
      429,
    );
  }

  reserveSubmissionSlot(phoneKey);

  const lead: StoredLead = {
    timestamp: new Date().toISOString(),
    name,
    phone: phoneResult.normalized,
    type: type as LeadType,
    ...(comment ? { comment } : {}),
    ...(utm ? { utm } : {}),
  };

  try {
    await appendLead(lead);
  } catch {
    releaseSubmissionSlot(phoneKey);
    return jsonResponse(
      { error: "Не удалось сохранить заявку. Попробуйте позже." },
      500,
    );
  }

  try {
    await notifyTelegramLead(lead);
  } catch (error) {
    console.error("Telegram lead notification failed:", error);
  }

  return jsonResponse(
    { ok: true, message: "Заявка принята. Мы скоро свяжемся с вами." },
    200,
  );
}
