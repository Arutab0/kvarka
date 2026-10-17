const KEY = "kvarta_attribution";

const PARAMS = {
  source: "utm_source",
  medium: "utm_medium",
  campaign: "utm_campaign",
  content: "utm_content",
  term: "utm_term",
  gclid: "gclid",
  yclid: "yclid",
  fbclid: "fbclid",
} as const;

export type Attribution = Partial<
  Record<keyof typeof PARAMS | "referrer" | "landing" | "page", string>
>;

/** Вызвать один раз при загрузке сайта (например, в useEffect в SiteProviders).
 *  Метки сохраняются в sessionStorage, чтобы не пропасть при перезагрузке
 *  или переходе по якорям. Новые рекламные метки заменяют старые. */
export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const [key, param] of Object.entries(PARAMS)) {
      const value = params.get(param);
      if (value) found[key as keyof typeof PARAMS] = value;
    }
    if (sessionStorage.getItem(KEY) && Object.keys(found).length === 0) return;
    sessionStorage.setItem(
      KEY,
      JSON.stringify({
        ...found,
        referrer: document.referrer || undefined,
        landing: window.location.pathname + window.location.search,
      }),
    );
  } catch {
    /* sessionStorage недоступен (приватный режим) — не страшно */
  }
}

/** Вызвать при отправке формы: вернёт сохранённые метки + текущую страницу. */
export function getAttribution(): Attribution {
  let saved: Attribution = {};
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) saved = JSON.parse(raw) as Attribution;
  } catch {
    /* ignore */
  }
  return {
    ...saved,
    page: window.location.pathname + window.location.search,
  };
}
