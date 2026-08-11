"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { isMotionExcludedPath, prefersReducedMotion } from "@/lib/motion-pages";

const LOADER_SOURCES = {
  mobile: "/loaders/logo-mobile.json",
  desktop: "/loaders/logo-desktop.json",
};

const SESSION_KEY = "meowdes-site-loader-seen";
const CLOSE_MS = 420;

function loadLottieLibrary() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("SSR"));
  }

  if (window.lottie) {
    return Promise.resolve(window.lottie);
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-lottie-web="true"]');

    if (existing) {
      existing.addEventListener("load", () => resolve(window.lottie));
      existing.addEventListener("error", () => reject(new Error("Lottie load failed")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
    script.async = true;
    script.dataset.lottieWeb = "true";
    script.onload = () => resolve(window.lottie);
    script.onerror = () => reject(new Error("Lottie load failed"));
    document.head.appendChild(script);
  });
}

export default function SiteLoader() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isMotionExcludedPath(pathname ?? "") || prefersReducedMotion()) {
      return;
    }

    if (sessionStorage.getItem(SESSION_KEY) === "1") {
      return;
    }

    let cancelled = false;

    const finish = () => {
      if (cancelled) {
        return;
      }

      sessionStorage.setItem(SESSION_KEY, "1");
      setClosing(true);
      closeTimerRef.current = window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, CLOSE_MS);
    };

    setVisible(true);
    document.body.style.overflow = "hidden";

    (async () => {
      try {
        const lottie = await loadLottieLibrary();
        const isDesktop = window.matchMedia("(min-width: 768px)").matches;
        const src = isDesktop ? LOADER_SOURCES.desktop : LOADER_SOURCES.mobile;
        const response = await fetch(src);

        if (!response.ok) {
          throw new Error("Loader animation fetch failed");
        }

        const animationData = await response.json();

        if (cancelled || !containerRef.current) {
          return;
        }

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: true,
          animationData,
        });

        animationRef.current.addEventListener("complete", finish);
      } catch {
        finish();
      }
    })();

    return () => {
      cancelled = true;
      animationRef.current?.destroy();
      animationRef.current = null;

      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }

      document.body.style.overflow = "";
    };
  }, [pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden={closing}
      className={`site-loader ${closing ? "site-loader--closing" : ""}`}
    >
      <div ref={containerRef} className="site-loader__animation" />
    </div>
  );
}
