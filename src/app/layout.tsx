import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const roundnessInitScript = `
(() => {
  const key = "site-roundness";
  const fallback = "medium";
  const allowed = new Set(["small", "medium", "large"]);

  try {
    const stored = window.localStorage.getItem(key);
    const value = allowed.has(stored) ? stored : fallback;
    document.documentElement.setAttribute("data-roundness", value);
  } catch (_error) {
    document.documentElement.setAttribute("data-roundness", fallback);
  }
})();
`;

const roundnessOverrideCss = `
:root {
  --site-roundness: 32px;
}

html[data-roundness="small"] {
  --site-roundness: 8px;
}

html[data-roundness="medium"] {
  --site-roundness: 16px;
}

html[data-roundness="large"] {
  --site-roundness: 32px;
}

html [class*="rounded-"]:not([class*="rounded-full"]):not([class*="rounded-none"]) {
  border-radius: var(--site-roundness);
  transition: border-radius .5s ease-in-out;
}
`;

export const metadata: Metadata = {
  title: "Meowdes",
  description: "Дизайн-студия цифровых продуктов",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${onest.variable} h-full antialiased`}
      data-roundness="medium"
      suppressHydrationWarning
    >
      <body className="min-h-full tracking-[-.33%] bg-black text-white">
        <Script id="roundness-init" strategy="beforeInteractive">
          {roundnessInitScript}
        </Script>
        <style id="roundness-override">{roundnessOverrideCss}</style>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
