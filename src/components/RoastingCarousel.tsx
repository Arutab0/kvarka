"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { roastingSlides } from "@/data/carousel";

const AUTO_INTERVAL_MS = 5500;

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
      className="border-b border-coffee/10 bg-white px-4 py-12 sm:px-6 sm:py-16"
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
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-olive">
              Процесс
            </p>
            <h2 className="mt-2 font-serif text-3xl text-coffee">
              От зерна до вашей чашки
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-full border border-coffee/15 p-2.5 text-coffee transition-colors hover:border-coffee/30 hover:bg-cream"
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
              className="rounded-full border border-coffee/15 p-2.5 text-coffee transition-colors hover:border-coffee/30 hover:bg-cream"
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
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-coffee/10 bg-coffee shadow-md">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px]">
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
                </div>
              ))}
            </div>

            <div className="relative flex flex-col justify-center bg-cream px-6 py-8 sm:px-10 sm:py-10">
              {roastingSlides.map((item, i) => (
                <div
                  key={item.id}
                  className={`transition-all duration-500 ease-out ${
                    i === index
                      ? "relative translate-y-0 opacity-100"
                      : "pointer-events-none absolute inset-x-6 top-8 translate-y-2 opacity-0 sm:inset-x-10 sm:top-10"
                  }`}
                  aria-hidden={i !== index}
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-terracotta">
                    {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-coffee sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-coffee/80">
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
                        : "w-2 bg-coffee/20 hover:bg-coffee/35"
                    }`}
                  />
                ))}
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
