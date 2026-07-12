import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

export default function BalanceSection({
  heading = "Идеальный баланс между UX, UI и бизнес-результатом для цифровых продуктов",
  description = "Проектируем интерфейсы, в которых пользовательский опыт, визуальная система и цели бизнеса выстроены в единую, работающую модель",
  ctaText = "Наши услуги",
}) {
  return (
    <section className="bg-[#0a0a0a] py-7 sm:py-16">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-5">
          <div data-reveal className="order-2 flex flex-col items-start gap-5 lg:order-1 lg:gap-8">
            <h2 className="max-w-[690px] text-[28px] font-medium leading-[40px]  text-white sm:text-[40px] sm:leading-[48px]">
              {heading}
            </h2>

            <p className="max-w-[660px] text-[16px] leading-6  text-[#fdfdfd] sm:text-[18px] sm:leading-7">
              {description}
            </p>

            <button
              type="button"
              className="btn-press rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium leading-6  text-white hover:bg-[#ab0d30] active:bg-[#8f0b28]"
            >
              {ctaText}
            </button>
          </div>

          <div
            data-reveal
            className="order-1 relative aspect-[646/400] w-full overflow-hidden rounded-[32px] border border-[#333333] bg-[#141414] lg:order-2"
          >
            <Image
              src="/home/balance-image.png"
              alt="Иллюстрация баланса UX, UI и бизнес-целей"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
