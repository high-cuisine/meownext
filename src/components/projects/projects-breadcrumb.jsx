"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PageContainer from "@/components/ui/page-container";

const CHAR_DELAY = 65;
const START_DELAY = 300;

export default function ProjectsBreadcrumb({ titles }) {
  const pathname = usePathname();
  const slugMatch = /^\/projects\/([^/]+)\/?$/.exec(pathname || "");
  const activeSlug = slugMatch ? slugMatch[1] : null;
  const activeTitle = activeSlug ? (titles[activeSlug] ?? null) : null;

  const [displayedText, setDisplayedText] = useState(activeTitle ?? "");
  const [showCursor, setShowCursor] = useState(false);
  const prevTitleRef = useRef(activeTitle);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const prevTitle = prevTitleRef.current;
    clearTimeout(timeoutRef.current);

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayedText(activeTitle ?? "");
      setShowCursor(false);
      prevTitleRef.current = activeTitle;
      return;
    }

    if (activeTitle && !prevTitle) {
      let i = 0;
      setShowCursor(true);
      const typeNext = () => {
        i += 1;
        setDisplayedText(activeTitle.slice(0, i));
        if (i < activeTitle.length) {
          timeoutRef.current = setTimeout(typeNext, CHAR_DELAY);
        } else {
          setShowCursor(false);
        }
      };
      timeoutRef.current = setTimeout(typeNext, START_DELAY);
    } else if (!activeTitle && prevTitle) {
      let i = prevTitle.length;
      setShowCursor(true);
      setDisplayedText(prevTitle);
      const eraseNext = () => {
        i -= 1;
        setDisplayedText(prevTitle.slice(0, Math.max(i, 0)));
        if (i > 0) {
          timeoutRef.current = setTimeout(eraseNext, CHAR_DELAY);
        } else {
          setShowCursor(false);
        }
      };
      timeoutRef.current = setTimeout(eraseNext, CHAR_DELAY);
    } else if (activeTitle && prevTitle && activeTitle !== prevTitle) {
      let i = prevTitle.length;
      setShowCursor(true);
      const eraseThenType = () => {
        i -= 1;
        setDisplayedText(prevTitle.slice(0, Math.max(i, 0)));
        if (i > 0) {
          timeoutRef.current = setTimeout(eraseThenType, CHAR_DELAY);
        } else {
          let j = 0;
          const typeNext = () => {
            j += 1;
            setDisplayedText(activeTitle.slice(0, j));
            if (j < activeTitle.length) {
              timeoutRef.current = setTimeout(typeNext, CHAR_DELAY);
            } else {
              setShowCursor(false);
            }
          };
          timeoutRef.current = setTimeout(typeNext, CHAR_DELAY);
        }
      };
      timeoutRef.current = setTimeout(eraseThenType, CHAR_DELAY);
    } else {
      setDisplayedText(activeTitle ?? "");
      setShowCursor(false);
    }

    prevTitleRef.current = activeTitle;

    return () => clearTimeout(timeoutRef.current);
  }, [activeTitle]);

  const hasTitle = Boolean(displayedText);

  return (
    <section className="py-8">
      <PageContainer>
        <div className="flex items-center justify-center gap-3 rounded-[32px] bg-[#141414] px-10 py-8 text-center">
          <Link
            href="/projects"
            className={`text-[40px] font-medium leading-tight transition-colors md:text-[64px] md:leading-[76px] ${
              hasTitle
                ? "text-[#7a7a7a] hover:text-[#a5a5a5] active:text-[#fdfdfd]"
                : "text-[#fdfdfd]"
            }`}
          >
            Проекты
          </Link>
          {hasTitle && (
            <span className="inline-flex items-baseline whitespace-nowrap text-[40px] font-medium leading-tight text-[#fdfdfd] md:text-[64px] md:leading-[76px]">
              {displayedText}
              {showCursor && (
                <span
                  aria-hidden
                  className="typewriter-cursor ml-0.5 inline-block w-[3px] shrink-0 align-middle md:w-1"
                  style={{ height: "0.75em" }}
                />
              )}
            </span>
          )}
        </div>
      </PageContainer>
    </section>
  );
}
