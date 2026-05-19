import PageContainer from "@/components/ui/page-container";

const cards = [
  {
    title: "Разбираемся в задаче до старта дизайна",
    text: "Начинаем с бизнес-целей, ограничений и задач пользователей, чтобы исключить лишние итерации позже.",
  },
  {
    title: "Системно идущая работа",
    text: "Работаем по фиксированным этапам с контрольными точками и понятными результатами на каждом шаге.",
  },
  {
    title: "Прозрачный процесс и понятный объём работ",
    text: "Вы заранее видите приоритеты, сроки и стоимость, без скрытых условий и хаотичных правок.",
  },
];

export default function WhySection() {
  return (
    <section className="py-12 sm:py-16">
      <PageContainer>
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Почему мы?</h2>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-3xl border border-white/10 bg-zinc-900 p-5 sm:p-6"
            >
              <h3 className="text-xl font-semibold leading-snug text-white">{card.title}</h3>
              <p className="mt-4 text-sm leading-6 text-zinc-400">{card.text}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
