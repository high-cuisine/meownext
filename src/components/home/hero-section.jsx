import PageContainer from "@/components/ui/page-container";
import Image from "next/image";
import HeroBg from "@pub/bg-hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-visible">
      <Image
        className="pointer-events-none absolute bottom-0 left-1/2 h-[348px] w-[402px] max-w-none -translate-x-1/2 sm:h-[480px] sm:w-[1440px]"
        src={HeroBg}
        width={1440}
        height={480}
        alt=""
        aria-hidden
        priority
      />

      <PageContainer className="relative pt-8 sm:py-14 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
          <div className="hidden h-[312px] lg:block" />

          <div className="flex flex-col items-start gap-8 pb-12 pt-8 sm:pb-0 sm:pt-0">
            <h1 className="text-[40px] font-medium leading-[52px]  text-white sm:text-5xl  lg:text-[64px] lg:leading-[76px]">
              Укрепляем бизнес
              <br />
              через проверенные
              <br />
              дизайн-решения
            </h1>

            <button
              type="button"
              className="hidden rounded-xl bg-[#c20f36] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#ab0d30] sm:inline-flex sm:text-base"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
