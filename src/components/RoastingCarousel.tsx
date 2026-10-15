"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { roastingSlides } from "@/data/carousel";

const AUTO_INTERVAL_MS = 5500;

const processTags = [
  {
    id: "fresh",
    label: "Свежесть 1–3 дня",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M8 2v4M8 10v4M2 8h4M10 8h4"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    id: "roast",
    label: "Обжарка по четвергам",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M4 12c2-4 6-4 8-8-2 2-6 2-8 6z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "delivery",
    label: "Развоз по пятницам",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d="M2 11h1.2a1.5 1.5 0 003 0H9a1.5 1.5 0 003 0h2V6H2v5zM2 6l1.5-3h7L12 6"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function RoastingCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = roastingSlides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) {
      return;
    }
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTO_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [paused, count]);

  const slide = roastingSlides[index];

  return (
    <section
      className="section-dark relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:py-20"
      aria-roledescription="carousel"
      aria-label="Как мы обжариваем кофе"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-60" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8c4a8] sm:text-sm">
              Процесс
            </p>
            <h2 className="mt-3 font-serif text-3xl text-cream sm:text-4xl">
              От зерна до вашей чашки
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80 sm:text-base">
              Малые партии, ручной контроль и быстрый путь от барабана до вашей
              пачки.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {processTags.map((tag) => (
              <li key={tag.id}>
                <span className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-3 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                  <span className="text-terracotta">{tag.icon}</span>
                  {tag.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl bg-cream p-2 shadow-2xl shadow-black/25 ring-1 ring-cream/30 sm:mt-10 sm:p-3">
          <div className="overflow-hidden rounded-2xl border border-coffee/10 bg-white shadow-inner">
            <div className="flex items-center justify-end gap-2 border-b border-coffee/10 bg-cream px-4 py-3 sm:px-5">
              <button
                type="button"
                onClick={prev}
                className="rounded-full border border-coffee/15 bg-white p-2.5 text-coffee transition-colors hover:border-coffee/30 hover:bg-cream"
                aria-label="Предыдущий слайд"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M11 4L6 9l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-full border border-coffee/15 bg-white p-2.5 text-coffee transition-colors hover:border-coffee/30 hover:bg-cream"
                aria-label="Следующий слайд"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path
                    d="M7 4l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[340px]">
                {roastingSlides.map((item, i) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      i === index ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                    aria-hidden={i !== index}
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={i === 0}
                    />
                    <div className="absolute left-4 top-4 sm:left-5 sm:top-5">
                      <span className="inline-flex items-center rounded-full bg-coffee/85 px-3 py-1 text-xs font-medium text-cream backdrop-blur-sm">
                        Свежесть 1–3 дня
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-col justify-center bg-cream px-5 py-8 sm:px-8 sm:py-10">
                {roastingSlides.map((item, i) => (
                  <div
                    key={item.id}
                    className={`transition-all duration-500 ease-out ${
                      i === index
                        ? "relative translate-y-0 opacity-100"
                        : "pointer-events-none absolute inset-x-5 top-8 translate-y-2 opacity-0 sm:inset-x-8 sm:top-10"
                    }`}
                    aria-hidden={i !== index}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-terracotta/15 px-2.5 py-0.5 text-xs font-medium text-terracotta">
                        Шаг {i + 1}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-widest text-olive">
                        {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-coffee sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 leading-relaxed text-coffee-soft">
                      {item.description}
                    </p>
                  </div>
                ))}

                <div className="mt-8 flex gap-2" role="tablist" aria-label="Слайды">
                  {roastingSlides.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={item.title}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === index
                          ? "w-8 bg-terracotta"
                          : "w-2 bg-coffee/25 hover:bg-coffee/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {slide.title}. {slide.description}
        </p>
      </div>
    </section>
  );
}
