import type { LeadType, LeadUtm, StoredLead } from "@/lib/leads-file";

const TYPE_LABELS: Record<LeadType, string> = {
  subscription: "Подписка",
  order: "Разовый заказ",
  question: "Вопрос",
};

function escapeMarkdown(text: string): string {
  return text.replace(/([_*`\[])/g, "\\$1");
}

function formatUtmBlock(utm?: LeadUtm): string {
  if (!utm) {
    return "";
  }
  const lines: string[] = [];
  if (utm.source) lines.push(`source: ${utm.source}`);
  if (utm.medium) lines.push(`medium: ${utm.medium}`);
  if (utm.campaign) lines.push(`campaign: ${utm.campaign}`);
  if (utm.content) lines.push(`content: ${utm.content}`);
  if (utm.term) lines.push(`term: ${utm.term}`);
  if (utm.referrer) lines.push(`referrer: ${utm.referrer}`);
  if (lines.length === 0) {
    return "";
  }
  return `\n\n*UTM*\n${lines.map((l) => escapeMarkdown(l)).join("\n")}`;
}

export async function notifyTelegramLead(lead: StoredLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return;
  }

  const commentBlock = lead.comment?.trim()
    ? `\n\n*Комментарий*\n${escapeMarkdown(lead.comment.trim())}`
    : "";

  const text = [
    "*Новая заявка · Кварта*",
    "",
    `*Имя:* ${escapeMarkdown(lead.name)}`,
    `*Телефон:* ${escapeMarkdown(lead.phone)}`,
    `*Тип:* ${escapeMarkdown(TYPE_LABELS[lead.type])}`,
    `*Время:* ${escapeMarkdown(lead.timestamp)}`,
    commentBlock,
    formatUtmBlock(lead.utm),
  ]
    .filter(Boolean)
    .join("\n");

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API ${response.status}: ${body}`);
  }
}
