import { useState, useEffect, useCallback } from 'react';

/**
 * Tracks which section is currently in view by observing scroll position.
 * Returns the id of the currently active section.
 */
export function useScrollSpy(sectionIds: string[], offset = 80): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY + offset + 1;

    let currentId = sectionIds[0] ?? '';

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) {
        currentId = id;
      }
    }

    setActiveId(currentId);
  }, [sectionIds, offset]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return activeId;
}
