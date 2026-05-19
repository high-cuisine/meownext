import PageContainer from "@/components/ui/page-container";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(194,15,54,0.28),transparent_58%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(135deg,rgba(194,15,54,0.35)_12.5%,transparent_12.5%,transparent_50%,rgba(194,15,54,0.35)_50%,rgba(194,15,54,0.35)_62.5%,transparent_62.5%,transparent_100%)] [background-size:36px_36px]" />

      <PageContainer className="relative py-12 sm:py-14 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div className="hidden h-[312px] lg:block" />

          <div className="flex flex-col items-start gap-9">
            <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[64px]">
              Укрепляем бизнес
              <br />
              через проверенные
              <br />
              дизайн-решения
            </h1>

            <button
              type="button"
              className="rounded-xl bg-[#c20f36] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ab0d30] sm:text-base"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
