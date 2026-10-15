"use client";

import { useState, type FormEvent } from "react";
import { orderInterestOptions, type OrderInterest } from "@/data/coffee";

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

const initialForm: FormState = {
  name: "",
  phone: "",
  interest: "",
  comment: "",
};

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

export function OrderForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
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
        setFormError(
          data.error ??
            "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
        );
        return;
      }

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch {
      setFormError("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl border border-olive/30 bg-cream p-8 text-center"
        role="status"
      >
        <p className="font-serif text-xl text-coffee">Спасибо за заявку</p>
        <p className="mt-2 text-coffee/75">
          Мы свяжемся с вами в ближайшее время по указанному телефону.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-medium text-terracotta underline-offset-4 hover:underline"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-coffee/10 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      {formError ? (
        <p
          className="rounded-lg border border-terracotta/30 bg-terracotta/10 px-4 py-3 text-sm text-coffee"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <div>
        <label htmlFor="order-name" className="block text-sm font-medium text-coffee">
          Имя
        </label>
        <input
          id="order-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="mt-1.5 w-full rounded-lg border border-coffee/15 bg-cream px-4 py-2.5 text-coffee outline-none ring-terracotta/40 placeholder:text-coffee/40 focus:border-terracotta focus:ring-2"
          placeholder="Как к вам обращаться"
        />
        {errors.name ? (
          <p className="mt-1 text-sm text-terracotta">{errors.name}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="order-phone" className="block text-sm font-medium text-coffee">
          Телефон
        </label>
        <input
          id="order-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) =>
            setForm((f) => ({ ...f, phone: normalizePhone(e.target.value) }))
          }
          className="mt-1.5 w-full rounded-lg border border-coffee/15 bg-cream px-4 py-2.5 text-coffee outline-none ring-terracotta/40 placeholder:text-coffee/40 focus:border-terracotta focus:ring-2"
          placeholder="+375 29 XXX-XX-XX"
        />
        {errors.phone ? (
          <p className="mt-1 text-sm text-terracotta">{errors.phone}</p>
        ) : null}
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-coffee">
          Что интересует
        </legend>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-4">
          {orderInterestOptions.map((opt) => (
            <label
              key={opt.value}
              className="flex cursor-pointer items-center gap-2 text-coffee/90"
            >
              <input
                type="radio"
                name="interest"
                value={opt.value}
                checked={form.interest === opt.value}
                onChange={() =>
                  setForm((f) => ({ ...f, interest: opt.value }))
                }
                className="size-4 border-coffee/30 text-terracotta focus:ring-terracotta"
              />
              {opt.label}
            </label>
          ))}
        </div>
        {errors.interest ? (
          <p className="mt-1 text-sm text-terracotta">{errors.interest}</p>
        ) : null}
      </fieldset>

      <div>
        <label htmlFor="order-comment" className="block text-sm font-medium text-coffee">
          Комментарий
        </label>
        <textarea
          id="order-comment"
          name="comment"
          rows={4}
          value={form.comment}
          onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
          className="mt-1.5 w-full resize-y rounded-lg border border-coffee/15 bg-cream px-4 py-2.5 text-coffee outline-none ring-terracotta/40 placeholder:text-coffee/40 focus:border-terracotta focus:ring-2"
          placeholder="Сорта, количество, удобное время звонка"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? "Отправляем…" : "Отправить заявку"}
      </button>
    </form>
  );
}
