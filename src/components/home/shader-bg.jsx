"use client";

import { useEffect, useRef } from "react";

export default function ShaderBg({ preset, className }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let instance;
    let destroyed = false;
    let resizeObserver;

    const init = async () => {
      await new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });

      if (destroyed || !canvasRef.current || !containerRef.current) return;

      const { createShader } = await import("shaders/js");

      if (destroyed || !canvasRef.current) return;

      instance = await createShader(canvasRef.current, preset);

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

    return () => {
      destroyed = true;
      resizeObserver?.disconnect();
      instance?.destroy();
    };
  }, [preset]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas ref={canvasRef} className={className} />
    </div>
  );
}
