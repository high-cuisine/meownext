import PageContainer from "@/components/ui/page-container";

export default function HeroSection({
  title = "Укрепляем бизнес\nчерез проверенные\nдизайн-решения",
  ctaText = "Обсудить проект",
}) {
  const lines = title.split("\n");

  return (
    <div className="relative">
      <PageContainer className="relative pt-8 sm:py-14 lg:py-10">
        <div className="relative grid gap-6 xl:grid-cols-2 xl:items-end xl:gap-10">
          <div className="relative hidden min-h-[280px] sm:block sm:min-h-[320px] xl:min-h-[312px]" aria-hidden />

          <div data-reveal className="relative z-10 flex flex-col items-start gap-8 pb-12 sm:pb-0">
            <h1 className="text-[40px] font-medium leading-[52px]  text-white sm:text-5xl  lg:text-[64px] lg:leading-[76px]">
              {lines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < lines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <button
              type="button"
              className="btn-press hidden rounded-xl bg-[#c20f36] px-5 py-3 text-sm font-medium text-white hover:bg-[#e0123f] active:bg-[#ab0d30] sm:inline-flex sm:text-base"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
