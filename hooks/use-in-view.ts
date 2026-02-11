'use client';

import { useEffect, useState, type RefObject } from "react";

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}
