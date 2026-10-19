import type { Metadata } from "next";
import { PT_Sans, PT_Serif } from "next/font/google";
import "./globals.css";

const ptSans = PT_Sans({
  variable: "--font-pt-sans",
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kvarka.vercel.app"), 
  title: "Кварта — обжарка кофе в Минске",
  description:
    "Небольшая ремесленная обжарка: свежее зерно, обжарка по четвергам, доставка и самовывоз на ул. Короля, 9.",
  openGraph: {
    title: "Кварта — свежий кофе из Минска",
    description: "Обжариваем по четвергам, привозим по пятницам. Кофе у вас на 1–3 день после обжарки.",
    siteName: "Кварта",
    locale: "ru_RU",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${ptSans.variable} ${ptSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-coffee font-sans">
        {children}
      </body>
    </html>
  );
}
