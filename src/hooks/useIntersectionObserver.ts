import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Returns a ref to attach to a DOM element, and a boolean `isVisible`
 * which becomes true once the element enters the viewport.
 */
export function useIntersectionObserver<T extends HTMLElement>(
  options: Options = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.disconnect();
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}
