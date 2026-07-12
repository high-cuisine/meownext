import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageContainer from "@/components/ui/page-container";
import TypewriterText from "@/components/ui/typewriter-text";
import HeroImg from "@pub/mock/walmi-hero.png";
import Screen1Img from "@pub/mock/walmi-screen1.png";
import Screen2Img from "@pub/mock/walmi-screen2.png";
import WideImg from "@pub/mock/walmi-wide.png";
import FinalImg from "@pub/mock/walmi-final.png";
import { getContent } from "@/lib/content";

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const { projectsDetail } = getContent();
  const project = projectsDetail[slug];

  if (!project) {
    notFound();
  }

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-8">
        <PageContainer>
          <div className="flex items-center justify-center gap-3 rounded-[32px] bg-[#141414] px-10 py-8 text-center">
            <Link
              href="/projects"
              className="text-[40px] font-medium leading-tight text-[#7a7a7a] transition-colors hover:text-[#a5a5a5] active:text-[#fdfdfd] md:text-[64px] md:leading-[76px]"
            >
              Проекты
            </Link>
            <TypewriterText
              text={project.title}
              className="text-[40px] font-medium leading-tight text-[#fdfdfd] md:text-[64px] md:leading-[76px]"
            />
          </div>
        </PageContainer>
      </section>

      {/* Hero image + buttons */}
      <section className="pb-12 pt-8">
        <PageContainer className="flex flex-col gap-5">
          <div data-reveal className="relative w-full overflow-hidden rounded-[32px]">
            <Image
              src={HeroImg}
              alt={project.title}
              className="w-full object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="btn-press group flex items-center justify-between rounded-[32px] bg-[#141414] px-10 py-8 hover:bg-[#333333] active:bg-[#292929]"
            >
              <span className="text-base font-medium text-[#a5a5a5] transition-colors group-hover:text-[#fdfdfd]">Перейти на сайт</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#7a7a7a] transition-colors group-hover:text-[#fdfdfd]"/>
              </svg>
            </a>
            <a
              href={project.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="btn-press group flex items-center justify-between rounded-[32px] bg-[#141414] px-10 py-8 hover:bg-[#333333] active:bg-[#292929]"
            >
              <span className="text-base font-medium text-[#a5a5a5] transition-colors group-hover:text-[#fdfdfd]">Кейс на Behance</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path className="fill-[#7a7a7a] transition-colors group-hover:fill-[#fdfdfd]" d="M17.46 8.81152C18.2557 8.81157 18.9722 8.95266 19.6094 9.23438C20.2478 9.51513 20.7736 9.96152 21.1875 10.5693C21.5649 11.1052 21.8074 11.7272 21.918 12.4336C21.9826 12.8465 22.0086 13.4455 21.998 14.2236H15.3389C15.3789 15.1272 15.6939 15.7619 16.2959 16.125C16.6604 16.3511 17.0993 16.4648 17.6143 16.4648C18.1561 16.4648 18.5997 16.3266 18.9395 16.0518C19.1263 15.9021 19.2916 15.695 19.4326 15.4307H21.8721C21.8074 15.964 21.5113 16.5086 20.9873 17.0605C20.169 17.9363 19.0219 18.3748 17.5488 18.375C16.3319 18.375 15.2578 18.0066 14.3301 17.2666C13.3975 16.5276 12.9336 15.3232 12.9336 13.6572C12.9337 12.0947 13.354 10.8956 14.1924 10.0615C15.0331 9.23021 16.121 8.81156 17.46 8.81152ZM7.97266 5.875C9.47994 5.89714 10.5467 6.33034 11.1758 7.1748C11.5531 7.69324 11.7421 8.31268 11.7422 9.03516C11.7422 9.77859 11.5529 10.3786 11.1709 10.8311C10.957 11.0838 10.6424 11.3157 10.2275 11.5244C10.8577 11.7518 11.3339 12.1109 11.6572 12.6016C11.9769 13.0909 12.1376 13.6874 12.1377 14.3877C12.1377 15.1102 11.9538 15.7591 11.5859 16.332C11.3532 16.7112 11.0612 17.0322 10.7109 17.292C10.3172 17.5899 9.85251 17.7929 9.31543 17.9043C8.77818 18.0145 8.19707 18.0683 7.56934 18.0684H2V5.875H7.97266ZM4.46289 12.6992V15.9512H7.46387C8.00011 15.9512 8.41928 15.879 8.7168 15.7363C9.25845 15.4694 9.52926 14.9639 9.5293 14.2148C9.52918 13.5793 9.2677 13.144 8.74219 12.9062C8.44821 12.7741 8.03491 12.7039 7.50586 12.6992H4.46289ZM17.4609 10.7559C16.8496 10.7559 16.3717 10.9282 16.0342 11.2715C15.6969 11.6148 15.4835 12.0803 15.3965 12.667H19.5166C19.473 12.0407 19.2585 11.5671 18.8799 11.2412C18.4966 10.9178 18.0251 10.7559 17.4609 10.7559ZM4.46289 7.99219V10.6826H7.46875C8.00375 10.6826 8.44007 10.5817 8.77637 10.3799C9.11015 10.1781 9.27822 9.8207 9.27832 9.31055C9.27821 8.74119 9.05724 8.36589 8.61523 8.18262C8.2319 8.0562 7.74473 7.99219 7.15332 7.99219H4.46289ZM20.0762 7.95996H14.7803V6.44336H20.0762V7.95996Z"/>
              </svg>
            </a>
          </div>
        </PageContainer>
      </section>

      {/* Description */}
      <section className="py-10 md:py-12">
        <PageContainer>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-5">
            <div data-reveal className="px-2">
              <h1 className="text-[28px] font-medium leading-tight text-[#fdfdfd] md:text-[40px] md:leading-[48px]">
                {project.subtitle}
              </h1>
            </div>
            <div data-reveal className="px-2">
              <p className="whitespace-pre-line text-base leading-6 text-[#a5a5a5]">
                {project.description}
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Two screenshots */}
      <section className="py-10 md:py-16">
        <PageContainer>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div data-reveal className="relative overflow-hidden rounded-[32px]">
              <Image src={Screen1Img} alt="" aria-hidden className="w-full object-cover" />
            </div>
            <div data-reveal className="relative overflow-hidden rounded-[32px]">
              <Image src={Screen2Img} alt="" aria-hidden className="w-full object-cover" />
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Sections 01, 02 */}
      {project.sections.slice(0, 2).map((s) => (
        <section key={s.number} data-reveal className="py-5">
          <PageContainer>
            <div className="px-2">
              <p className="text-xl font-medium text-[#7a7a7a]">{s.number}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-5 border-t border-[#4e4e4e] pt-4 md:grid-cols-2">
              <div className="px-2">
                <p className="text-xl font-medium text-[#fdfdfd]">{s.label}</p>
              </div>
              <div className="px-2">
                <p className="whitespace-pre-line text-base leading-6 text-[#fdfdfd]">{s.text}</p>
              </div>
            </div>
          </PageContainer>
        </section>
      ))}

      {/* Wide image */}
      <section className="py-10 md:py-16">
        <PageContainer>
          <div data-reveal className="relative overflow-hidden rounded-[32px]">
            <Image src={WideImg} alt="" aria-hidden className="w-full object-cover" />
          </div>
        </PageContainer>
      </section>

      {/* Section 03 */}
      {project.sections.slice(2).map((s) => (
        <section key={s.number} data-reveal className="py-5">
          <PageContainer>
            <div className="px-2">
              <p className="text-xl font-medium text-[#7a7a7a]">{s.number}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-5 border-t border-[#4e4e4e] pt-4 md:grid-cols-2">
              <div className="px-2">
                <p className="text-xl font-medium text-[#fdfdfd]">{s.label}</p>
              </div>
              <div className="px-2">
                <p className="whitespace-pre-line text-base leading-6 text-[#fdfdfd]">{s.text}</p>
              </div>
            </div>
          </PageContainer>
        </section>
      ))}

      {/* Stats */}
      <section className="py-9">
        <PageContainer>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {project.stats.map((s) => (
              <div
                key={s.value}
                data-reveal
                className="flex flex-col gap-9 rounded-[32px] bg-[#1f1f1f] px-10 py-8"
              >
                <p className="text-base leading-6 text-[#a5a5a5]">{s.note}</p>
                <div className="flex flex-col gap-0">
                  <div className="flex items-start gap-1">
                    <p className="text-[56px] font-medium leading-tight text-[#fdfdfd] md:text-[72px]">
                      {s.value}
                    </p>
                    {s.badge && (
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#24bc4c]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                          <path d="M8 12V4M4 8l4-4 4 4" stroke="#292929" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-base leading-6 text-[#fdfdfd]">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* Final image */}
      <section className="py-10 md:py-16">
        <PageContainer>
          <div data-reveal className="relative overflow-hidden rounded-[32px]">
            <Image src={FinalImg} alt="" aria-hidden className="w-full object-cover" />
          </div>
        </PageContainer>
      </section>
    </>
  );
}
