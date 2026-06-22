"use client";

import PageContainer from "@/components/ui/page-container";
import Case1 from "@pub/mock/case.png";
import Case2 from "@pub/mock/case (1).png";
import Case3 from "@pub/mock/case (2).png";
import Image from "next/image";
import { useState } from "react";

const CASE_ASSETS = [
  { image: Case1, tone: "from-zinc-700 via-zinc-900 to-zinc-950" },
  { image: Case2, tone: "from-emerald-600 via-emerald-800 to-zinc-950" },
  { image: Case3, tone: "from-slate-300 via-slate-500 to-slate-800" },
];

const DEFAULT_CASES = [
  { id: 1, title: "Walmi", type: "Site" },
  { id: 2, title: "FinStroy", type: null },
  { id: 3, title: "ArchiDocs", type: null },
];

export default function CasesSection({ cases = DEFAULT_CASES }) {
  const [hovered, setHovered] = useState([]);

  return (
    <div className="relative py-5 sm:py-10">
      <PageContainer className="px-1 sm:px-8 xl:px-0">
        <div className="grid gap-1 sm:gap-4 md:grid-cols-3 sm:grid-cols-2">
          {cases.map((item, index) => {
            const assets = CASE_ASSETS[index] ?? CASE_ASSETS[0];
            return (
            <article
              data-reveal
              onMouseEnter={() =>
                setHovered((prev) =>
                  prev.includes(item.id) ? prev : [...prev, item.id]
                )
              }
              onMouseLeave={() =>
                setHovered((prev) =>
                  prev.filter((e) => e !== item.id),
                )
              }
              key={item.id}
              className={`relative flex aspect-square cursor-pointer items-end overflow-hidden rounded-[32px] bg-[#000] transition-transform duration-300 active:scale-[0.99] ${
                index === 2 ? "hidden md:flex" : ""
              }`}
            >
              <Image src={assets.image} alt="" aria-hidden className="pointer-events-none absolute scale-105 blur-md" />
              <Image src={assets.image} alt="" aria-hidden className="pointer-events-none absolute scale-105 blur-sm" />
              <Image src={assets.image} alt={item.title} className="pointer-events-none absolute h-full w-full" />

              <div
                style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.64) 100%)" }}
                className={`z-10 grid w-full grid-cols-2 items-end p-6 transition-all duration-350 ease-in-out ${
                  hovered.includes(item.id) ? "opacity-100 " : "translate-y-7 opacity-0"
                }`}
              >
                <p
                  className={`text-[32px] line-clamp-1 leading-9 font-medium text-white`}
                >
                  {item.title}
                </p>
                <p
                  className={`text-[14px] line-clamp-1 text-end font-medium text-white`}
                >
                  {item?.type || "Type"}
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </PageContainer>
    </div>
  );
}
