"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "./contact-form";

const ANIMATION_MS = 300;

export default function ContactModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    if (open) {
      if (closeTimer.current) {
        clearTimeout(closeTimer.current);
        closeTimer.current = null;
      }
      setClosing(false);
      setMounted(true);
    } else if (mounted) {
      setClosing(true);
      closeTimer.current = setTimeout(() => {
        setMounted(false);
        setClosing(false);
      }, ANIMATION_MS);
    }
  }, [open, mounted]);

  useEffect(() => () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mounted, onClose]);

  if (!mounted) {
    return null;
  }

  const overlayAnimation = closing
    ? "modal-overlay-out 0.3s ease-out both"
    : "modal-overlay-in 0.3s ease-out both";
  const cardAnimation = closing
    ? "modal-card-out 0.3s cubic-bezier(0.16, 1, 0.3, 1) both"
    : "modal-card-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both";

  return (
    <div className="fixed inset-0 z-[90] flex items-stretch justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="Начнём работу?">
      <div
        aria-hidden
        onClick={onClose}
        className="modal-overlay-anim absolute inset-0 bg-black/64 backdrop-blur-[24px]"
        style={{ animation: overlayAnimation }}
      />

      <div
        className="modal-card-anim relative z-10 flex h-full w-full flex-col overflow-y-auto bg-[#1f1f1f] px-3 py-6 md:h-auto md:max-h-[90vh] md:w-auto md:max-w-[777px] md:rounded-[32px] md:px-8 md:py-8 md:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
        style={{ animation: cardAnimation }}
      >
        <button
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-3 top-6 flex size-12 items-center justify-center text-[#a5a5a5] transition-[color,transform] hover:text-[#fdfdfd] active:text-[#d4d4d4] active:scale-90 md:right-6 md:top-6"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="mx-auto w-full max-w-[713px]">
          <h2 className="mb-5 pr-10 text-[28px] font-semibold leading-[40px] text-[#fdfdfd] md:mb-8 md:pr-0 md:text-center md:text-[40px] md:leading-[48px]">
            Начнём работу?
          </h2>

          <ContactForm showHelper idPrefix="contact-modal" onSubmitted={onClose} />
        </div>
      </div>
    </div>
  );
}
