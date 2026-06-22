import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/ui/page-container";
import WalmiImg from "@pub/mock/projects-walmi.png";
import FinstroyImg from "@pub/mock/projects-finstroy.png";
import FinstroyWideImg from "@pub/mock/projects-finstroy-wide.png";
import ArchidocsImg from "@pub/mock/projects-archidocs.png";
import { getContent } from "@/lib/content";

const ROW1_IMAGES = [WalmiImg, FinstroyImg];
const WIDE_IMAGE = FinstroyWideImg;
const ROW2_IMAGES = [ArchidocsImg, ArchidocsImg];

function ProjectCard({ title, tags, imageIndex, imageSet, comingSoon = false, wide = false, href }) {
  const image = imageSet[imageIndex] ?? imageSet[0];
  const isLink = Boolean(href) && !comingSoon;
  const Wrapper = isLink ? Link : "article";
  const wrapperProps = isLink ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      data-reveal
      className={`flex flex-col gap-5 ${isLink ? "group/card transition-transform duration-300 active:scale-[0.99]" : ""}`}
    >
      <div className={`group relative overflow-hidden rounded-[32px] ${wide ? "aspect-[1312/484]" : "aspect-[646/484]"}`}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {comingSoon && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl bg-[#141414] px-4 py-2 whitespace-nowrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.9999 3C11.0543 3 8.6665 5.23752 8.52242 8.07025L3.70706 12.2929C3.31654 12.6834 3.31654 13.3166 3.70706 13.7071L4.29285 14.2929C4.68337 14.6834 5.31654 14.6834 5.70706 14.2929L7.00003 13L8.00003 14L6.70706 15.2929C6.31654 15.6834 6.31654 16.3166 6.70706 16.7071L7.29285 17.2929C7.68337 17.6834 8.31654 17.6834 8.70706 17.2929L10 16L11 17L9.70706 18.2929C9.31654 18.6834 9.31654 19.3166 9.70706 19.7071L10.2929 20.2929C10.6834 20.6834 11.3165 20.6834 11.7071 20.2929L13.9265 18.0735C16.7593 17.9295 18.9999 15.5416 18.9999 12.5C18.9999 9.46243 16.6374 7 13.9999 7V3Z" fill="#7a7a7a"/>
            </svg>
            <span className="text-sm text-[#7a7a7a]">Котята ещё собирают этот проект :(</span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 px-2">
        <p className="text-[24px] font-medium leading-tight text-[#fdfdfd] transition-colors group-hover/card:text-white md:text-[32px] md:leading-10">{title}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#292929] px-3 py-1 text-sm text-[#a5a5a5]">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default function ProjectsPage() {
  const { projectsList } = getContent();
  const { heading, row1, wideProject, row2 } = projectsList;

  return (
    <>
      <section className="py-8">
        <PageContainer>
          <div data-reveal className="rounded-[32px] bg-[#141414] px-8 py-8 text-center md:px-10 md:py-10">
            <h1 className="text-[40px] font-medium leading-tight text-[#fdfdfd] md:text-[64px] md:leading-[76px]">
              {heading}
            </h1>
          </div>
        </PageContainer>
      </section>

      <section className="py-10 md:py-16">
        <PageContainer className="flex flex-col gap-8 md:gap-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {row1.map((p, i) => (
              <ProjectCard key={p.id} {...p} imageIndex={i} imageSet={ROW1_IMAGES} />
            ))}
          </div>
          <ProjectCard {...wideProject} imageIndex={0} imageSet={[WIDE_IMAGE]} wide />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {row2.map((p, i) => (
              <ProjectCard key={p.id} {...p} imageIndex={i} imageSet={ROW2_IMAGES} />
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
