import PageContainer from "@/components/ui/page-container";

const steps = [
  {
    icon: "01",
    title: "Знакомство и бриф",
    text: "Уточняем цели и вводные, фиксируем ограничения, выбираем формат взаимодействия и метрики успеха.",
  },
  {
    icon: "02",
    title: "Аналитика и структура",
    text: "Проводим исследование аудитории и конкурентов, формируем структуру, сценарии и опорные экраны.",
  },
  {
    icon: "03",
    title: "Концепция дизайна",
    text: "Создаём визуальное направление и проверяем, как концепция работает в ключевых пользовательских шагах.",
  },
  {
    icon: "04",
    title: "Детализация интерфейса",
    text: "Дорабатываем экраны, состояния и адаптивы, сводим всё к единой дизайн-системе проекта.",
  },
  {
    icon: "05",
    title: "Передача и поддержка",
    text: "Передаём макеты в разработку, сопровождаем внедрение и оперативно закрываем уточнения по интерфейсу.",
  },
];

export default function ProcessSection() {
  return (
    <section id="services" className="py-12 sm:py-16">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Как мы работаем</h2>
            <p className="mt-4 max-w-xl text-zinc-400">
              От постановки цели до готовой дизайн-системы: весь процесс прозрачен, этапы
              понятны, результат можно проверить на каждом шаге.
            </p>
          </div>

          <ol className="space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex w-14 flex-col items-center">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#c20f36] text-xs font-semibold text-white">
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && <span className="mt-2 h-full w-px bg-zinc-700" />}
                </div>

                <div className="pb-3">
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-[380px] text-sm leading-6 text-zinc-400">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </PageContainer>
    </section>
  );
}
