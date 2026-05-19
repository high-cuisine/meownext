import PageContainer from "@/components/ui/page-container";

export default function BalanceSection() {
  return (
    <section className="bg-[#0a0a0a] py-10 sm:py-14">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex rounded-full border border-white/15 bg-zinc-900 p-1">
              <span className="rounded-full px-5 py-2 text-sm text-zinc-500">UX</span>
              <span className="rounded-full bg-zinc-700 px-5 py-2 text-sm text-white">UI</span>
              <span className="rounded-full px-5 py-2 text-sm text-zinc-500">Бизнес</span>
            </div>

            <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Идеальный баланс между UX, UI и бизнес-результатом для цифровых продуктов
            </h2>

            <p className="max-w-xl text-base text-zinc-400">
              Смотрим не только на эстетику, но и на то, как дизайн влияет на метрики:
              конверсию, удержание и скорость принятия решения клиентом.
            </p>

            <button
              type="button"
              className="rounded-xl bg-[#c20f36] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ab0d30] sm:text-base"
            >
              О нас
            </button>
          </div>

          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-800 to-zinc-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.16),transparent_55%)]" />
            <div className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-2xl border border-white/15 bg-black/40 px-5 py-7 text-center text-zinc-300 shadow-2xl">
              UX
            </div>
            <div className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] rounded-2xl border border-white/15 bg-black/55 px-5 py-7 text-center text-zinc-100 shadow-2xl">
              UI
            </div>
            <div className="absolute left-1/2 top-1/2 w-[210px] -translate-x-1/2 -translate-y-1/2 rotate-[14deg] rounded-2xl border border-white/15 bg-black/40 px-5 py-7 text-center text-zinc-300 shadow-2xl">
              Бизнес
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
