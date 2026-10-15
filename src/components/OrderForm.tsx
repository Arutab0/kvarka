"use client";

import { useState, type FormEvent } from "react";
import { orderInterestOptions, type OrderInterest } from "@/data/coffee";
import { useToast } from "@/components/ToastProvider";

type FormState = {
  name: string;
  phone: string;
  interest: OrderInterest | "";
  comment: string;
};

type LeadUtmPayload = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  referrer?: string;
};

export type OrderFormProps = {
  defaultInterest?: OrderInterest;
  defaultComment?: string;
  onSuccess?: () => void;
  variant?: "modal" | "default";
};

const initialForm = (
  defaults?: Pick<OrderFormProps, "defaultInterest" | "defaultComment">,
): FormState => ({
  name: "",
  phone: "",
  interest: defaults?.defaultInterest ?? "",
  comment: defaults?.defaultComment ?? "",
});

const interestToApiType: Record<OrderInterest, "subscription" | "order" | "question"> = {
  subscription: "subscription",
  "one-time": "order",
  question: "question",
};

function normalizePhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "");
}

function collectUtmFromLocation(): LeadUtmPayload | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }
  const params = new URLSearchParams(window.location.search);
  const utm: LeadUtmPayload = {};
  const map: Record<keyof LeadUtmPayload, string> = {
    source: "utm_source",
    medium: "utm_medium",
    campaign: "utm_campaign",
    content: "utm_content",
    term: "utm_term",
    referrer: "",
  };
  (Object.keys(map) as (keyof LeadUtmPayload)[]).forEach((key) => {
    if (key === "referrer") {
      if (document.referrer) {
        utm.referrer = document.referrer;
      }
      return;
    }
    const value = params.get(map[key]);
    if (value) {
      utm[key] = value;
    }
  });
  return Object.keys(utm).length > 0 ? utm : undefined;
}

/* Общие стили: крупнее на телефоне, компактнее с sm (640px) */
const labelClass = "block text-[15px] font-semibold text-coffee";
const fieldBase =
  "mt-1.5 w-full rounded-lg border bg-white px-3.5 py-3 text-base text-coffee outline-none transition-colors placeholder:text-coffee-soft/60 focus:ring-2 focus:ring-terracotta/25 sm:py-2.5";
const fieldOk = "border-coffee/25 hover:border-coffee/45 focus:border-terracotta";
const fieldError = "border-terracotta focus:border-terracotta";
const errorClass = "mt-1.5 text-sm font-medium text-terracotta-dark";

export function OrderForm({
  defaultInterest,
  defaultComment = "",
  onSuccess,
  variant = "default",
}: OrderFormProps) {
  const { showToast } = useToast();
  const [form, setForm] = useState<FormState>(() =>
    initialForm({ defaultInterest, defaultComment }),
  );
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formShell =
    variant === "modal"
      ? "space-y-4 sm:space-y-5"
      : "space-y-4 rounded-2xl border border-coffee/15 bg-white p-6 shadow-sm sm:space-y-5 sm:p-8";

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) {
      next.name = "Укажите имя";
    }
    if (!form.phone.trim()) {
      next.phone = "Укажите телефон";
    }
    if (!form.interest) {
      next.interest = "Выберите, что вас интересует";
    }
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const first = next.name ?? next.phone ?? next.interest;
      if (first) {
        showToast("error", first);
      }
    }

    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate() || !form.interest) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone,
          type: interestToApiType[form.interest],
          comment: form.comment.trim() || undefined,
          utm: collectUtmFromLocation(),
        }),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        showToast(
          "error",
          data.error ??
            "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
        );
        return;
      }

      showToast(
        "success",
        "Заявка успешно отправлена! Менеджер свяжется с вами.",
      );
      setForm(initialForm({ defaultInterest, defaultComment }));
      setErrors({});
      onSuccess?.();
    } catch {
      showToast(
        "error",
        "Нет связи с сервером. Проверьте интернет и попробуйте снова.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={formShell} noValidate>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="order-name" className={labelClass}>
            Имя
          </label>
          <input
            id="order-name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "order-name-error" : undefined}
            className={`${fieldBase} ${errors.name ? fieldError : fieldOk}`}
            placeholder="Как к вам обращаться"
          />
          {errors.name ? (
            <p id="order-name-error" className={errorClass}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="order-phone" className={labelClass}>
            Телефон
          </label>
          <input
            id="order-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) =>
              setForm((f) => ({ ...f, phone: normalizePhone(e.target.value) }))
            }
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "order-phone-error" : undefined}
            className={`${fieldBase} ${errors.phone ? fieldError : fieldOk}`}
            placeholder="+375 29 XXX-XX-XX"
          />
          {errors.phone ? (
            <p id="order-phone-error" className={errorClass}>
              {errors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Что интересует</legend>
        <div
          className={`mt-1.5 flex overflow-hidden rounded-lg border bg-white ${
            errors.interest ? "border-terracotta" : "border-coffee/25"
          }`}
        >
          {orderInterestOptions.map((opt) => (
            <label
              key={opt.value}
              className="relative flex-1 cursor-pointer border-l border-coffee/20 first:border-l-0"
            >
              <input
                type="radio"
                name="interest"
                value={opt.value}
                checked={form.interest === opt.value}
                onChange={() =>
                  setForm((f) => ({ ...f, interest: opt.value }))
                }
                className="peer sr-only"
              />
              <span className="flex h-full items-center justify-center px-2 py-3 text-center text-[15px] font-medium leading-tight text-coffee transition-colors hover:bg-cream peer-checked:bg-coffee peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-inset peer-focus-visible:ring-terracotta sm:py-2.5">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        {errors.interest ? (
          <p className={errorClass}>{errors.interest}</p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="order-comment" className={labelClass}>
          Комментарий{" "}
          <span className="font-normal text-coffee-soft">(по желанию)</span>
        </label>
        <textarea
          id="order-comment"
          name="comment"
          rows={3}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          className={`${fieldBase} ${fieldOk} resize-none`}
          placeholder="Сорта, количество, удобное время звонка"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-terracotta px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coffee disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}