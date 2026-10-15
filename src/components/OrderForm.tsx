"use client";

import { useState, type FormEvent } from "react";
import { orderInterestOptions, type OrderInterest } from "@/data/coffee";

type FormState = {
  name: string;
  phone: string;
  interest: OrderInterest | "";
  comment: string;
};

const initialForm: FormState = {
  name: "",
  phone: "",
  interest: "",
  comment: "",
};

function normalizePhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, "");
}

export function OrderForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) {
      next.name = "Укажите имя";
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 9) {
      next.phone = "Укажите корректный телефон";
    }
    if (!form.interest) {
      next.interest = "Выберите, что вас интересует";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
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
          placeholder="+375 …"
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
        className="w-full rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-dark sm:w-auto"
      >
        Отправить заявку
      </button>
    </form>
  );
}
