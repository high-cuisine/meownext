import PageContainer from "@/components/ui/page-container";
import ContactForm from "@/components/forms/contact-form";
import ShaderBg from "@/components/home/shader-bg";
import { CONTACT_SHADER_PRESET } from "@/components/home/shader-preset";

export default function ContactSection({ heading = "Начнём работу?" }) {
  return (
    <section id="cooperation" className="relative overflow-hidden bg-black py-7 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      >
        <div className="relative h-full w-full">
          <ShaderBg
            preset={CONTACT_SHADER_PRESET}
            className="block h-full w-full object-cover"
          />
        </div>
      </div>

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
