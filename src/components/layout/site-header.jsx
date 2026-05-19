import Link from "next/link";
import PageContainer from "@/components/ui/page-container";

const menu = [
  { href: "/projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#contacts", label: "Контакты" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/00 backdrop-blur">
      <PageContainer className="flex h-[88px] items-center justify-between gap-6">
        <Link href="/" className="inline-flex items-center gap-2 text-white">
          <span className="text-lg font-semibold tracking-tight">Meowdes</span>
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-300 transition-colors hover:text-white sm:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </PageContainer>
    </header>
  );
}
