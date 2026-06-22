import CasesSection from "@/components/home/cases-section";
import HeroSection from "@/components/home/hero-section";
import ShaderBg from "@/components/home/shader-bg";
import { HOME_SHADER_PRESET } from "@/components/home/shader-preset";

export default function HomeBanner({ hero, cases }) {
  return (
    <section className="relative overflow-x-clip overflow-y-visible">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 w-screen -translate-x-1/2 overflow-hidden"
      >
        <ShaderBg
          preset={HOME_SHADER_PRESET}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative z-10">
        <HeroSection title={hero.title} ctaText={hero.ctaText} />
        <CasesSection cases={cases} />
      </div>
    </section>
  );
}
