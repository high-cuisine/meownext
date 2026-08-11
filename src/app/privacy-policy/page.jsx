import PageContainer from "@/components/ui/page-container";
import { getContent } from "@/lib/content";

function Paragraphs({ items }) {
  return items.map((text, i) => (
    <p key={i} className="text-base leading-6 text-[#a5a5a5]">
      {text}
    </p>
  ));
}

function PolicySection({ title, items, isLast }) {
  return (
    <div
      data-reveal
      className={`flex flex-col gap-3 py-8 ${isLast ? "" : "border-b border-[#333333]"}`}
    >
      {title && (
        <h2 className="text-[20px] font-semibold leading-6 text-[#fdfdfd]">{title}</h2>
      )}
      <Paragraphs items={items} />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const { privacyPolicy } = getContent();
  const { heading, publishedDate, preamble, terms, articles, contacts } = privacyPolicy;

  return (
    <>
      {/* Title */}
      <section className="py-8">
        <PageContainer>
          <div data-reveal className="min-w-0 rounded-[32px] bg-[#141414] px-5 py-8 text-center sm:px-8 md:px-10 md:py-10">
            <h1 className="break-words text-[28px] font-medium leading-[36px] text-[#fdfdfd] sm:text-[40px] sm:leading-tight md:text-[64px] md:leading-[76px]">
              {heading}
            </h1>
          </div>
        </PageContainer>
      </section>

      {/* Document body */}
      <section className="py-4 pb-16">
        <PageContainer>
          <div className="mx-auto flex max-w-[800px] flex-col">
            <div data-reveal className="flex flex-col gap-3 border-b border-[#333333] py-8">
              <p className="text-sm leading-5 text-[#4e4e4e]">{publishedDate}</p>
              <Paragraphs items={preamble} />
            </div>

            <PolicySection title={terms.heading} items={terms.items} />

            {articles.map((article) => (
              <PolicySection key={article.title} title={article.title} items={article.items} />
            ))}

            <PolicySection title={contacts.heading} items={contacts.items} isLast />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
