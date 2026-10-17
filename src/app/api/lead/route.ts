import { validateBelarusPhone } from "@/lib/belarus-phone";
import {
  releaseSubmissionSlot,
  reserveSubmissionSlot,
} from "@/lib/lead-dedupe";
import {
  type LeadType,
  type LeadUtm,
  type StoredLead,
} from "@/lib/leads-file";
import { saveLead } from "@/lib/leads-store";
import { notifyTelegramLead } from "@/lib/telegram-lead";

const LEAD_TYPES = new Set<LeadType>(["subscription", "order", "question"]);

const MAX_NAME = 100;
const MAX_COMMENT = 1000;
const MAX_ATTR = 500;

type LeadRequestBody = {
  name?: unknown;
  phone?: unknown;
  type?: unknown;
  comment?: unknown;
  utm?: unknown;
};

// Тип LeadUtm в lib/leads-file.ts нужно расширить теми же ключами.
const UTM_KEYS = [
  "source",
  "medium",
  "campaign",
  "content",
  "term",
  "referrer",
  "page",
  "landing",
  "gclid",
  "yclid",
  "fbclid",
] as const;

function parseUtm(value: unknown): LeadUtm | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }
  const raw = value as Record<string, unknown>;
  const utm: LeadUtm = {};
  for (const key of UTM_KEYS) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) {
      utm[key] = v.trim().slice(0, MAX_ATTR);
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

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, MAX_NAME) : "";
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
      ? body.comment.trim().slice(0, MAX_COMMENT)
      : undefined;

  const utm = parseUtm(body.utm);
  const phoneKey = phoneResult.digitsKey;

  // Атомарная проверка и резервирование: false — такой номер уже подавал заявку
  const reserved = await reserveSubmissionSlot(phoneKey);
  if (!reserved) {
    return jsonResponse(
      {
        error:
          "Заявка с этого номера уже принята. Менеджер свяжется с вами в ближайшее время.",
      },
      429,
    );
  }

  const lead: StoredLead = {
    timestamp: new Date().toISOString(),
    name,
    phone: phoneResult.normalized,
    type: type as LeadType,
    ...(comment ? { comment } : {}),
    ...(utm ? { utm } : {}),
  };

  try {
    await saveLead(lead);
  } catch (error) {
    console.error("Saving lead failed:", error);
    await releaseSubmissionSlot(phoneKey);
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
