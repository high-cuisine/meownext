"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealText() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const elements = Array.from(document.querySelectorAll("main [data-reveal]"));
    const reveal = (el) => el.setAttribute("data-revealed", "");

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
