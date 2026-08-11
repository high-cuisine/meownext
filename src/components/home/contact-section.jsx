import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import ContactForm from "@/components/forms/contact-form";

export default function ContactSection({ heading = "Начнём работу?" }) {
  return (
    <section id="cooperation" className="relative overflow-hidden bg-black py-7 sm:py-16">
      <Image
        src="/home/contact-bg.png"
        alt=""
        aria-hidden
        fill
        className="pointer-events-none absolute inset-0 z-[1] object-cover"
      />

      <PageContainer className="relative z-10">
        <div data-reveal className="mx-auto max-w-[713px]">
          <h2 className="text-[28px] font-semibold leading-[40px]  text-[#fdfdfd] sm:text-center sm:text-[40px] sm:leading-[48px]">
            {heading}
          </h2>

          <div className="mt-5 sm:mt-8">
            <ContactForm idPrefix="contact-section" />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
