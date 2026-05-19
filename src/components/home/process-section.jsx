"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

const steps = [
  {
    icon: "/home/process-notepad-text.svg",
    iconAlt: "Иконка этапа знакомства и брифа",
    title: "Знакомство и бриф",
    text: "Выясняем цели проекта, задачи бизнеса, целевую аудиторию и ограничения. Уточняем ожидания, критерии результата и фиксируем входные данные.",
  },
  {
    icon: "/home/process-brain.svg",
    iconAlt: "Иконка этапа аналитики и структуры",
    title: "Аналитика и структура",
    text: "Формируем логику экранов и общую структуру продукта. Продумываем пользовательские сценарии, пути взаимодействия и приоритизируем ключевые блоки.",
  },
  {
    icon: "/home/process-figma.svg",
    iconAlt: "Иконка этапа концепции дизайна",
    title: "Концепция дизайна",
    text: "Показываем 2-3 визуальные концепции. Прорабатываем стилистику, шрифты и цветовую палитру, чтобы зафиксировать визуальный вектор проекта.",
  },
  {
    icon: "/home/process-pen-tool.svg",
    iconAlt: "Иконка этапа детальной отрисовки",
    title: "Детальная отрисовка",
    text: "Отрисовываем все экраны, состояния и адаптивные версии. Детализируем интерфейс и приводим элементы к единой системе.",
  },
  {
    icon: "/home/process-file-terminal.svg",
    iconAlt: "Иконка этапа передачи и поддержки",
    title: "Передача и поддержка",
    text: "Передаём макеты в Figma и подключаемся на этапе разработки. Отвечаем на вопросы и сопровождаем внедрение дизайна.",
  },
];

const SCROLL_PROBE_RATIO = 0.62;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ProcessSection() {
  const timelineWrapRef = useRef(null);
  const firstIconRef = useRef(null);
  const lastIconRef = useRef(null);
  const frameRef = useRef(0);
  const [timeline, setTimeline] = useState({ top: 0, left: 0, height: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let resizeObserver = null;

    const updateTimeline = () => {
      frameRef.current = 0;

      const timelineWrap = timelineWrapRef.current;
      const firstIcon = firstIconRef.current;
      const lastIcon = lastIconRef.current;

      if (!timelineWrap || !firstIcon || !lastIcon) {
        return;
      }

      const nextTop = firstIcon.offsetTop + firstIcon.offsetHeight;
      const nextHeight = Math.max(0, lastIcon.offsetTop - nextTop);
      const nextLeft = firstIcon.offsetLeft + firstIcon.offsetWidth / 2 - 1;

      setTimeline((prev) => {
        if (
          prev.top === nextTop &&
          prev.left === nextLeft &&
          prev.height === nextHeight
        ) {
          return prev;
        }

        return { top: nextTop, left: nextLeft, height: nextHeight };
      });

      if (nextHeight <= 0) {
        setProgress(0);
        return;
      }

      const wrapRect = timelineWrap.getBoundingClientRect();
      const startY = window.scrollY + wrapRect.top + nextTop;
      const endY = startY + nextHeight;
      const probeY = window.scrollY + window.innerHeight * SCROLL_PROBE_RATIO;
      const nextProgress = clamp((probeY - startY) / (endY - startY), 0, 1);

      setProgress((prev) => {
        if (Math.abs(prev - nextProgress) < 0.001) {
          return prev;
        }

        return nextProgress;
      });
    };

    const requestFrame = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateTimeline);
    };

    requestFrame();

    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame);
    window.addEventListener("load", requestFrame);

    if ("ResizeObserver" in window && timelineWrapRef.current) {
      resizeObserver = new ResizeObserver(requestFrame);
      resizeObserver.observe(timelineWrapRef.current);
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(requestFrame).catch(() => {});
    }

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("scroll", requestFrame);
      window.removeEventListener("resize", requestFrame);
      window.removeEventListener("load", requestFrame);
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <section id="services" className="bg-black py-12 sm:py-16">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-5">
          <div className="space-y-6">
            <h2 className="text-[34px] font-semibold leading-[1.2] tracking-[-1.2px] text-[#fdfdfd] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
              Как мы работаем
            </h2>
            <p className="max-w-[530px] text-[16px] leading-7 tracking-[-0.33px] text-[#fdfdfd] sm:text-[18px]">
              От постановки задачи до готового дизайн-решения, ориентированного на
              пользователей и бизнес-результат
            </p>
          </div>

          <div ref={timelineWrapRef} className="relative pl-8 md:pl-12">
            <div
              aria-hidden
              className="pointer-events-none absolute z-0 w-[2px] bg-[#292929]"
              style={{
                top: `${timeline.top}px`,
                left: `${timeline.left}px`,
                height: `${timeline.height}px`,
              }}
            >
              <div
                className="w-full rounded-full bg-gradient-to-b from-[#66081c] to-[#c20f36] transition-[height] duration-150"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            <ol className="relative z-10 space-y-5 md:space-y-0">
              {steps.map((step, index) => {
                const isLast = index === steps.length - 1;
                const itemHeightClass = isLast ? "md:min-h-[128px]" : "md:min-h-[280px]";

                return (
                  <li key={step.title} className={`flex gap-6 ${itemHeightClass}`}>
                    <div className="w-12 shrink-0">
                      <span
                        ref={
                          index === 0
                            ? firstIconRef
                            : index === steps.length - 1
                              ? lastIconRef
                              : null
                        }
                        className="flex h-10 w-12 items-center justify-center rounded-xl bg-[#a30d2d]"
                      >
                        <Image
                          src={step.icon}
                          alt={step.iconAlt}
                          width={24}
                          height={24}
                          className="size-6"
                          loading="lazy"
                        />
                      </span>
                    </div>

                    <div className={`min-w-0 max-w-[380px] pt-1 ${isLast ? "pb-0" : "pb-8"}`}>
                      <h3 className="text-[24px] font-semibold leading-8 tracking-[-1.33px] text-[#fdfdfd]">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[16px] leading-6 tracking-[-0.33px] text-[#a5a5a5]">
                        {step.text}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
