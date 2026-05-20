"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import Logo from "@pub/logo.svg";

const desktopMenu = [
  { href: "/projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#contacts", label: "Контакты" },
];

const mobileMenu = [
  { href: "/projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#cooperation", label: "Сотрудничество" },
  { href: "#contacts", label: "Контакты" },
];

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${isScrolled ? "border-[#333333]" : "border-transparent"}`}
    >
      <PageContainer className={`flex xl:grid grid-cols-2 h-[88px] items-center justify-between gap-5 py-2 transition-all duration-1000 backdrop-blur-[0px] bg-black/00 ${isScrolled ? "backdrop-blur-[12px] bg-black" : " "}`}>
        <div className="flex items-center gap-[24px]">
          <Link href="/" className="inline-flex items-center text-white">
            <Image src={Logo} width={191} height={72} alt="Meowdes" priority />
          </Link>
          <a
            href="#cooperation"
            style={{transition: " 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)", transformOrigin:" top center"}}
            className={`hidden md:block rounded-xl bg-[#333333] px-5 py-3 scale-0 opacity-0  
              text-base font-medium leading-6 text-[#fdfdfd]  transition-all duration-500
              ${isScrolled ? "translate-y-0 opacity-100 pointer-events-auto scale-100" : "pointer-events-none" }`}
            tabIndex={isScrolled ? 0 : -1}
            aria-hidden={!isScrolled}
          >
            Обсудить проект
          </a>
        </div>



        <button
          type="button"
          aria-label="Открыть меню"
          className="flex items-center justify-center rounded-xl p-3 md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Image
            src="/home/header-menu.svg"
            alt=""
            aria-hidden
            width={24}
            height={24}
            className="size-6"
          />
        </button>

        <div className="hidden items-center gap-6 md:flex md:gap-8">
          <nav className="flex items-center gap-6 md:gap-8">
            {desktopMenu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-base font-medium leading-6  text-[#a5a5a5] transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>


        </div>
      </PageContainer>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-[70] bg-[rgba(0,0,0,0.1)] backdrop-blur-[12px] md:hidden">
          <div className="relative h-full w-full">
            <div className="border-b border-[#333333] bg-[#1f1f1f]">
              <PageContainer className="flex h-[88px] items-center justify-between gap-5 py-2">
                <Link href="/" className="inline-flex items-center text-white" onClick={closeMobileMenu}>
                  <Image src={Logo} width={191} height={72} alt="Meowdes" priority />
                </Link>

                <button
                  type="button"
                  aria-label="Закрыть меню"
                  className="flex items-center justify-center rounded-xl p-3"
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
                {mobileMenu.map((item) => (
                  <a
                    key={`mobile-${item.href}`}
                    href={item.href}
                    className="text-[24px] font-medium leading-[32px]  text-[#a5a5a5] transition-colors hover:text-[#fdfdfd]"
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/65 px-4 pb-12 pt-4">
              <div className="flex justify-end">
                <Link
                  href="#cooperation"
                  className="pointer-events-auto rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium leading-6  text-[#fdfdfd]"
                  onClick={closeMobileMenu}
                >
                  Обсудить проект
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
