import PageContainer from "@/components/ui/page-container";
import Image from "next/image";
import HeroBg from "@pub/bg-hero.jpg"

export default function HeroSection() {
  return (
    <section className="relative overflow-visible">
      <Image
        className="absolute bottom-0 left-0 right-0 mx-auto w-[1440px] h-[480px]"
        src={HeroBg}
        width={"1440px"}
        height={"480px"}
      />
      

      <PageContainer className="relative py-12 sm:py-14 lg:py-10">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div className="hidden h-[312px] lg:block" />

          <div className="flex flex-col items-start gap-9">
            <h1 className="text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[64px] lg:leading-[76px]">
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
