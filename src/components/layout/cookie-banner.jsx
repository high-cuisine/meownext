"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

const STORAGE_KEY = "site-cookie-consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(STORAGE_KEY);
      if (!accepted) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);

    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // localStorage может быть недоступен.
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookies"
      className="fixed inset-x-0 bottom-0 z-50 md:bottom-6"
    >
      <PageContainer className="max-md:px-0 md:flex md:justify-start">
        <div className="flex w-full flex-col items-center gap-4 border-t border-[#333333] bg-[#1f1f1f] p-4 md:w-auto md:flex-row md:items-center md:gap-9 md:rounded-[32px] md:border md:p-7 md:px-8 md:shadow-[0_16px_100px_rgba(0,0,0,0.9)]">
        <div className="flex w-full items-center gap-3 md:w-auto md:gap-4">
          <Image
            src="/home/cookie-icon.png"
            alt=""
            aria-hidden
            width={48}
            height={48}
            className="size-12 shrink-0"
          />
          <p className="text-xs leading-4 tracking-[-0.028em] text-[#a5a5a5] md:text-sm md:leading-5 md:tracking-[-0.024em]">
            Мы используем cookies и аналитические сервисы
            <br />
            для корректной работы сайта
          </p>
        </div>

        <button
          type="button"
          onClick={handleAccept}
          className="btn-press w-full rounded-xl bg-[#333333] px-5 py-3 text-base font-medium leading-6 tracking-[-0.041em] text-[#fdfdfd] hover:bg-[#4e4e4e] active:bg-[#292929] md:w-auto md:shrink-0"
        >
          Хорошо
        </button>
        </div>
      </PageContainer>
    </div>
  );
}
