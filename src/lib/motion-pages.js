export const MOTION_EXCLUDED_PREFIXES = ["/admin"];

export function isMotionExcludedPath(pathname) {
  if (!pathname) {
    return true;
  }

  return MOTION_EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function prefersCoarsePointer() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia("(pointer: coarse)").matches;
}

export function isBlurEnabledPath(pathname) {
  return !isMotionExcludedPath(pathname) && !prefersReducedMotion();
}

export function isSmoothScrollEnabledPath(pathname) {
  return isAnchorSmoothScrollEnabledPath(pathname) && !prefersCoarsePointer();
}

export function isAnchorSmoothScrollEnabledPath(pathname) {
  return !isMotionExcludedPath(pathname) && !prefersReducedMotion();
}

export function getMaxScroll() {
  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
  );

  return Math.max(0, scrollHeight - window.innerHeight);
}

/** Fade out bottom blur when footer enters the viewport (px). */
export const BOTTOM_BLUR_FADE_ZONE = 220;

const FOOTER_SELECTOR = "#contacts";

export function getBottomBlurOpacity() {
  if (typeof window === "undefined") {
    return 1;
  }

  const footer = document.querySelector(FOOTER_SELECTOR);
  if (!footer) {
    return 1;
  }

  const footerTop = footer.getBoundingClientRect().top;
  const viewportHeight = window.innerHeight;

  // Footer is still below the viewport — blur stays fully visible.
  if (footerTop >= viewportHeight) {
    return 1;
  }

  const overlap = viewportHeight - footerTop;

  if (overlap <= 0) {
    return 1;
  }

  if (overlap >= BOTTOM_BLUR_FADE_ZONE) {
    return 0;
  }

  return 1 - overlap / BOTTOM_BLUR_FADE_ZONE;
}
