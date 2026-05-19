import PageContainer from "@/components/ui/page-container";

const cases = [
  { title: "Редизайн платформы", tone: "from-zinc-700 via-zinc-900 to-zinc-950" },
  { title: "Сервис аналитики", tone: "from-emerald-600 via-emerald-800 to-zinc-950" },
  { title: "Корпоративный сайт", tone: "from-slate-300 via-slate-500 to-slate-800" },
];

export default function CasesSection() {
  return (
    <section className="py-8 sm:py-10">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((item) => (
            <article
              key={item.title}
              className={`relative aspect-square overflow-hidden rounded-[28px] bg-gradient-to-br ${item.tone}`}
            >
              <div className="absolute inset-0 bg-black/35" />
              <p className="absolute bottom-5 left-5 right-5 text-base font-medium text-white">
                {item.title}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
