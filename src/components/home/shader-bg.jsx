"use client";

import { useEffect, useRef } from "react";

export default function ShaderBg({ preset, className }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);
  const visibleRef = useRef(false);
  const scrollingRef = useRef(false);

  useEffect(() => {
    let instance;
    let destroyed = false;
    let resizeObserver;
    let scrollTimer = 0;
    let intersectionObserver;

    const syncPlayback = () => {
      if (!instanceRef.current || destroyed) {
        return;
      }

      if (visibleRef.current && !scrollingRef.current) {
        instanceRef.current.resume();
      } else {
        instanceRef.current.pause();
      }
    };

    const init = async () => {
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

      if (destroyed || !canvasRef.current || !containerRef.current) return;

      const { createShader } = await import("shaders/js");

      if (destroyed || !canvasRef.current) return;

      instance = await createShader(canvasRef.current, preset);
      instanceRef.current = instance;
      syncPlayback();

      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || !instance) return;

        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          instance.resize(width, height);
        }
      });
      resizeObserver.observe(containerRef.current);
    };

    init().catch((error) => {
      console.error("[ShaderBg] Failed to initialize shader:", error);
    });

    if ("IntersectionObserver" in window && containerRef.current) {
      intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          visibleRef.current = entry.isIntersecting;
          syncPlayback();
        },
        { rootMargin: "120px 0px", threshold: 0 },
      );
      intersectionObserver.observe(containerRef.current);
    } else {
      visibleRef.current = true;
    }

    const onScroll = () => {
      scrollingRef.current = true;
      syncPlayback();

      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        scrollingRef.current = false;
        syncPlayback();
      }, 120);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      destroyed = true;
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollTimer);
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [preset]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasRef} className={className} />
    </div>
  );
}
