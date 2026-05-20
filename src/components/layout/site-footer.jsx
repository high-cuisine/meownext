import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/ui/page-container";

const socials = [
  { label: "Telegram", href: "#", icon: "/home/footer-telegram.svg" },
  { label: "Behance", href: "#", icon: "/home/footer-behance.svg" },
];

const links = [
  { label: "Презентация", href: "#" },
  { label: "Политика конфиденциальности", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer
      id="contacts"
      className="border-t border-[#333333] bg-[#0a0a0a] pb-12 pt-12 md:pt-16"
    >
      <PageContainer className="flex flex-col gap-12 md:flex-row md:items-stretch md:gap-5">
        <div className="flex min-h-[176px] min-w-0 flex-1 flex-col justify-between gap-5">
          <a
            href="mailto:meowdes.studio@gmail.com"
            className="w-fit text-[32px] font-medium leading-[1.2] tracking-[-1px] text-[#fdfdfd] transition-colors hover:text-[#ffffff] md:text-[40px] md:leading-[48px] md:tracking-[-1.33px]"
          >
            meowdes.studio@gmail.com
          </a>
          <p className="text-sm leading-5 tracking-[-0.33px] text-[#7a7a7a]">© Meowdes 2026</p>
        </div>

        <div className="flex w-full max-w-[424px] min-w-0 flex-col gap-12">
          <div className="grid w-full grid-cols-2 gap-3">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group flex flex-col items-center gap-1 rounded-xl bg-[#141414] px-6 py-3 transition-colors hover:bg-[#1f1f1f]"
                aria-label={item.label}
              >
                <span className="flex items-center rounded-xl p-3">
                  <span className="relative size-12">
                    <Image src={item.icon} alt="" aria-hidden fill className="object-contain" />
                  </span>
                </span>
                <span className="text-base leading-6 tracking-[-0.66px] text-[#a5a5a5] transition-colors group-hover:text-[#fdfdfd]">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-start gap-3">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit px-1 text-base font-medium leading-6 tracking-[-0.66px] text-[#a5a5a5] transition-colors hover:text-[#fdfdfd]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
