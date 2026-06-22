import PageContainer from "@/components/ui/page-container";
import ContactSection from "@/components/home/contact-section";
import { getContent } from "@/lib/content";

function ServiceRow({ number, badge, title, description, tags, deadline, price, isLast }) {
  return (
    <li>
      <article data-reveal className="flex flex-col gap-4 py-8 md:flex-row md:items-start md:gap-5">
        {/* Left: number + badge + title */}
        <div className="flex min-w-0 flex-1 items-start gap-4 pl-3">
          <span className="w-20 shrink-0 pt-8 text-[40px] font-medium leading-none text-[#7a7a7a]">
            {number}
          </span>
          <div className="flex flex-col gap-2">
            <span className="text-[12px] font-normal tracking-wide text-[#e0123f]">{badge}</span>
            <h2 className="text-[32px] font-semibold leading-tight text-[#fdfdfd] md:text-[40px] lg:text-[48px]">
              {title}
            </h2>
          </div>
        </div>

        {/* Right: description + tags + deadline + price */}
        <div className="flex min-w-0 flex-1 items-center justify-between gap-4 pr-3">
          <div className="flex flex-col gap-4">
            <p className="text-base leading-6 text-[#a5a5a5]">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#292929] px-3 py-1 text-sm text-[#a5a5a5]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-[#7a7a7a]">Срок</span>
              <span className="text-base text-[#fdfdfd]">{deadline}</span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <span className="text-2xl font-semibold text-[#fdfdfd] md:text-[32px]">{price}</span>
          </div>
        </div>
      </article>
      {!isLast && <div className="mx-3 h-px bg-[#333333]" />}
    </li>
  );
}

export default function ServicesPage() {
  const { services, contact } = getContent();

  return (
    <>
      {/* Title */}
      <section className="py-8" id="services">
        <PageContainer>
          <div data-reveal className="rounded-[32px] bg-[#141414] px-8 py-8 text-center md:px-10 md:py-10">
            <h1 className="text-[40px] font-medium leading-tight text-[#fdfdfd] md:text-[64px] md:leading-[76px]">
              {services.heading}
            </h1>
          </div>
        </PageContainer>
      </section>

      {/* Services list */}
      <section className="py-4">
        <PageContainer>
          <ul className="flex flex-col">
            {services.items.map((s, i) => (
              <ServiceRow key={s.number} {...s} isLast={i === services.items.length - 1} />
            ))}
          </ul>

          {/* Disclaimer */}
          <div data-reveal className="mt-5 flex items-center gap-4 rounded-[16px] border border-[#333333] bg-[#141414] px-6 py-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="#a5a5a5" strokeWidth="1.5"/>
              <path d="M12 8v4M12 16h.01" stroke="#a5a5a5" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <p className="text-base text-[#a5a5a5]">
              {services.disclaimer}
            </p>
          </div>
        </PageContainer>
      </section>

      {/* Contact form */}
      <ContactSection heading={contact.heading} />
    </>
  );
}
