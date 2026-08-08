import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticleCanvas } from './components/ParticleCanvas';
import { BootOverlay } from './components/BootOverlay';
import { Navbar } from './components/Navbar';
import { Ticker } from './components/Ticker';
import { Hero } from './components/Hero';
import { StatsBar } from './components/StatsBar';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuraControl } from './components/AuraControl';
import { SystemLog } from './components/SystemLog';
import { TerminalOverlay } from './components/TerminalOverlay';
import { Linux3DArenaModal } from './components/Linux3DArenaModal';
import { soundFx } from './utils/audioEffects';

export const App: React.FC = () => {
  const [auraTheme, setAuraTheme] = useState<string>(() => {
    return sessionStorage.getItem('uscs-aura-theme') || 'purple';
  });
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [crtActive, setCrtActive] = useState<boolean>(true);
  const [bitTrailActive, setBitTrailActive] = useState<boolean>(true);

  const [activeModalSlug, setActiveModalSlug] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isLinuxArenaOpen, setIsLinuxArenaOpen] = useState<boolean>(false);

  // Global High-Tech Sound FX for Hovers & Clicks across whole site
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('tc') ||
          target.classList.contains('mat-card') ||
          target.classList.contains('fpill'))
      ) {
        soundFx.playHover();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('tc') ||
          target.classList.contains('mat-card') ||
          target.classList.contains('fpill'))
      ) {
        soundFx.playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Intersection Observer for scroll reveal animations
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.15,
    });

    const elements = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Apply aura theme colors across the entire website dynamically
  useEffect(() => {
    const root = document.documentElement;
    const themeColors: Record<
      string,
      { color: string; secondary: string; glow: string; darkGlow: string }
    > = {
      azure: {
        color: '#00d4ff',
        secondary: '#00ff88',
        glow: 'rgba(0, 212, 255, 0.4)',
        darkGlow: 'rgba(0, 212, 255, 0.15)',
      },
      green: {
        color: '#00ff88',
        secondary: '#00d4ff',
        glow: 'rgba(0, 255, 136, 0.4)',
        darkGlow: 'rgba(0, 255, 136, 0.15)',
      },
      red: {
        color: '#ff3131',
        secondary: '#ff6b2b',
        glow: 'rgba(255, 49, 49, 0.4)',
        darkGlow: 'rgba(255, 49, 49, 0.15)',
      },
      orange: {
        color: '#ff6b2b',
        secondary: '#ffb84d',
        glow: 'rgba(255, 107, 43, 0.4)',
        darkGlow: 'rgba(255, 107, 43, 0.15)',
      },
      purple: {
        color: '#9b59ff',
        secondary: '#ff4d9b',
        glow: 'rgba(155, 89, 255, 0.4)',
        darkGlow: 'rgba(155, 89, 255, 0.15)',
      },
    };

    const sel = themeColors[auraTheme] || themeColors.purple;
    root.style.setProperty('--aura-color', sel.color);
    root.style.setProperty('--aura-glow', sel.glow);
    root.style.setProperty('--green', sel.color);
    root.style.setProperty('--cyan', sel.secondary);
    root.style.setProperty('--border2', sel.darkGlow);
    sessionStorage.setItem('uscs-aura-theme', auraTheme);
  }, [auraTheme]);

  // Toggle Glitch Mode
  useEffect(() => {
    if (glitchActive) {
      document.body.classList.add('glitch-active');
    } else {
      document.body.classList.remove('glitch-active');
    }
  }, [glitchActive]);

  // Toggle CRT Filter
  useEffect(() => {
    if (!crtActive) {
      document.body.classList.add('crt-off');
    } else {
      document.body.classList.remove('crt-off');
    }
  }, [crtActive]);

  // Bit Trail Effect on mouse move
  useEffect(() => {
    if (!bitTrailActive) return;

    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 100) return;
      lastTime = now;

      const particle = document.createElement('div');
      particle.className = 'bit-particle';
      particle.textContent = Math.random() > 0.5 ? '1' : '0';
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [bitTrailActive]);

  return (
    <>
      <BootOverlay />
      <CustomCursor />
      <ScrollProgress />
      <ParticleCanvas />

      <Navbar />
      <Ticker />

      <main>
        <Hero />
        <StatsBar />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />

      <AuraControl
        currentAura={auraTheme}
        onSelectAura={(t) => setAuraTheme(t)}
        glitchActive={glitchActive}
        onToggleGlitch={() => setGlitchActive(!glitchActive)}
        crtActive={crtActive}
        onToggleCrt={() => setCrtActive(!crtActive)}
        bitTrailActive={bitTrailActive}
        onToggleBitTrail={() => setBitTrailActive(!bitTrailActive)}
      />

      <SystemLog />

      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenModal={(slug) => setActiveModalSlug(slug)}
        onSetAura={(t) => setAuraTheme(t)}
        onOpenLinuxArena={() => {
          setIsTerminalOpen(false);
          setIsLinuxArenaOpen(true);
        }}
      />

      {/* FLOATING CLI TERMINAL BUTTON */}
      <button
        className="cli-trigger"
        id="cli-open"
        title="Open System Terminal (CLI)"
        onClick={() => setIsTerminalOpen(!isTerminalOpen)}
      >
        <span className="cli-trigger-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </span>
      </button>

      <Linux3DArenaModal
        isOpen={isLinuxArenaOpen}
        onClose={() => setIsLinuxArenaOpen(false)}
      />
    </>
  );
};

export default App;
