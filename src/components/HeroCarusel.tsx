"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { OrderCtaButton } from "@/components/OrderCtaButton";
import { company } from "@/data/coffee";
import { roastingSlides } from "@/data/carousel";

const AUTO_INTERVAL_MS = 6000;

/** Точка фокуса фото по id слайда, чтобы на узких экранах в кадре оставалось главное.
 *  Формат как у CSS object-position: "center 30%", "left center" и т.п.
 *  По умолчанию берётся центр. Пример: { cupping: "center 35%" } */
const imageFocus: Record<string, string> = {};

const facts = [
  { label: "Свежесть", value: "1–3 дня после обжарки" },
  { label: "Обжарка и развоз", value: "четверг и пятница" },
  { label: "Партия", value: "до 5 кг" },
  { label: "Самовывоз", value: "ул. Короля, 9" },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // false, пока страница не загрузилась: до этого грузим только первое фото
  const [ready, setReady] = useState(false);
  const count = roastingSlides.length;

  const goTo = useCallback(
    (n: number) => setIndex(((n % count) + count) % count),
    [count],
  );

  useEffect(() => {
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setReady(true), 800);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ready || paused || reduce) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTO_INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [ready, paused, count]);

  const slide = roastingSlides[index];

  const arrowButtons = [
    { label: "Предыдущий слайд", d: "M13 5L7 11l6 6", go: () => goTo(index - 1) },
    { label: "Следующий слайд", d: "M9 5l6 6-6 6", go: () => goTo(index + 1) },
  ];

  // Рендерим только текущий слайд и соседние, чтобы не грузить все фото сразу
  const near = (i: number) =>
    i === index ||
    (ready && (i === (index + 1) % count || i === (index - 1 + count) % count));

  return (
    <section
      className="relative isolate overflow-hidden bg-coffee text-cream"
      aria-roledescription="carousel"
      aria-label="Как мы обжариваем кофе"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      {/* Фото: на телефоне отдельный блок сверху, с lg — фон всей секции */}
      <div className="relative h-[30svh] min-h-[190px] lg:absolute lg:inset-0 lg:-z-10 lg:h-auto">
        {roastingSlides.map((item, i) =>
          near(i) ? (
            <Image
              key={item.id}
              src={item.image}
              alt={i === index ? item.imageAlt : ""}
              fill
              priority={i === 0}
              quality={75}
              sizes="100vw"
              style={{ objectPosition: imageFocus[item.id] ?? "center" }}
              className={`object-cover transition-opacity duration-1000 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== index}
            />
          ) : null,
        )}
        {/* На телефоне фото переходит в тёмный фон ниже; на компьютере затемнение под текст */}
        <div className="absolute inset-0 bg-gradient-to-t from-coffee via-coffee/10 to-transparent lg:via-coffee/70 lg:to-coffee/35" />

        {/* Телефон: стрелки по краям фото (без свайпов, чтобы не конфликтовать с жестом «назад») */}
        <div className="lg:hidden">
          {arrowButtons.map((b, i) => (
            <button
              key={b.label}
              type="button"
              onClick={b.go}
              aria-label={b.label}
              className={`absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-coffee shadow-md transition-colors active:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream ${
                i === 0 ? "left-3" : "right-3"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden>
                <path d={b.d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-coffee/75 px-3 py-1 text-sm font-medium text-cream">
            {index + 1} / {count}
          </p>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-5 pb-10 pt-4 sm:px-8 lg:min-h-[100svh] lg:justify-end lg:px-10 lg:pt-28">
        <p className="hidden text-base font-medium text-cream sm:block sm:text-lg">
          Ремесленная обжарка в Минске, с {company.sinceYear} года
        </p>
        <h1 className="max-w-4xl font-serif text-[1.75rem] font-semibold leading-[1.15] text-balance sm:mt-4 sm:text-5xl lg:text-7xl">
          Свежий кофе из Минска. Обжариваем по четвергам, привозим по пятницам
        </h1>
        <p className="mt-6 hidden max-w-2xl text-lg leading-relaxed text-cream sm:block sm:text-xl">
          Небольшие партии и зерно без долгого хранения. Закажите пачку или
          подписку — доставим по городу или заберите сами.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
          <OrderCtaButton interest="one-time" className="shadow-lg shadow-black/30">
            Заказать кофе
          </OrderCtaButton>
          <OrderCtaButton
            interest="subscription"
            variant="secondary"
            className="border-cream bg-coffee/60 text-cream hover:bg-coffee"
          >
            Оформить подписку
          </OrderCtaButton>
          <a
            href="#assortment"
            className="inline-flex items-center justify-center rounded-lg px-4 py-3 text-base font-medium text-cream underline underline-offset-4 hover:no-underline"
          >
            Смотреть ассортимент
          </a>
        </div>

        {/* Карусель: текущий шаг + стрелки */}
        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-6">
          <div className="rounded-2xl bg-cream p-5 text-coffee shadow-xl shadow-black/30 sm:p-8">
            <p className="text-base font-semibold text-terracotta-dark">
              Шаг {index + 1} из {count}
            </p>
            <h2 className="mt-2 font-serif text-xl font-semibold sm:text-3xl">
              {slide.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed sm:text-lg">
              {slide.description}
            </p>
          </div>

          <div className="hidden gap-3 lg:flex">
            {arrowButtons.map((b) => (
              <button
                key={b.label}
                type="button"
                onClick={b.go}
                aria-label={b.label}
                className="grid size-14 place-items-center rounded-full bg-cream text-coffee transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                  <path d={b.d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Миниатюры — навигация по фото */}
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Слайды">
          {roastingSlides.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={item.title}
              onClick={() => goTo(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all sm:h-20 sm:w-32 ${
                i === index
                  ? "ring-2 ring-cream ring-offset-2 ring-offset-coffee"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {ready ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  quality={50}
                  sizes="128px"
                  style={{ objectPosition: imageFocus[item.id] ?? "center" }}
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 bg-cream/15" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Факты: сплошная полоса */}
      <div className="relative z-10 border-t border-cream/25 bg-coffee">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-6 sm:px-8 lg:grid-cols-4 lg:px-10">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-sm text-cream/75">{f.label}</dt>
              <dd className="mt-1 text-base font-medium text-cream sm:text-lg">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="sr-only" aria-live="polite">
        {slide.title}. {slide.description}
      </p>
    </section>
  );
}