import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import Script from "next/script";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import CookieBanner from "@/components/layout/cookie-banner";
import RevealText from "@/components/ui/reveal-text";
import { getContent } from "@/lib/content";
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
  const content = getContent();
  return (
    <html
      lang="ru"
      className={`${onest.variable} h-full antialiased`}
      data-roundness="medium"
      data-reveal-mode=""
      suppressHydrationWarning
    >
      <body className="min-h-full tracking-[-.33%] bg-black text-white">
        <Script id="roundness-init" strategy="beforeInteractive">
          {roundnessInitScript}
        </Script>
        <SiteHeader
          ctaText={content.header.ctaText}
          desktopMenu={content.header.desktopMenu}
          mobileMenu={content.header.mobileMenu}
        />
        <main className="flex-1">{children}</main>
        <RevealText />
        <SiteFooter
          email={content.footer.email}
          copyright={content.footer.copyright}
          socials={content.footer.socials}
          links={content.footer.links}
        />
        <CookieBanner />
      </body>
    </html>
  );
}
