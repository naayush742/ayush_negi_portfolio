import React, { useState, useEffect } from 'react';
import { useLenis } from '@lenis/react';
import { smoothScrollToSection } from '../utils/navigation';
import { soundFx } from '../utils/audioEffects';
import { trackSectionView } from '../utils/analytics';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSectionId, setActiveSectionId] = useState<string>('home');

  const lenis = useLenis();

  // Track scroll position for navbar styling & active link indicator
  useLenis(({ progress, scroll }) => {
    setScrolled(scroll > 40);

    if (progress < 0.24) setActiveSectionId('home');
    else if (progress < 0.43) setActiveSectionId('about');
    else if (progress < 0.57) setActiveSectionId('tech');
    else if (progress < 0.7) setActiveSectionId('materials');
    else if (progress < 0.81) setActiveSectionId('experience');
    else if (progress < 0.9) setActiveSectionId('education');
    else setActiveSectionId('contact');
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionKey: string) => {
    e.preventDefault();
    soundFx.playHudClick();
    setMobileMenuOpen(false);
    trackSectionView(sectionKey);
    smoothScrollToSection(sectionKey, lenis);
  };

  const navItems = [
    { id: 'home', label: '01 // HOME', href: '#home' },
    { id: 'about', label: '02 // ABOUT', href: '#about' },
    { id: 'tech', label: '03 // SKILLS', href: '#tech' },
    { id: 'materials', label: '04 // PROJECTS', href: '#materials' },
    { id: 'experience', label: '05 // EXPERIENCE', href: '#experience' },
    { id: 'education', label: '06 // EDUCATION', href: '#education' },
    { id: 'contact', label: '07 // CONTACT', href: '#contact' },
  ];

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
          AYUSH<span className="accent">.NEGI</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSectionId === item.id ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          id="menu-toggle"
          className={mobileMenuOpen ? 'active' : ''}
          onClick={() => {
            soundFx.playHudClick();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div id="mobile-menu" className={mobileMenuOpen ? 'active' : ''}>
        <div className="mm-content">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={activeSectionId === item.id ? 'active' : ''}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
