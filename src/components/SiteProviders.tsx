"use client";

import type { ReactNode } from "react";
import { OrderModalProvider } from "@/components/OrderModalProvider";
import { ToastProvider } from "@/components/ToastProvider";

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <OrderModalProvider>{children}</OrderModalProvider>
    </ToastProvider>
  );
}
