import BalanceSection from "@/components/home/balance-section";
import CasesSection from "@/components/home/cases-section";
import ContactSection from "@/components/home/contact-section";
import HeroSection from "@/components/home/hero-section";
import ProcessSection from "@/components/home/process-section";
import RoadmapSection from "@/components/home/roadmap-section";
import WhySection from "@/components/home/why-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CasesSection />
      <BalanceSection />
      <WhySection />
      <ProcessSection />
      <RoadmapSection />
      <ContactSection />
    </>
  );
}
