"use client";

import { OrderCtaButton } from "@/components/OrderCtaButton";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-coffee/10 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="font-serif text-2xl tracking-tight text-coffee">
          Кварта
        </a>
        <OrderCtaButton variant="primary" className="px-4 py-2 text-sm font-medium">
          Заказать
        </OrderCtaButton>
      </div>
    </header>
  );
}
