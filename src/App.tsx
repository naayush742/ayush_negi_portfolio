import React, { useState, useEffect } from 'react';
import { ReactLenis, useLenis } from '@lenis/react';
import { CustomCursor } from './components/CustomCursor';
import { ResumeModal } from './components/ResumeModal';
import { ScrollProgress } from './components/ScrollProgress';
import { ParticleCanvas } from './components/ParticleCanvas';
import { ScrollTunnelCanvas } from './components/ScrollTunnelCanvas';
import { Ticker } from './components/Ticker';
import { SystemLog } from './components/SystemLog';
import { TerminalOverlay } from './components/TerminalOverlay';
import { Linux3DArenaModal } from './components/Linux3DArenaModal';
import { HotspotModal } from './components/HotspotModal';
import { SideNav } from './components/SideNav';
import { TechHudOverlay } from './components/TechHudOverlay';
import { smoothScrollToSection } from './utils/navigation';
import { soundFx } from './utils/audioEffects';

const LenisSmoothAnchorHandler: React.FC = () => {
  const lenis = useLenis();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const sectionKey = href.substring(1);
        smoothScrollToSection(sectionKey, lenis);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [lenis]);

  return null;
};

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
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  // 3D Gyroscopic Spatial Tilt Physics on Cards & Skill Badges
  useEffect(() => {
    const handleTiltMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const tiltable = target.closest(
        '.mat-card, .tc, .cloud-topology-card, .exp-card, .edu-card'
      ) as HTMLElement | null;

      if (!tiltable) return;
      if (
        tiltable.closest('.project-card-centered-overlay') ||
        tiltable.classList.contains('is-centered-zoomed-card')
      ) {
        return;
      }

      const rect = tiltable.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      tiltable.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
      tiltable.style.transition = 'transform 0.08s ease-out';
    };

    const handleTiltMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const tiltable = target.closest(
        '.mat-card, .tc, .cloud-topology-card, .exp-card, .edu-card'
      ) as HTMLElement | null;

      if (tiltable) {
        tiltable.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        tiltable.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      }
    };

    window.addEventListener('mousemove', handleTiltMouseMove);
    document.addEventListener('mouseout', handleTiltMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleTiltMouseMove);
      document.removeEventListener('mouseout', handleTiltMouseLeave);
    };
  }, []);

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
      if (!target) return;

      // 1. HUD / Navigation / Side Rail Controls
      if (
        target.closest('.side-nav-rail') ||
        target.closest('.side-nav-container') ||
        target.closest('.top-hud-bar') ||
        target.closest('.left-hud-rail')
      ) {
        soundFx.playHudClick();
        return;
      }

      // 2. Hero / Home Area
      if (target.closest('#home') || target.closest('.hero')) {
        soundFx.playHeroClick();
        return;
      }

      // 3. About Section
      if (target.closest('#about') || target.closest('.about-section')) {
        soundFx.playAboutClick();
        return;
      }

      // 4. Skills / Tech Matrix Section
      if (target.closest('#tech') || target.closest('.tech-section')) {
        soundFx.playSkillsClick();
        return;
      }

      // 5. Projects Section
      if (target.closest('#materials') || target.closest('.materials-section')) {
        soundFx.playProjectsClick();
        return;
      }

      // 6. Experience & Education Section
      if (
        target.closest('#experience') ||
        target.closest('.experience-section') ||
        target.closest('#education') ||
        target.closest('.education-section')
      ) {
        soundFx.playExperienceClick();
        return;
      }

      // 7. Contact Section
      if (target.closest('#contact') || target.closest('.contact-section')) {
        soundFx.playContactClick();
        return;
      }

      // 8. Generic fallback click anywhere else on canvas / page
      soundFx.playGenericClick();
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
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5,
      }}
    >
      <LenisSmoothAnchorHandler />
      <CustomCursor />
      <ScrollProgress />
      <TechHudOverlay
        currentAura={auraTheme}
        onSelectAura={(t) => setAuraTheme(t)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenLinuxArena={() => setIsLinuxArenaOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
      <SideNav />
      <ParticleCanvas />
      <ScrollTunnelCanvas />

      <Ticker />

      <main style={{ minHeight: '850vh', position: 'relative', pointerEvents: 'none' }}>
        <div id="home" style={{ position: 'absolute', top: '12%' }} />
        <div id="about" style={{ position: 'absolute', top: '36%' }} />
        <div id="tech" style={{ position: 'absolute', top: '50%' }} />
        <div id="materials" style={{ position: 'absolute', top: '64%' }} />
        <div id="experience" style={{ position: 'absolute', top: '76%' }} />
        <div id="education" style={{ position: 'absolute', top: '86%' }} />
        <div id="contact" style={{ position: 'absolute', top: '94%' }} />
      </main>

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

      <Linux3DArenaModal isOpen={isLinuxArenaOpen} onClose={() => setIsLinuxArenaOpen(false)} />

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      <HotspotModal slug={activeModalSlug} onClose={() => setActiveModalSlug(null)} />
    </ReactLenis>
  );
};

export default App;
