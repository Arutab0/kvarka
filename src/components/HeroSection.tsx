"use client";

import { OrderCtaButton } from "@/components/OrderCtaButton";
import { company } from "@/data/coffee";

const highlights = [
  { label: "Свежесть", value: "1–3 дня после обжарки" },
  { label: "Партия", value: "до 5 кг" },
  { label: "Самовывоз", value: "ул. Короля, 9" },
];

export function HeroSection() {
  return (
    <section className="hero-surface relative overflow-hidden border-b border-coffee/20">
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/70 sm:text-sm">
              Ремесленная обжарка · Минск
            </p>
            <h1 className="mt-5 font-serif text-[2rem] leading-[1.15] text-cream text-balance sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]">
              <span className="block">Свежий кофе из Минска.</span>
              <span className="mt-2 block text-cream/95">
                Обжариваем по четвергам,{" "}
                <span className="text-[#e8c4a8]">привозим по пятницам</span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
              Небольшие партии, зерно без долгого хранения. Закажите пачку или
              подписку — доставим по городу или заберите сами.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <OrderCtaButton interest="one-time" className="shadow-md shadow-black/20">
                Заказать кофе
              </OrderCtaButton>
              <OrderCtaButton
                interest="subscription"
                variant="secondary"
                className="border-cream/35 bg-cream/5 text-cream hover:border-cream/55 hover:bg-cream/10"
              >
                Оформить подписку
              </OrderCtaButton>
              <a
                href="#assortment"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-sm font-medium text-cream/80 underline-offset-4 transition-colors hover:text-cream hover:underline sm:px-2"
              >
                Смотреть ассортимент
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 xl:col-span-4">
            <div className="rounded-2xl border border-cream/15 bg-cream/10 p-5 backdrop-blur-sm sm:p-6">
              <p className="text-xs font-medium uppercase tracking-widest text-[#e8c4a8]">
                Кварта · с {company.sinceYear} года
              </p>
              <ul className="mt-4 space-y-4">
                {highlights.map((item) => (
                  <li
                    key={item.label}
                    className="flex gap-3 border-b border-cream/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span
                      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-terracotta"
                      aria-hidden
                    />
                    <div>
                      <p className="text-sm font-medium text-cream">{item.label}</p>
                      <p className="text-sm text-cream/75">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full border border-cream/20 bg-coffee/40 px-3 py-1 text-xs font-medium text-cream/90">
                  Четверг — обжарка
                </span>
                <span className="rounded-full border border-cream/20 bg-coffee/40 px-3 py-1 text-xs font-medium text-cream/90">
                  Пятница — развоз
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
