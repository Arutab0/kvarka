"use client";

import { OrderCtaButton } from "@/components/OrderCtaButton";

const links = [
  { href: "#about", label: "О нас" },
  { href: "#assortment", label: "Ассортимент" },
  { href: "#delivery", label: "Доставка" },
];

function LogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <rect width="64" height="64" rx="14" fill="#2A1810" />
      <ellipse
        cx="32"
        cy="32"
        rx="14"
        ry="20"
        transform="rotate(35 32 32)"
        fill="none"
        stroke="#F4EADB"
        strokeWidth="4"
      />
      <path
        d="M23 18c6 6 4 12 10 16s4 10 8 12"
        fill="none"
        stroke="#B3322A"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-coffee/15 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8 lg:px-10">
        <a
          href="#"
          aria-label="Кварта, в начало страницы"
          className="flex items-center gap-3 font-serif text-2xl font-medium tracking-tight text-coffee"
        >
          <LogoMark />
          Кварта
        </a>

        <nav aria-label="Разделы сайта" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-base font-medium text-coffee underline-offset-4 hover:underline"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <OrderCtaButton variant="primary" className="px-5 py-2.5 text-base font-semibold">
          Заказать
        </OrderCtaButton>
      </div>
    </header>
  );
}