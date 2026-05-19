import Link from "next/link";
import Image from "next/image";
import PageContainer from "@/components/ui/page-container";
import Logo from "@pub/logo.svg"

const menu = [
  { href: "/projects", label: "Проекты" },
  { href: "#services", label: "Услуги" },
  { href: "#contacts", label: "Контакты" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 ">
      <PageContainer className="grid grid-cols-2 h-[88px] items-center justify-between gap-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <Image width={"233px"} height={"88px"} src={Logo} />
          </Link>
        </div>
        <div>
          <nav className="flex items-center  gap-6 sm:gap-8">
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
        </div>
      </PageContainer>
    </header>
  );
}
