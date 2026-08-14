// Precise Section Targets mapped to the 3D Scroll Tunnel Stations
export const SECTION_TARGETS: Record<string, number> = {
  home: 0.12,
  hero: 0.12,
  top: 0.12,
  stats: 0.24,
  about: 0.36,
  tech: 0.5,
  skills: 0.5,
  materials: 0.64,
  projects: 0.64,
  portfolio: 0.64,
  experience: 0.76,
  education: 0.86,
  contact: 0.94,
};

/**
 * Calculates the exact scroll Y coordinate in pixels matching the 3D focal station.
 */
export const getTargetScrollPosition = (sectionKey: string): number => {
  const cleanKey = sectionKey.replace(/^#/, '').toLowerCase().trim();
  const targetProgress = SECTION_TARGETS[cleanKey];

  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

  if (targetProgress !== undefined) {
    return targetProgress * maxScroll;
  }

  // Fallback to DOM element offset if not in preset map
  const el = document.querySelector(sectionKey.startsWith('#') ? sectionKey : `#${sectionKey}`);
  if (el) {
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  }

  return 0;
};

/**
 * Smoothly navigates the viewport to any section via Lenis with custom easing.
 */
export const smoothScrollToSection = (
  sectionKey: string,
  lenisInstance?: { scrollTo: (target: number | HTMLElement, options?: any) => void } | null,
  onComplete?: () => void
) => {
  const targetY = getTargetScrollPosition(sectionKey);

  if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
    lenisInstance.scrollTo(targetY, {
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      onComplete,
    });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
    if (onComplete) setTimeout(onComplete, 1200);
  }
};
