"use client"

import PageContainer from "@/components/ui/page-container";
import Case1 from "@pub/mock/case.png"
import Case2 from "@pub/mock/case (1).png"
import Case3 from "@pub/mock/case (2).png"
import Image from "next/image";
import { useState } from "react";

const cases = [
  { id: 1, title: "Walmi", tone: "from-zinc-700 via-zinc-900 to-zinc-950", image: Case1, type: "Site" },
  { id: 2, title: "FinStroy", tone: "from-emerald-600 via-emerald-800 to-zinc-950", image: Case2 },
  { id: 3, title: "ArchiDocs", tone: "from-slate-300 via-slate-500 to-slate-800", image: Case3 },
];

export default function CasesSection() {
  const [hovered, setHovered] = useState([]);
  return (
    <section className="py-8 sm:py-10">
      <PageContainer>
        <div className="grid gap-4 md:grid-cols-3">
          {cases.map((item) => (
            <article
              onMouseEnter={() =>
                setHovered((prev) =>
                  prev.includes(item.id) ? prev : [...prev, item.id]
                )
              }
              onMouseLeave={() =>
                setHovered((prev) =>
                  prev.filter((e) => e !== item.id)
                )
              }
              key={item.id}
              className={`bg-[#000] cursor-pointer relative aspect-square overflow-hidden rounded-[28px] flex items-end`}
            >
              <Image src={item.image} className="pointer-events-none absolute scale-105 blur-md" />
              <Image src={item.image} className="pointer-events-none absolute scale-105 blur-sm" />
              
              
              <Image src={item.image} className="pointer-events-none absolute w-full h-full" />

              <div style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.64) 100%)"}} className={`grid grid-cols-2 items-end z-10 p-[24px] transition-all ease-in-out duration-350 w-full ${hovered.includes(item.id) ? "opacity-100 " : "opacity-0 translate-y-7"}`}>
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
          ))}
        </div>
      </PageContainer>

    </section >
  );
}
