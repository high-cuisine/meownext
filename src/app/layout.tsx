import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import SiteLoader from "@/components/layout/site-loader";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import CookieBanner from "@/components/layout/cookie-banner";
import ImageLightbox from "@/components/layout/image-lightbox";
import RevealText from "@/components/ui/reveal-text";
import SmoothScroll from "@/components/layout/smooth-scroll";
import ViewportBottomBlur from "@/components/layout/viewport-bottom-blur";
import { getContent } from "@/lib/content";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

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
      className={`${onest.variable} h-full scroll-pt-[90px] antialiased`}
      data-reveal-mode=""
      suppressHydrationWarning
    >
      <body className="min-h-full tracking-[-.33%] bg-black text-white">
        <SiteLoader />
        <SiteHeader
          ctaText={content.header.ctaText}
          desktopMenu={content.header.desktopMenu}
          mobileMenu={content.header.mobileMenu}
        />
        <main className="flex-1">{children}</main>
        <RevealText />
        <SmoothScroll />
        <ViewportBottomBlur />
        <SiteFooter
          email={content.footer.email}
          entityName={content.footer.entityName}
          inn={content.footer.inn}
          ogrnip={content.footer.ogrnip}
          socials={content.footer.socials}
          links={content.footer.links}
        />
        <CookieBanner />
        <ImageLightbox />
      </body>
    </html>
  );
}
