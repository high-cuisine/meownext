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
  { currentLabel: "День 5" },
  { currentLabel: "День 10", crossedLabel: "День 30" },
];

export default function RoadmapSection() {
  return (
    <section className="bg-[#0a0a0a] py-7 sm:py-16">
      <PageContainer>
        <h2 className="mx-auto max-w-[860px] break-words text-[28px] font-semibold leading-[40px]  text-[#fdfdfd] sm:text-center sm:text-[40px] sm:leading-[48px]">
          Современный дизайн не должен
          <br />
          разрабатываться месяцами
        </h2>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[16px] leading-[24px]  text-[#fdfdfd] sm:mt-8 sm:justify-center sm:text-center sm:text-[18px] sm:leading-[28px]">
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

        <div className="mt-5 sm:hidden">
          <div className="-mx-3 snap-x snap-mandatory overflow-x-auto px-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="w-max">
              <div className="flex items-end">
                {timelineDays.map((day, index) => {
                  const isFirst = index === 0;
                  const isLast = index === timelineDays.length - 1;

                  return (
                    <div key={`mobile-${day.currentLabel}`} className="flex items-end">
                      <div className="w-[324px]">
                        <div className="flex flex-col items-center gap-3">
                          <div
                            className={`rounded-xl bg-[#292929] px-4 py-2 text-[16px] font-medium leading-6  text-[#fdfdfd] ${
                              isFirst || isLast ? "border border-[#4e4e4e]" : ""
                            }`}
                          >
                            <span className="relative inline-block">
                              {day.currentLabel}
                              {day.crossedLabel ? (
                                <>
                                  <span className="ml-2 text-[#7a7a7a]">{day.crossedLabel}</span>
                                  <span className="pointer-events-none absolute -right-[9px] top-[calc(50%+4px)] h-4 w-[70px] -translate-y-1/2">
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

              <div className="mt-5 flex gap-5">
                {roadmapCards.map((card, index) => (
                  <article
                    key={`mobile-${card.title}`}
                    className={`h-[276px] w-[324px] rounded-[20px] border border-[#333333] bg-[#141414] p-5 ${
                      index === 0 ? "snap-start" : "snap-center"
                    } snap-always`}
                  >
                    <h3 className="text-[24px] font-semibold leading-8  text-[#fdfdfd]">
                      {card.title}
                    </h3>
                    <ul className="mt-3 space-y-1 text-[16px] leading-6  text-[#a5a5a5]">
                      {card.points.map((point) => (
                        <li key={point}>— {point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 hidden flex-col gap-6 sm:flex">
          <div className="overflow-x-auto">
            <div className="flex min-w-[760px] items-end">
              {timelineDays.map((day, index) => {
                const isFirst = index === 0;
                const isLast = index === timelineDays.length - 1;

                return (
                  <div key={day.currentLabel} className="flex flex-1 items-end gap-0">
                    <div className="flex flex-1 flex-col items-center gap-3">
                      <div className="rounded-xl bg-[#292929] px-4 py-2 text-[16px] font-medium leading-6  text-[#fdfdfd]">
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
                <h3 className="text-[24px] font-semibold leading-8  text-[#fdfdfd]">
                  {card.title}
                </h3>
                <ul className="mt-3 space-y-1 text-[16px] leading-6  text-[#a5a5a5]">
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
