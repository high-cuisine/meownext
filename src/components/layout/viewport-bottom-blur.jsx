"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  BOTTOM_BLUR_FADE_ZONE,
  getBottomBlurOpacity,
  isBlurEnabledPath,
} from "@/lib/motion-pages";

const BLUR_LAYERS = [
  "blur-layer--1",
  "blur-layer--2",
  "blur-layer--3",
  "blur-layer--4",
  "blur-layer--5",
  "blur-layer--6",
  "blur-layer--7",
  "blur-layer--8",
];

const FOOTER_SELECTOR = "#contacts";

function applyBlurVisibility(element, opacity) {
  const value = Math.max(0, Math.min(1, opacity));
  const offset = (1 - value) * 100;

  // Never drive backdrop-filter through opacity — WebKit stops restoring blur after opacity: 0.
  element.style.opacity = "1";
  element.style.visibility = value <= 0 ? "hidden" : "visible";
  element.style.transform =
    offset <= 0 ? "translate3d(0, 0, 0)" : `translate3d(0, ${offset}%, 0)`;
}

export default function ViewportBottomBlur() {
  const pathname = usePathname();
  const blurRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isBlurEnabledPath(pathname ?? ""));
  }, [pathname]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frameId = 0;
    let watchdogId = 0;
    let lastValue = -1;
    let resizeObserver = null;
    let footerObserver = null;

    const update = () => {
      const element = blurRef.current;
      if (!element) {
        return;
      }

      const value = getBottomBlurOpacity();
      const rounded = Math.round(value * 1000) / 1000;

      if (rounded === lastValue) {
        return;
      }

      lastValue = rounded;
      applyBlurVisibility(element, value);

      if (rounded <= 0 && !watchdogId) {
        const watchdog = () => {
          update();

          if (lastValue <= 0) {
            watchdogId = window.requestAnimationFrame(watchdog);
          } else {
            watchdogId = 0;
          }
        };

        watchdogId = window.requestAnimationFrame(watchdog);
      }
    };

    const scheduleUpdate = () => {
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        update();
      });
    };

    const onLayoutChange = () => {
      lastValue = -1;
      update();
    };

    update();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("meowdes:scroll", scheduleUpdate);
    window.addEventListener("resize", onLayoutChange);
    window.addEventListener("load", onLayoutChange);

    if (document.fonts?.ready) {
      document.fonts.ready.then(onLayoutChange).catch(() => {});
    }

    const footer = document.querySelector(FOOTER_SELECTOR);
    let onFooterZoneResize = null;

    if (footer && "IntersectionObserver" in window) {
      const attachFooterObserver = () => {
        footerObserver?.disconnect();

        const bottomMargin = Math.max(0, window.innerHeight - BOTTOM_BLUR_FADE_ZONE);
        footerObserver = new IntersectionObserver(scheduleUpdate, {
          root: null,
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: `0px 0px -${bottomMargin}px 0px`,
        });
        footerObserver.observe(footer);
      };

      attachFooterObserver();
      onFooterZoneResize = attachFooterObserver;
      window.addEventListener("resize", onFooterZoneResize);
    }

    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(onLayoutChange);
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("meowdes:scroll", scheduleUpdate);
      window.removeEventListener("resize", onLayoutChange);
      window.removeEventListener("load", onLayoutChange);
      if (onFooterZoneResize) {
        window.removeEventListener("resize", onFooterZoneResize);
      }
      resizeObserver?.disconnect();
      footerObserver?.disconnect();

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      if (watchdogId) {
        window.cancelAnimationFrame(watchdogId);
      }
    };
  }, [enabled, pathname]);

  if (!enabled) {
    return null;
  }

  return (
    <div ref={blurRef} aria-hidden className="viewport-bottom-blur">
      <div className="viewport-bottom-blur__layers">
        {BLUR_LAYERS.map((layerClass) => (
          <div key={layerClass} className={`blur-layer ${layerClass}`} />
        ))}
      </div>
    </div>
  );
}
