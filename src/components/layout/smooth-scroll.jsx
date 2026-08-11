"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BOTTOM_BLUR_FADE_ZONE,
  getMaxScroll,
  isAnchorSmoothScrollEnabledPath,
  isSmoothScrollEnabledPath,
} from "@/lib/motion-pages";

const LERP = 0.075;
const EDGE_LERP = 0.22;
const ANCHOR_LERP = 0.09;
const WHEEL_MULTIPLIER = 0.9;
const ANCHOR_OFFSET = 90;
const EDGE_EPSILON = 2;
const EDGE_SNAP_ZONE = 160;
const NATIVE_SCROLL_ZONE = 720;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function isNativeScrollTarget(node) {
  if (!(node instanceof Element)) {
    return false;
  }

  return Boolean(
    node.closest("[data-native-scroll]") ||
      node.closest("textarea, select, [contenteditable='true']"),
  );
}

function shouldUseNativeScroll(current) {
  const maxScroll = getMaxScroll();
  return current >= maxScroll - NATIVE_SCROLL_ZONE;
}

function getLerp(current, target, maxScroll, anchorNavigation) {
  const distanceToTarget = Math.abs(target - current);
  const distanceToBottom = maxScroll - current;
  const distanceToTop = current;

  if (anchorNavigation) {
    return ANCHOR_LERP;
  }

  if (
    distanceToTarget < EDGE_SNAP_ZONE ||
    distanceToBottom < EDGE_SNAP_ZONE ||
    distanceToTop < EDGE_SNAP_ZONE
  ) {
    return EDGE_LERP;
  }

  return LERP;
}

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const anchorSmoothEnabled = isAnchorSmoothScrollEnabledPath(pathname ?? "");
    const wheelSmoothEnabled = isSmoothScrollEnabledPath(pathname ?? "");

    if (!anchorSmoothEnabled && !wheelSmoothEnabled) {
      return;
    }

    if (wheelSmoothEnabled) {
      document.documentElement.setAttribute("data-smooth-scroll", "");
    }

    let current = window.scrollY;
    let target = window.scrollY;
    let rafId = 0;
    let anchorNavigation = false;

    const stopAnimation = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const syncToWindow = () => {
      current = target = window.scrollY;
    };

    const clampTarget = () => {
      const maxScroll = getMaxScroll();
      target = clamp(target, 0, maxScroll);

      if (!anchorNavigation && target >= maxScroll - EDGE_EPSILON) {
        target = maxScroll;
      }

      if (!anchorNavigation && target <= EDGE_EPSILON) {
        target = 0;
      }
    };

    const applyScroll = () => {
      window.scrollTo(0, current);
      window.dispatchEvent(new Event("meowdes:scroll"));
    };

    const allowNativeScroll = () => {
      stopAnimation();
      syncToWindow();
    };

    const scrollToElement = (element) => {
      anchorNavigation = true;
      syncToWindow();
      target = element.getBoundingClientRect().top + window.scrollY - ANCHOR_OFFSET;
      clampTarget();
      start();
    };

    const animate = () => {
      const maxScroll = getMaxScroll();

      if (!anchorNavigation && shouldUseNativeScroll(current)) {
        syncToWindow();
        stopAnimation();
        return;
      }

      const diff = target - current;

      if (Math.abs(diff) < 0.5) {
        current = target;
        applyScroll();
        rafId = 0;
        anchorNavigation = false;
        return;
      }

      if (!anchorNavigation && target >= maxScroll - EDGE_SNAP_ZONE && diff > 0) {
        current = target = maxScroll;
        applyScroll();
        rafId = 0;
        return;
      }

      if (!anchorNavigation && target <= EDGE_SNAP_ZONE && diff < 0) {
        current = target = 0;
        applyScroll();
        rafId = 0;
        return;
      }

      current += diff * getLerp(current, target, maxScroll, anchorNavigation);
      applyScroll();
      rafId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(animate);
      }
    };

    const onWheel = (event) => {
      if (!wheelSmoothEnabled || anchorNavigation) {
        return;
      }

      if (event.ctrlKey || isNativeScrollTarget(event.target)) {
        return;
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return;
      }

      const maxScroll = getMaxScroll();
      const distanceFromBottom = maxScroll - window.scrollY;
      const scrollingUp = event.deltaY < 0;

      if (scrollingUp && distanceFromBottom <= BOTTOM_BLUR_FADE_ZONE) {
        allowNativeScroll();
        return;
      }

      if (shouldUseNativeScroll(current) || shouldUseNativeScroll(window.scrollY)) {
        allowNativeScroll();
        return;
      }

      const atBottom = current >= maxScroll - EDGE_EPSILON && event.deltaY > 0;
      const atTop = current <= EDGE_EPSILON && event.deltaY < 0;

      if (atBottom || atTop) {
        stopAnimation();
        current = target = clamp(current, 0, maxScroll);
        return;
      }

      event.preventDefault();
      target += event.deltaY * WHEEL_MULTIPLIER;
      clampTarget();

      if (target >= maxScroll - EDGE_SNAP_ZONE) {
        current = target = maxScroll;
        applyScroll();
        stopAnimation();
        return;
      }

      start();
    };

    const onNativeScroll = () => {
      window.dispatchEvent(new Event("meowdes:scroll"));

      if (anchorNavigation) {
        return;
      }

      if (shouldUseNativeScroll(window.scrollY)) {
        allowNativeScroll();
        return;
      }

      if (rafId) {
        return;
      }

      syncToWindow();
    };

    const onClick = (event) => {
      if (!anchorSmoothEnabled) {
        return;
      }

      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor || isNativeScrollTarget(event.target)) {
        return;
      }

      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (!element) {
        return;
      }

      event.preventDefault();
      scrollToElement(element);
    };

    const onResize = () => {
      clampTarget();

      if (anchorNavigation) {
        return;
      }

      if (shouldUseNativeScroll(window.scrollY)) {
        stopAnimation();
        syncToWindow();
        return;
      }

      if (!rafId) {
        syncToWindow();
      }
    };

    if (wheelSmoothEnabled) {
      window.addEventListener("wheel", onWheel, { passive: false });
    }

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onClick);

    return () => {
      document.documentElement.removeAttribute("data-smooth-scroll");
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onClick);
      stopAnimation();
    };
  }, [pathname]);

  return null;
}
