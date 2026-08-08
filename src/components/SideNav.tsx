import React, { useState } from 'react';
import { useLenis } from '@lenis/react';
import { soundFx } from '../utils/audioEffects';

interface NavSection {
  id: string;
  label: string;
  num: string;
  href: string;
  progressTarget: number;
}

const SECTIONS: NavSection[] = [
  { id: 'home', label: 'HOME', num: '01', href: '#home', progressTarget: 0.12 },
  { id: 'about', label: 'ABOUT', num: '02', href: '#about', progressTarget: 0.36 },
  { id: 'tech', label: 'SKILLS', num: '03', href: '#tech', progressTarget: 0.5 },
  { id: 'materials', label: 'PROJECTS', num: '04', href: '#materials', progressTarget: 0.64 },
  { id: 'experience', label: 'EXPERIENCE', num: '05', href: '#experience', progressTarget: 0.76 },
  { id: 'education', label: 'EDUCATION', num: '06', href: '#education', progressTarget: 0.86 },
  { id: 'contact', label: 'CONTACT', num: '07', href: '#contact', progressTarget: 0.94 },
];

export const SideNav: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const lenis = useLenis();

  // Track smooth scroll progress via Lenis
  useLenis(({ progress }) => {
    setScrollProgress(progress);
  });

  // Calculate current active section ID based on scroll progress threshold
  const getActiveSectionId = (progress: number): string => {
    if (progress < 0.24) return 'home';
    if (progress < 0.43) return 'about';
    if (progress < 0.57) return 'tech';
    if (progress < 0.7) return 'materials';
    if (progress < 0.81) return 'experience';
    if (progress < 0.9) return 'education';
    return 'contact';
  };

  const activeSectionId = getActiveSectionId(scrollProgress);
  const activeSection = SECTIONS.find((s) => s.id === activeSectionId) || SECTIONS[0];
  const displayedSection = SECTIONS.find((s) => s.id === hoveredSection) || activeSection;

  const handleSectionClick = (e: React.MouseEvent, section: NavSection) => {
    e.preventDefault();
    soundFx.playClick();
    const el = document.querySelector(section.href);
    if (el && lenis) {
      lenis.scrollTo(el as HTMLElement, {
        offset: -80,
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="side-nav-container" aria-label="Section Navigation">
      {/* Current / Hovered Active Section HUD Tag on Top */}
      <div className="side-nav-hud-badge">
        <span className="hud-badge-dot" />
        <span className="hud-badge-text">
          {displayedSection.num} // {displayedSection.label}
        </span>
      </div>

      <nav className="side-nav-rail">
        {/* Glowing Background Track Line */}
        <div className="side-nav-track">
          <div
            className="side-nav-track-fill"
            style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
          />
        </div>

        {/* Section Navigation Nodes */}
        {SECTIONS.map((section) => {
          const isActive = section.id === activeSectionId;

          return (
            <a
              key={section.id}
              href={section.href}
              className={`side-nav-item ${isActive ? 'active' : ''}`}
              onClick={(e) => handleSectionClick(e, section)}
              onMouseEnter={() => {
                setHoveredSection(section.id);
                soundFx.playHover();
              }}
              onMouseLeave={() => setHoveredSection(null)}
              aria-current={isActive ? 'true' : undefined}
              title={`${section.num} // ${section.label}`}
            >
              {/* Node Dot / Indicator */}
              <div className="side-nav-node">
                <span className="side-nav-dot" />
                <span className="side-nav-pulse" />
              </div>

              {/* Number Label */}
              <span className="side-nav-num">{section.num}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;
