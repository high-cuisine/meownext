"use client";

import { useEffect, useRef, useState } from "react";

export default function TypewriterText({
  text,
  className = "",
  startDelay = 300,
  charDelay = 65,
}) {
  const textRef = useRef(null);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const textEl = textRef.current;
    if (!textEl) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      textEl.textContent = text;
      setShowCursor(false);
      return;
    }

    textEl.textContent = "";
    setShowCursor(true);

    let index = 0;
    let startTimeout;
    let charTimeout;

    const typeNext = () => {
      index += 1;
      textEl.textContent = text.slice(0, index);

      if (index < text.length) {
        charTimeout = setTimeout(typeNext, charDelay);
      } else {
        setShowCursor(false);
      }
    };

    startTimeout = setTimeout(() => {
      if (text.length === 0) {
        setShowCursor(false);
        return;
      }

      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(charTimeout);
    };
  }, [text, startDelay, charDelay]);

  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label={text}>
      <span ref={textRef} aria-hidden="true" />
      {showCursor && (
        <span
          aria-hidden
          className="typewriter-cursor ml-0.5 inline-block w-[3px] shrink-0 align-middle md:w-1"
          style={{ height: "0.75em" }}
        />
      )}
    </span>
  );
}
