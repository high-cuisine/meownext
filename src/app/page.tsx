import HomeBanner from "@/components/home/home-banner";
import BalanceSection from "@/components/home/balance-section";
import ContactSection from "@/components/home/contact-section";
import ProcessSection from "@/components/home/process-section";
import RoadmapSection from "@/components/home/roadmap-section";
import WhySection from "@/components/home/why-section";
import { getContent } from "@/lib/content";

export default function Home() {
  const c = getContent();
  return (
    <>
      <HomeBanner hero={c.hero} cases={c.cases} />
      <BalanceSection heading={c.balance.heading} description={c.balance.description} ctaText={c.balance.ctaText} />
      <WhySection heading={c.why.heading} cards={c.why.cards} />
      <ProcessSection heading={c.process.heading} subtext={c.process.subtext} steps={c.process.steps} />
      <RoadmapSection heading={c.roadmap.heading} subtext={c.roadmap.subtext} cards={c.roadmap.cards} timelineDays={c.roadmap.timelineDays} />
      <ContactSection heading={c.contact.heading} />
    </>
  );
}
