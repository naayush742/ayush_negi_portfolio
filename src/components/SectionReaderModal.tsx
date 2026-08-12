import React, { useEffect } from 'react';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';

interface SectionReaderModalProps {
  sectionSlug: string | null;
  onClose: () => void;
}

export const SectionReaderModal: React.FC<SectionReaderModalProps> = ({ sectionSlug, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sectionSlug) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sectionSlug, onClose]);

  if (!sectionSlug || sectionSlug === 'home') return null;

  const sectionTitles: Record<string, string> = {
    about: '02 // ABOUT AYUSH NEGI',
    tech: '03 // SKILLS & TECH STACK',
    materials: '04 // FEATURED PROJECTS',
    experience: '05 // WORK EXPERIENCE',
    education: '06 // EDUCATION & CREDENTIALS',
    contact: '07 // INITIATE CONTACT',
  };

  const renderSection = () => {
    switch (sectionSlug) {
      case 'about':
        return <AboutSection />;
      case 'tech':
        return <SkillsSection />;
      case 'materials':
        return <ProjectsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'education':
        return <EducationSection />;
      case 'contact':
        return <ContactSection />;
      default:
        return null;
    }
  };

  return (
    <div
      className="section-reader-overlay active"
      data-lenis-prevent
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(2, 6, 16, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Sticky Header Bar */}
      <div
        className="section-reader-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(6, 14, 26, 0.95)',
          borderBottom: '1px solid var(--border2)',
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="s-reader-title"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.98rem',
            color: 'var(--green)',
            letterSpacing: '1.5px',
            fontWeight: 600,
          }}
        >
          {sectionTitles[sectionSlug] || 'SECTION READER'}
        </div>

        <button
          onClick={onClose}
          className="s-reader-close-btn"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            color: 'var(--cyan)',
            background: 'rgba(0, 212, 255, 0.12)',
            border: '1px solid var(--cyan)',
            padding: '8px 18px',
            borderRadius: '20px',
            cursor: 'pointer',
            letterSpacing: '1px',
            transition: 'all 0.25s ease',
          }}
        >
          ✕ RETURN TO 3D TUNNEL [ESC]
        </button>
      </div>

      {/* Main Section Content Area */}
      <div
        className="section-reader-body"
        style={{
          padding: '40px 24px 80px',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {renderSection()}
      </div>
    </div>
  );
};

export default SectionReaderModal;
