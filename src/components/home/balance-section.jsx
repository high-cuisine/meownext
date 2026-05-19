"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

const ROUNDNESS_STORAGE_KEY = "site-roundness";
const ROUNDNESS_FALLBACK = "medium";
const ROUNDNESS_VALUES = new Set(["small", "medium", "large"]);
const ROUNDNESS_OPTIONS = [
  {
    value: "small",
    icon: "/home/angle-low.svg",
    label: "Минимальное скругление",
  },
  {
    value: "medium",
    icon: "/home/angle-mid.svg",
    label: "Среднее скругление",
  },
  {
    value: "large",
    icon: "/home/angle-high.svg",
    label: "Максимальное скругление",
  },
];

function normalizeRoundness(value) {
  if (!value) {
    return ROUNDNESS_FALLBACK;
  }

  return ROUNDNESS_VALUES.has(value) ? value : ROUNDNESS_FALLBACK;
}

function applyRoundness(value) {
  document.documentElement.setAttribute("data-roundness", value);
}

export default function BalanceSection() {
  const [roundness, setRoundness] = useState(ROUNDNESS_FALLBACK);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(ROUNDNESS_STORAGE_KEY);
      const nextRoundness = normalizeRoundness(stored);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoundness(nextRoundness);
      applyRoundness(nextRoundness);
    } catch {
      setRoundness(ROUNDNESS_FALLBACK);
      applyRoundness(ROUNDNESS_FALLBACK);
    }
  }, []);

  const handleRoundnessSelect = (value) => {
    const nextRoundness = normalizeRoundness(value);
    setRoundness(nextRoundness);
    applyRoundness(nextRoundness);

    try {
      window.localStorage.setItem(ROUNDNESS_STORAGE_KEY, nextRoundness);
    } catch {
      // localStorage может быть недоступен в приватном режиме или по политике браузера.
    }
  };

  return (
    <section className="bg-[#0a0a0a] py-10 sm:py-16">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-5">
          <div className="flex flex-col items-start gap-8">
            <div
              id="roundnessSelector"
              className="inline-flex rounded-full border border-[#333333] bg-[#141414] p-1"
              role="radiogroup"
              aria-label="Выбор радиуса скругления"
            >
              {ROUNDNESS_OPTIONS.map((option) => {
                const isActive = roundness === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isActive}
                    aria-label={option.label}
                    onClick={() => handleRoundnessSelect(option.value)}
                    className={`flex items-center justify-center rounded-full px-5 py-2 transition-colors ${
                      isActive ? "bg-[#333333]" : "bg-transparent"
                    }`}
                  >
                    <Image
                      src={option.icon}
                      alt=""
                      aria-hidden
                      width={24}
                      height={24}
                      className="size-6"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            <h2 className="max-w-[690px] text-[34px] font-medium leading-[1.2] tracking-[-1.2px] text-white sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
              Идеальный баланс между UX, UI и бизнес-результатом для цифровых продуктов
            </h2>

            <p className="max-w-[660px] text-[16px] leading-7 tracking-[-0.33px] text-[#fdfdfd] sm:text-[18px]">
              Проектируем интерфейсы, в которых пользовательский опыт, визуальная система и цели бизнеса
              выстроены в единую, работающую модель
            </p>

            <button
              type="button"
              className="rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium leading-6 tracking-[-0.66px] text-white transition-colors hover:bg-[#ab0d30]"
            >
              Наши услуги
            </button>
          </div>

          <div className="relative aspect-[646/400] w-full overflow-hidden rounded-[32px] border border-[#333333] bg-[#141414]">
            <Image
              src="/home/balance-image.png"
              alt="Иллюстрация баланса UX, UI и бизнес-целей"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
