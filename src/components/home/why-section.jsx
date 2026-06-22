import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import WhyCard1 from "@pub/home/why-card-1.png";
import WhyCard2 from "@pub/home/why-card-2.png";
import WhyCard3 from "@pub/home/why-card-3.png";

const CARD_IMAGES = [
  { image: WhyCard1, alt: "Иконка поиска и анализа задачи" },
  { image: WhyCard2, alt: "Иконка системного подхода и структуры" },
  { image: WhyCard3, alt: "Иконка прозрачного процесса и контроля" },
];

const DEFAULT_CARDS = [
  {
    title: "Разбираемся в задаче и делаем дизайн под цель проекта",
    text: "Вникаем в задачу, контекст и ограничения. Проектируем дизайн так, чтобы он решал конкретные цели проекта — привлекал, объяснял и помогал пользователю действовать.",
  },
  {
    title: "Система и адаптивность, ускоряющие релиз проекта",
    text: "Работаем с единой визуальной системой и продуманной адаптивностью. Поэтому разработчикам легче, внедрение быстрее, конверсия стабильнее.",
  },
  {
    title: "Прозрачный процесс и понятный объём работ",
    text: "Фиксируем состав работ, сроки и формат взаимодействия на старте. Вы понимаете, за что платите и какой результат получаете — без размытых этапов и неожиданных доплат.",
  },
];

export default function WhySection({ heading = "Почему мы?", cards = DEFAULT_CARDS }) {
  return (
    <section className="bg-[#0a0a0a] py-7 sm:py-16">
      <PageContainer>
        <h2 data-reveal className="text-[28px] font-semibold leading-[40px] sticky top-[120px] text-[#fdfdfd] sm:text-[40px] sm:leading-[48px]">
          {heading}
        </h2>

        <div className="mt-5 grid grid-rows-3 gap-3 md:mt-9 md:gap-5 lg:grid-cols-3 lg:grid-rows-1 sm:grid-rows-2 sm:grid-cols-2 relative">
          {cards.map((card, i) => {
            const img = CARD_IMAGES[i] ?? CARD_IMAGES[0];
            return (
              <article
                key={card.title}
                data-reveal
                className="flex h-full flex-col gap-5 rounded-[32px] sticky sm:relative top-[180px] md:top-auto bg-[#1f1f1f] p-5"
              >
                <div className="relative size-32 overflow-hidden rounded-[20px] border border-[#333333]">
                  <Image
                    src={img.image}
                    alt={img.alt}
                    width={128}
                    height={128}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-[24px] font-semibold leading-8  text-[#fdfdfd]">
                  {card.title}
                </h3>

                <p className="text-[16px] leading-6  text-[#a5a5a5]">
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}
