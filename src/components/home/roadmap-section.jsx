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
      "Продуманный UX/UI дизайн сайта или сервиса",
      "Консистентные экраны для передачи в разработку",
      "Решения, которые масштабируются под рост бизнеса",
    ],
  },
];

export default function RoadmapSection() {
  return (
    <section className="bg-[#0a0a0a] py-12 sm:py-16">
      <PageContainer>
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl">
          Современный дизайн не должен
          <br />
          разрабатываться месяцами
        </h2>

        <p className="mt-4 text-center text-sm text-zinc-400 sm:text-base">
          Реализуем путь «от старта до результата» за один цикл.
        </p>

        <div className="mt-8 grid gap-2 rounded-full border border-white/10 bg-zinc-900 p-1 sm:grid-cols-3">
          <div className="rounded-full bg-zinc-700 px-4 py-2 text-center text-sm text-white">
            Старт
          </div>
          <div className="rounded-full px-4 py-2 text-center text-sm text-zinc-400">День 3</div>
          <div className="rounded-full px-4 py-2 text-center text-sm text-zinc-400">День 30</div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {roadmapCards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-5 sm:p-6"
            >
              <h3 className="text-xl font-semibold text-white">{card.title}</h3>
              <ul className="mt-4 space-y-2">
                {card.points.map((point) => (
                  <li key={point} className="text-sm leading-6 text-zinc-400">
                    — {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
