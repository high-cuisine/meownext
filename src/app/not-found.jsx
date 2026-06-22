import Link from "next/link";
import PageContainer from "@/components/ui/page-container";

export const metadata = {
  title: "404 — Meowdes",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-88px)] items-center py-16">
      <PageContainer>
        <div data-reveal className="flex flex-col items-center gap-8 text-center">
          <div className="relative select-none">
            <span
              className="block text-[160px] font-medium leading-none text-[#141414] sm:text-[220px] lg:text-[300px]"
              aria-hidden
            >
              404
            </span>
            <span className="absolute inset-0 flex items-center justify-center text-[160px] font-medium leading-none text-[#fdfdfd] sm:text-[220px] lg:text-[300px]"
              style={{ WebkitTextStroke: "1px #333333", color: "transparent" }}
            >
              404
            </span>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[28px] font-medium leading-tight text-[#fdfdfd] sm:text-[40px]">
              Страница не найдена
            </h1>
            <p className="max-w-[480px] text-base leading-6 text-[#a5a5a5]">
              Возможно, она была удалена, переименована или никогда не существовала.
            </p>
          </div>

          <Link
            href="/"
            className="btn-press rounded-xl bg-[#c20f36] px-6 py-3 text-base font-medium text-[#fdfdfd] hover:bg-[#ab0d30] active:bg-[#8f0b28]"
          >
            На главную
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
