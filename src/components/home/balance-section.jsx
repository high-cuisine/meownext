import Image from "next/image";
import PageContainer from "@/components/ui/page-container";

export default function BalanceSection() {
  return (
    <section className="bg-[#0a0a0a] py-10 sm:py-16">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-5">
          <div className="flex flex-col items-start gap-8">
            <div id="roundnessSelector" className="inline-flex rounded-full border border-[#333333] bg-[#141414] p-1">
              <span className="flex items-center justify-center rounded-full px-5 py-2">
                <Image
                  src="/home/angle-low.svg"
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="size-6"
                  loading="lazy"
                />
              </span>
              <span className="flex items-center justify-center rounded-full bg-[#333333] px-5 py-2">
                <Image
                  src="/home/angle-mid.svg"
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="size-6"
                  loading="lazy"
                />
              </span>
              <span className="flex items-center justify-center rounded-full px-5 py-2">
                <Image
                  src="/home/angle-high.svg"
                  alt=""
                  aria-hidden
                  width={24}
                  height={24}
                  className="size-6"
                  loading="lazy"
                />
              </span>
            </div>

            <h2 className="max-w-[690px] text-[34px] font-medium leading-[1.2] tracking-[-1.2px] text-white sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
              Идеальный баланс между UX, UI и бизнес-результатом для цифровых продуктов
            </h2>

            <p className="max-w-[660px] text-[16px] leading-7 tracking-[-0.33px] text-[#fdfdfd] sm:text-[18px]">
              Проектируем интерфейсы, в которых пользовательский опыт, визуальная система и цели бизнеса
              выстроены в единую, работающую модель
            </p>

            <button
              type="button"
              className="rounded-xl bg-[#c20f36] px-5 py-3 text-base font-medium leading-6 tracking-[-0.66px] text-white transition-colors hover:bg-[#ab0d30]"
            >
              Наши услуги
            </button>
          </div>

          <div className="relative aspect-[646/400] w-full overflow-hidden rounded-[32px] border border-[#333333] bg-[#141414]">
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
