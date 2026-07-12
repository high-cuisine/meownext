"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import ContactModal from "@/components/forms/contact-modal";
import Logo from "@pub/logo.svg";

const DEFAULT_DESKTOP_MENU = [
  { href: "/projects", label: "Проекты" },
  { href: "/services", label: "Услуги" },
];

const DEFAULT_MOBILE_MENU = [
  { href: "/projects", label: "Проекты" },
  { href: "/services", label: "Услуги" },
  { href: "#cooperation", label: "Сотрудничество" },
];

const MENU_ANIMATION_MS = 420;
const MENU_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

export default function SiteHeader({
  ctaText = "Обсудить проект",
  desktopMenu = DEFAULT_DESKTOP_MENU,
  mobileMenu = DEFAULT_MOBILE_MENU,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const menuCloseTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      if (menuCloseTimer.current) {
        clearTimeout(menuCloseTimer.current);
        menuCloseTimer.current = null;
      }
      setIsMenuClosing(false);
      setIsMenuMounted(true);
    } else if (isMenuMounted) {
      setIsMenuClosing(true);
      menuCloseTimer.current = setTimeout(() => {
        setIsMenuMounted(false);
        setIsMenuClosing(false);
      }, MENU_ANIMATION_MS);
    }
  }, [isMobileMenuOpen, isMenuMounted]);

  useEffect(() => () => {
    if (menuCloseTimer.current) {
      clearTimeout(menuCloseTimer.current);
    }
  }, []);

  useEffect(() => {
    if (!isMenuMounted) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuMounted]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const menuOverlayAnimation = isMenuClosing
    ? `mobile-menu-overlay-out 0.32s ease-out both`
    : `mobile-menu-overlay-in 0.36s ease-out both`;
  const menuPanelAnimation = isMenuClosing
    ? `mobile-menu-panel-out 0.38s ${MENU_EASE} both`
    : `mobile-menu-panel-in 0.42s ${MENU_EASE} both`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${isScrolled ? "border-[#333333]" : "border-transparent"}`}
    >
      <PageContainer className={`flex xl:grid grid-cols-2 h-[88px] items-center justify-between gap-5 py-2 transition-all duration-1000 backdrop-blur-[0px] bg-black/00 ${isScrolled ? "backdrop-blur-[12px] bg-black" : " "}`}>
        <div className="flex items-center gap-[24px]">
          <Link href="/" className="inline-flex items-center text-white transition-opacity hover:opacity-80 active:opacity-60">
            <Image src={Logo} width={191} height={72} alt="Meowdes" priority />
          </Link>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            style={{ transformOrigin: "top center" }}
            className={`btn-press hidden md:block rounded-xl bg-[#333333] px-5 py-3 scale-0 opacity-0
              text-base font-medium leading-6 text-[#fdfdfd] transition-all duration-500
              hover:bg-[#4e4e4e] active:bg-[#292929]
              ${isScrolled ? "translate-y-0 opacity-100 pointer-events-auto scale-100" : "pointer-events-none" }`}
            tabIndex={isScrolled ? 0 : -1}
            aria-hidden={!isScrolled}
          >
            {ctaText}
          </button>
        </div>



        <button
          type="button"
          aria-label="Открыть меню"
          className="btn-press group flex items-center justify-center rounded-xl p-3 hover:bg-[#4e4e4e] active:bg-[#292929] md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="size-6">
            <path
              className="fill-[#a5a5a5] transition-colors duration-200 group-hover:fill-[#fdfdfd]"
              d="M20 15C20.5523 15 21 15.4477 21 16C21 16.5523 20.5523 17 20 17H11C10.4477 17 10 16.5523 10 16C10 15.4477 10.4477 15 11 15H20ZM20 7C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8C3 7.44772 3.44772 7 4 7H20Z"
            />
          </svg>
        </button>

        <div className="hidden items-center gap-6 md:flex md:gap-8">
          <nav className="flex items-center gap-6 md:gap-8">
            {desktopMenu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium leading-6  text-[#a5a5a5] transition-colors hover:text-white active:text-[#d4d4d4]"
              >
                {item.label}
              </a>
            ))}
          </nav>


        </div>
      </PageContainer>

      {isMenuMounted ? (
        <div className="fixed inset-0 z-[70] md:hidden">
          <div
            aria-hidden
            className="mobile-menu-overlay-anim absolute inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-[12px]"
            style={{ animation: menuOverlayAnimation }}
            onClick={closeMobileMenu}
          />

          <div className="relative h-full w-full">
            <div
              className="mobile-menu-panel-anim overflow-hidden border-b border-[#333333] bg-[#1f1f1f]"
              style={{ animation: menuPanelAnimation }}
            >
              <PageContainer className="flex h-[88px] items-center justify-between gap-5 py-2">
                <Link href="/" className="inline-flex items-center text-white" onClick={closeMobileMenu}>
                  <Image src={Logo} width={191} height={72} alt="Meowdes" priority />
                </Link>

                <button
                  type="button"
                  aria-label="Закрыть меню"
                  className="flex items-center justify-center rounded-xl p-3 transition-[background-color,transform] hover:bg-[#292929] active:bg-[#333333] active:scale-95"
                  onClick={closeMobileMenu}
                >
                  <Image
                    src="/home/header-close.svg"
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    className="size-6"
                  />
                </button>
              </PageContainer>
              <nav className="flex flex-col gap-5 px-6 pb-16 pt-8">
                {mobileMenu.map((item, index) => (
                  <a
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="mobile-menu-item-anim text-[24px] font-medium leading-[32px] text-[#a5a5a5] transition-colors hover:text-[#fdfdfd] active:text-[#d4d4d4]"
                    style={{
                      animation: isMenuClosing
                        ? "none"
                        : `mobile-menu-item-in 0.38s ${MENU_EASE} ${120 + index * 70}ms both`,
                    }}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/65 px-4 pb-12 pt-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mobile-menu-cta-anim btn-press pointer-events-auto rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium leading-6 text-[#fdfdfd] hover:bg-[#e0123f] active:bg-[#ab0d30]"
                  style={{
                    animation: isMenuClosing
                      ? "none"
                      : `mobile-menu-cta-in 0.4s ${MENU_EASE} 320ms both`,
                  }}
                  onClick={() => {
                    closeMobileMenu();
                    setIsContactOpen(true);
                  }}
                >
                  {ctaText}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </header>
  );
}
