import PageContainer from "@/components/ui/page-container";
import Image from "next/image";
import HeroBg from "@pub/bg-hero.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-x-clip overflow-y-visible">
      <Image
        className="pointer-events-none absolute transition-all duration-500 -top-[200px] -left-[50%] max-w-[1440px] sm:left-0 xl:right-0 xl:mx-auto xl:top-auto xl:bottom-0 h-[480px] xl:w-[1440px]"
        src={HeroBg}
        width={1440}
        height={480}
        alt=""
        aria-hidden
        priority
      />

      <PageContainer className="relative pt-8 sm:py-14 lg:py-10">
        <div className="grid gap-6 xl:grid-cols-2 xl:items-end xl:gap-10">
          <div className="hidden h-[312px] xl:block" />

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
