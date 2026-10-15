const OPERATORS = new Set(["29", "25", "44", "33"]);

const PHONE_ERROR =
  "Укажите верный белорусский номер телефона (+375 XX XXX-XX-XX)";

export function digitsOnly(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function validateBelarusPhone(
  input: string,
):
  | { ok: true; normalized: string; digitsKey: string }
  | { ok: false; error: string } {
  const digits = digitsOnly(input);

  if (digits.length === 12 && digits.startsWith("375")) {
    const operator = digits.slice(3, 5);
    const subscriber = digits.slice(5);
    if (OPERATORS.has(operator) && subscriber.length === 7) {
      return { ok: true, normalized: formatDisplay(digits), digitsKey: digits };
    }
  }

  if (digits.length === 11 && digits.startsWith("80")) {
    const operator = digits.slice(2, 4);
    const subscriber = digits.slice(4);
    if (OPERATORS.has(operator) && subscriber.length === 7) {
      const international = `375${operator}${subscriber}`;
      return {
        ok: true,
        normalized: formatDisplay(international),
        digitsKey: international,
      };
    }
  }

  return { ok: false, error: PHONE_ERROR };
}

function formatDisplay(digits12: string): string {
  const op = digits12.slice(3, 5);
  const a = digits12.slice(5, 8);
  const b = digits12.slice(8, 10);
  const c = digits12.slice(10, 12);
  return `+375 ${op} ${a}-${b}-${c}`;
}

export { PHONE_ERROR };
