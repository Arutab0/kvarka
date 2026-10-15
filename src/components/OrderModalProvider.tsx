"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { OrderInterest } from "@/data/coffee";
import { OrderForm } from "@/components/OrderForm";

export type OpenOrderOptions = {
  interest?: OrderInterest;
  comment?: string;
};

type OrderModalContextValue = {
  openOrder: (options?: OpenOrderOptions) => void;
  closeOrder: () => void;
};

const OrderModalContext = createContext<OrderModalContextValue | null>(null);

export function OrderModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [options, setOptions] = useState<OpenOrderOptions>({});

  const openOrder = useCallback((next?: OpenOrderOptions) => {
    setOptions(next ?? {});
    setFormKey((k) => k + 1);
    setIsOpen(true);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const closeOrder = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => setIsOpen(false), 200);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeOrder();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeOrder]);

  const value = useMemo(
    () => ({ openOrder, closeOrder }),
    [openOrder, closeOrder],
  );

  return (
    <OrderModalContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
          <button
            type="button"
            className={`absolute inset-0 bg-coffee/80 backdrop-blur-sm transition-opacity duration-200 ${
                          visible ? "opacity-100" : "opacity-0"
                }`}
            aria-label="Закрыть окно"
            onClick={closeOrder}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-modal-title"
            className={`relative z-10 max-h-[92vh]w-full max-w-lg overflow-y-auto rounded-2xl bg-cream shadow-2xl shadow-black/50 ring-1 ring-white/20 transition-all duration-200 ease-out ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-4 scale-95 opacity-0 sm:translate-y-2"
            }`}
          >
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-coffee/15 bg-cream px-6 py-5">
              <div>
                <h2
                  id="order-modal-title"
                  className="font-serif text-2xl text-coffee"
                >
                  Заявка на заказ
                </h2>
                <p className="mt-1 text-base text-coffee-soft">
                  Перезвоним и соберём заказ к ближайшей пятнице
                  </p>
              </div>
              <button
                type="button"
                onClick={closeOrder}
                className="rounded-lg p-2 text-coffee transition-colors hover:bg-coffee/10"
                aria-label="Закрыть"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5">
              <OrderForm
                key={formKey}
                defaultInterest={options.interest}
                defaultComment={options.comment ?? ""}
                onSuccess={closeOrder}
                variant="modal"
              />
            </div>
          </div>
        </div>
      ) : null}
    </OrderModalContext.Provider>
  );
}

export function useOrderModal(): OrderModalContextValue {
  const ctx = useContext(OrderModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used within OrderModalProvider");
  }
  return ctx;
}
