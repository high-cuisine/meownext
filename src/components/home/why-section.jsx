import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import WhyCard1 from "@pub/home/why-card-1.png";
import WhyCard2 from "@pub/home/why-card-2.png";
import WhyCard3 from "@pub/home/why-card-3.png";

const cards = [
  {
    title: "Разбираемся в задаче и делаем дизайн под цель проекта",
    text: "Вникаем в задачу, контекст и ограничения. Проектируем дизайн так, чтобы он решал конкретные цели проекта — привлекал, объяснял и помогал пользователю действовать.",
    image: WhyCard1,
    alt: "Иконка поиска и анализа задачи",
  },
  {
    title: "Система и адаптивность, ускоряющие релиз проекта",
    text: "Работаем с единой визуальной системой и продуманной адаптивностью. Поэтому разработчикам легче, внедрение быстрее, конверсия стабильнее.",
    image: WhyCard2,
    alt: "Иконка системного подхода и структуры",
  },
  {
    title: "Прозрачный процесс и понятный объём работ",
    text: "Фиксируем состав работ, сроки и формат взаимодействия на старте. Вы понимаете, за что платите и какой результат получаете — без размытых этапов и неожиданных доплат.",
    image: WhyCard3,
    alt: "Иконка прозрачного процесса и контроля",
  },
];

export default function WhySection() {
  return (
    <section className="bg-[#0a0a0a] py-12 sm:py-16">
      <PageContainer>
        <h2 className="text-[32px] font-semibold leading-[40px] tracking-[-1px] text-[#fdfdfd] sm:text-[40px] sm:leading-[48px] sm:tracking-[-1.33px]">
          Почему мы?
        </h2>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="flex h-full flex-col gap-5 rounded-[32px] bg-[#1f1f1f] p-5"
            >
              <div className="relative size-32 overflow-hidden rounded-[20px] border border-[#333333]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={128}
                  height={128}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>

              <h3 className="text-[24px] font-semibold leading-8 tracking-[-1.33px] text-[#fdfdfd]">
                {card.title}
              </h3>

              <p className="text-[16px] leading-6 tracking-[-0.33px] text-[#a5a5a5]">
                {card.text}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
