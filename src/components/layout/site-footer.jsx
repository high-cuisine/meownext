import Link from "next/link";
import PageContainer from "@/components/ui/page-container";

const socials = [
  { label: "Telegram", href: "#" },
  { label: "Behance", href: "#" },
];

const links = [
  { label: "Презентация", href: "#" },
  { label: "Политика конфиденциальности", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer
      id="contacts"
      className="border-t border-white/10 bg-[#0a0a0a] px-0 pb-12 pt-12 sm:pb-14 sm:pt-16"
    >
      <PageContainer className="grid gap-10 md:grid-cols-2">
        <div className="flex min-h-[180px] flex-col justify-between gap-4">
          <a
            href="mailto:meowdes.studio@gmail.com"
            className="text-2xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            meowdes.studio@gmail.com
          </a>
          <p className="text-sm text-zinc-500">© Meowdes 2026</p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-3 sm:max-w-[424px]">
            {socials.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-xl border border-white/10 bg-zinc-900 px-5 py-4 text-center text-sm text-zinc-300 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="w-fit text-sm text-zinc-400 transition-colors hover:text-white sm:text-base"
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
