import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <a href="#home" className="nav-logo">
          AYUSH<span className="accent">.NEGI</span>
        </a>

        <div className="nav-links">
          <a href="#home">01 // HOME</a>
          <a href="#about">02 // ABOUT</a>
          <a href="#tech">03 // SKILLS</a>
          <a href="#materials">04 // PROJECTS</a>
          <a href="#experience">05 // EXPERIENCE</a>
          <a href="#education">06 // EDUCATION</a>
          <a href="#contact">07 // CONTACT</a>
        </div>

        <button
          id="menu-toggle"
          className={mobileMenuOpen ? 'active' : ''}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div id="mobile-menu" className={mobileMenuOpen ? 'active' : ''}>
        <div className="mm-content">
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>01 // HOME</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>02 // ABOUT</a>
          <a href="#tech" onClick={() => setMobileMenuOpen(false)}>03 // SKILLS</a>
          <a href="#materials" onClick={() => setMobileMenuOpen(false)}>04 // PROJECTS</a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)}>05 // EXPERIENCE</a>
          <a href="#education" onClick={() => setMobileMenuOpen(false)}>06 // EDUCATION</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>07 // CONTACT</a>
        </div>
      </div>
    </>
  );
};
