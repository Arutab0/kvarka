import type { StoredLead } from "@/lib/leads-file";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const typeLabel: Record<string, string> = {
  subscription: "Подписка",
  order: "Разовый заказ",
  question: "Вопрос",
};

/** Бросает исключение при сбое — route.ts его ловит и пишет в лог,
 *  заявка при этом уже сохранена. Без токена тихо ничего не делает. */
export async function notifyTelegramLead(lead: StoredLead): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const utm = lead.utm
    ? Object.entries(lead.utm)
        .filter(([, v]) => v)
        .map(([k, v]) => `${esc(k)}: ${esc(String(v))}`)
        .join("\n")
    : "";

  const text = [
    `<b>Новая заявка: ${esc(typeLabel[lead.type] ?? lead.type)}</b>`,
    `Имя: ${esc(lead.name)}`,
    `Телефон: ${esc(lead.phone)}`,
    lead.comment ? `Комментарий: ${esc(lead.comment)}` : "",
    utm ? `\n<b>Источник</b>\n${utm}` : "\nИсточник: прямой заход",
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) {
    throw new Error(`Telegram responded ${res.status}`);
  }
}
