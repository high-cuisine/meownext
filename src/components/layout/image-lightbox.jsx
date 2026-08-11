"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ANIMATION_MS = 300;
const MIN_SIZE = 200;

// Картинка кликабельна, если она контентная: лежит в main, не обёрнута в ссылку
// или кнопку, не помечена как декоративная и достаточно крупная (иконки отсекаем).
// `data-lightbox` включает принудительно, `data-no-lightbox` — выключает.
function isEligible(img) {
  if (img.dataset.lightbox !== undefined) {
    return true;
  }
  if (!img.closest("main")) {
    return false;
  }
  if (img.closest('a, button, [role="button"], [data-no-lightbox]')) {
    return false;
  }
  if (img.getAttribute("aria-hidden") === "true") {
    return false;
  }
  const { width, height } = img.getBoundingClientRect();
  return width >= MIN_SIZE && height >= MIN_SIZE;
}

// Браузер вправе переиспользовать уже закэшированный мелкий кандидат из srcset,
// поэтому для полноэкранного просмотра выбираем нужное разрешение сами.
function bestSource(img) {
  const candidates = (img.srcset || "")
    .split(",")
    .map((part) => part.trim().split(/\s+/))
    .map(([url, descriptor]) => ({ url, width: Number.parseInt(descriptor, 10) }))
    .filter((candidate) => candidate.url && candidate.width > 0)
    .sort((a, b) => a.width - b.width);

  if (!candidates.length) {
    return img.currentSrc || img.src;
  }

  const target = window.innerWidth * (window.devicePixelRatio || 1);
  const match = candidates.find((candidate) => candidate.width >= target);
  return (match ?? candidates[candidates.length - 1]).url;
}

export default function ImageLightbox() {
  const [source, setSource] = useState(null);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const close = useCallback(() => {
    clearCloseTimer();
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setSource(null);
      setClosing(false);
      closeTimer.current = null;
    }, ANIMATION_MS);
  }, []);

  useEffect(() => clearCloseTimer, []);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const img = event.target instanceof Element ? event.target.closest("img") : null;
      if (!img || !isEligible(img)) {
        return;
      }
      event.preventDefault();
      clearCloseTimer();
      setClosing(false);
      setSource({ src: bestSource(img), alt: img.alt || "" });
    };

    // Курсор-лупу вешаем при наведении, чтобы правило совпадало с обработчиком
    // клика и переживало клиентскую навигацию без пересканирования DOM.
    const handlePointerOver = (event) => {
      const img = event.target instanceof Element ? event.target.closest("img") : null;
      if (img && isEligible(img)) {
        img.style.cursor = "zoom-in";
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("pointerover", handlePointerOver);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("pointerover", handlePointerOver);
    };
  }, []);

  useEffect(() => {
    if (!source) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [source, close]);

  if (!source) {
    return null;
  }

  const overlayAnimation = closing
    ? "modal-overlay-out 0.3s ease-out both"
    : "modal-overlay-in 0.3s ease-out both";
  const imageAnimation = closing
    ? "modal-card-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
    : "modal-card-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both";

  return (
    <div
      className="fixed inset-0 z-[95] flex items-center justify-center p-3 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={source.alt || "Просмотр изображения"}
    >
      <div
        aria-hidden
        onClick={close}
        className="modal-overlay-anim absolute inset-0 bg-black/90 backdrop-blur-[24px]"
        style={{ animation: overlayAnimation }}
      />

      {/* next/image здесь не подходит: URL берётся из srcset уже отрендеренной
          картинки в рантайме и повторная оптимизация не нужна. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={source.src}
        alt={source.alt}
        className="modal-card-anim relative z-10 max-h-full max-w-full object-contain"
        style={{ animation: imageAnimation }}
      />

      <button
        type="button"
        aria-label="Закрыть"
        onClick={close}
        className="absolute right-3 top-3 z-20 flex size-12 items-center justify-center text-[#a5a5a5] transition-[color,transform] hover:text-[#fdfdfd] active:scale-90 active:text-[#d4d4d4] md:right-6 md:top-6"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
