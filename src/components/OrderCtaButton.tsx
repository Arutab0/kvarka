"use client";

import type { OpenOrderOptions } from "@/components/OrderModalProvider";
import { useOrderModal } from "@/components/OrderModalProvider";

type OrderCtaButtonProps = OpenOrderOptions & {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
};

const variantClasses: Record<
  NonNullable<OrderCtaButtonProps["variant"]>,
  string
> = {
  primary:
    "bg-terracotta text-cream hover:bg-terracotta-dark",
  secondary:
    "border border-coffee/20 text-coffee hover:border-coffee/40 hover:bg-coffee/5",
  ghost:
    "text-terracotta hover:bg-terracotta/10",
};

export function OrderCtaButton({
  children,
  className = "",
  variant = "primary",
  interest,
  comment,
}: OrderCtaButtonProps) {
  const { openOrder } = useOrderModal();

  return (
    <button
      type="button"
      onClick={() => openOrder({ interest, comment })}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
