import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

const roadmapCards = [
  {
    title: "Старт проекта",
    points: [
      "Разбираемся в задаче и текущем состоянии проекта",
      "Фиксируем цели, требования и ограничения",
      "Согласовываем план работ и формат взаимодействия",
    ],
  },
  {
    title: "Формирование основы",
    points: [
      "Изучаем аудиторию и лучшие решения на рынке",
      "Продумываем структуру страниц и логику интерфейса",
      "Формируем первые концепции ключевых экранов",
    ],
  },
  {
    title: "Готовый дизайн-результат",
    points: [
      "Продуманный UX / UI дизайн сайта или сервиса",
      "Консистентные экраны, готовые к передаче в разработку",
      "Дизайн, который легко дорабатывается и масштабируется под задачи бизнеса",
    ],
  },
];

const timelineDays = [
  { currentLabel: "Сегодня" },
  { currentLabel: "День 3" },
  { currentLabel: "День 10", crossedLabel: "День 30" },
];

export default function RoadmapSection() {
  return (
    <section className="bg-[#0a0a0a] py-12 sm:py-16">
      <PageContainer>
        <h2 className="mx-auto max-w-[860px] text-center text-[34px] font-semibold leading-[1.2] tracking-[-1.2px] text-[#fdfdfd] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
          Современный дизайн не должен
          <br />
          разрабатываться месяцами
        </h2>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-[16px] leading-[24px] tracking-[-0.33px] text-[#fdfdfd] sm:flex-nowrap sm:text-[18px] sm:leading-[28px]">
          <p>Используем</p>
          <div className="inline-flex items-center gap-1 rounded-xl border border-[#4e4e4e] bg-[#1f1f1f] py-1 pl-1 pr-2">
            <span className="relative size-7 shrink-0">
              <Image
                src="/home/road-bolt.svg"
                alt=""
                fill
                className="object-contain"
                aria-hidden
              />
            </span>
            <span>нейросети</span>
          </div>
          <p>для ускоренной реализации вашего проекта</p>
        </div>

        <div className="mt-8 flex flex-col gap-6">
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex min-w-[760px] items-end">
              {timelineDays.map((day, index) => {
                const isFirst = index === 0;
                const isLast = index === timelineDays.length - 1;

                return (
                  <div key={day.currentLabel} className="flex flex-1 items-end gap-0">
                    <div className="flex flex-1 flex-col items-center gap-3">
                      <div className="rounded-xl bg-[#292929] px-4 py-2 text-[16px] font-medium leading-6 tracking-[-0.66px] text-[#fdfdfd]">
                        <span className="relative inline-block">
                          {day.currentLabel}
                          {day.crossedLabel ? (
                            <>
                              <span className="ml-2 text-[#7a7a7a]">{day.crossedLabel}</span>
                              <span className="pointer-events-none absolute -right-2 top-[calc(50%+4px)] h-4 w-[72px] -translate-y-1/2">
                                <Image
                                  src="/home/road-strike.svg"
                                  alt=""
                                  fill
                                  className="object-contain"
                                  aria-hidden
                                />
                              </span>
                            </>
                          ) : null}
                        </span>
                      </div>
                      <div className="flex w-full items-center">
                        <div className={`h-px flex-1 border-t border-[#4e4e4e] ${isFirst ? "opacity-0" : ""}`} />
                        <span className="relative size-[23px] shrink-0">
                          <Image
                            src="/home/road-dot.svg"
                            alt=""
                            fill
                            className="object-contain"
                            aria-hidden
                          />
                        </span>
                        <div className={`h-px flex-1 border-t border-[#4e4e4e] ${isLast ? "opacity-0" : ""}`} />
                      </div>
                    </div>
                    {!isLast ? (
                      <div className="pb-[11px]">
                        <span className="relative block h-px w-5">
                          <Image
                            src="/home/road-line.svg"
                            alt=""
                            fill
                            className="object-contain"
                            aria-hidden
                          />
                        </span>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {roadmapCards.map((card) => (
              <article
                key={card.title}
                className="h-full rounded-[20px] border border-[#333333] bg-[#141414] p-5"
              >
                <h3 className="text-[24px] font-semibold leading-8 tracking-[-1.33px] text-[#fdfdfd]">
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-1 text-[16px] leading-6 tracking-[-0.33px] text-[#a5a5a5]">
                  {card.points.map((point) => (
                    <li key={point}>— {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
