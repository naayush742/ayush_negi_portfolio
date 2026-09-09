import React, { useState, useEffect, useCallback } from 'react';
import { projectsData, Project } from '../data/projects';
import { soundFx } from '../utils/audioEffects';
import { trackProjectInteraction } from '../utils/analytics';

export const ProjectsSection: React.FC = () => {
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Synchronize modal state with smooth open and exit transitions
  useEffect(() => {
    if (focusedProjectId) {
      const proj = projectsData.find((p) => p.id === focusedProjectId);
      if (proj) {
        setActiveModalProject(proj);
        setIsClosing(false);
        trackProjectInteraction(proj.name, 'view_modal');
      }
    } else if (activeModalProject && !isClosing) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setActiveModalProject(null);
        setIsClosing(false);
      }, 350); // Matches CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [focusedProjectId]);

  const closeFocusView = useCallback(() => {
    soundFx.playHudClick();
    setIsClosing(true);
    setTimeout(() => {
      setFocusedProjectId(null);
      setActiveModalProject(null);
      setIsClosing(false);
    }, 350);
  }, []);

  const openProjectModal = (id: string) => {
    soundFx.playProjectsClick();
    setFocusedProjectId(id);
  };

  const handlePrevProject = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!activeModalProject) return;
      soundFx.playHudClick();
      const currentIndex = projectsData.findIndex((p) => p.id === activeModalProject.id);
      const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
      setFocusedProjectId(projectsData[prevIndex].id);
    },
    [activeModalProject]
  );

  const handleNextProject = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!activeModalProject) return;
      soundFx.playHudClick();
      const currentIndex = projectsData.findIndex((p) => p.id === activeModalProject.id);
      const nextIndex = (currentIndex + 1) % projectsData.length;
      setFocusedProjectId(projectsData[nextIndex].id);
    },
    [activeModalProject]
  );

  // Keyboard navigation for Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!focusedProjectId) return;

      if (e.key === 'Escape') {
        closeFocusView();
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projectsData.findIndex((p) => p.id === focusedProjectId);
        const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
        soundFx.playHudClick();
        setFocusedProjectId(projectsData[prevIndex].id);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projectsData.findIndex((p) => p.id === focusedProjectId);
        const nextIndex = (currentIndex + 1) % projectsData.length;
        soundFx.playHudClick();
        setFocusedProjectId(projectsData[nextIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedProjectId, closeFocusView]);

  const activeIndex = activeModalProject
    ? projectsData.findIndex((p) => p.id === activeModalProject.id)
    : -1;

  return (
    <section className="materials-section section-z" id="materials">
      <div className="mat-inner">
        <div className="reveal">
          <div className="eyebrow">PRODUCTION PORTFOLIO</div>
          <h2 className="s-heading">
            FEATURED <span className="hl">PROJECTS</span>
          </h2>
          <p className="s-body">
            High-availability cloud platforms, offline-first mobile synchronization apps, WebRTC
            media networks, and MANET mesh infrastructure engineered for production performance.
          </p>
        </div>

        {/* Compact & Streamlined Projects Grid */}
        <div className="mat-grid">
          {projectsData.map((p: Project) => (
            <div
              key={p.id}
              onClick={() => openProjectModal(p.id)}
              className="mat-card pc-summary-card reveal"
              style={
                {
                  '--card-accent': p.accentColor,
                  cursor: 'pointer',
                } as React.CSSProperties
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openProjectModal(p.id);
                }
              }}
              title={`Click to open full deep dive on ${p.name}`}
            >
              {/* Card Top Header */}
              <div className="project-card-header">
                <div className="pc-title-wrap">
                  <span className="pc-icon">{p.icon}</span>
                  <div>
                    <h3 className="pc-name">{p.name}</h3>
                    <span className="pc-subtitle">{p.subtitle}</span>
                  </div>
                </div>
                <span className={`pc-badge ${p.badgeClass}`}>{p.badgeText}</span>
              </div>

              {/* Reduced Short Synopsis */}
              <p className="pc-desc pc-summary-desc">{p.shortDescription || p.description}</p>

              {/* Compact Tech Badges Preview (Top 4) */}
              <div className="pc-tech-stack pc-summary-tech">
                {p.techStack.slice(0, 4).map((tech: string, idx: number) => (
                  <span key={idx} className="pc-tech-pill">
                    {tech}
                  </span>
                ))}
                {p.techStack.length > 4 && (
                  <span className="pc-tech-pill pc-tech-more">+{p.techStack.length - 4} more</span>
                )}
              </div>

              {/* Interactive Visual Cue / Expand Action */}
              <div className="pc-card-footer-action">
                <span className="pc-action-label">
                  VIEW FULL SPECS <span className="pc-action-arrow">↗</span>
                </span>
                <span className="pc-click-hint">[CLICK TO EXPAND]</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN DEAD-CENTER POP-OUT MODAL WITH SMOOTH TRANSITION */}
      {activeModalProject && (
        <div
          className={`project-card-centered-overlay ${isClosing ? 'is-closing-overlay' : 'is-active'}`}
          onClick={closeFocusView}
          data-lenis-prevent
        >
          <div
            className={`mat-card is-centered-zoomed-card ${isClosing ? 'is-closing-card' : 'is-active'}`}
            onClick={(e) => e.stopPropagation()}
            style={
              {
                '--card-accent': activeModalProject.accentColor,
              } as React.CSSProperties
            }
          >
            {/* Top HUD System Status & Navigation Bar */}
            <div className="pc-focus-header-bar">
              <div className="pc-focus-left-info">
                <span className="pc-pulse-dot" />
                <span className="pc-focus-tag">
                  SYS.PRJ // 0{activeModalProject.id} &bull; FULL SPECIFICATION
                </span>
              </div>

              {/* In-Modal Project Navigation Switcher */}
              <div className="pc-modal-nav-controls">
                <button
                  className="pc-modal-nav-btn"
                  onClick={handlePrevProject}
                  title="Previous project [Left Arrow]"
                >
                  ◄ PREV
                </button>
                <span className="pc-modal-counter">
                  {activeIndex + 1} / {projectsData.length}
                </span>
                <button
                  className="pc-modal-nav-btn"
                  onClick={handleNextProject}
                  title="Next project [Right Arrow]"
                >
                  NEXT ►
                </button>
              </div>

              <button
                className="pc-focus-close-btn"
                onClick={closeFocusView}
                title="Close modal [ESC]"
              >
                ✕ ESC
              </button>
            </div>

            {/* Modal Project Identity Header */}
            <div className="project-card-header pc-modal-header">
              <div className="pc-title-wrap">
                <div className="pc-modal-icon-wrap">
                  <span className="pc-icon pc-modal-icon">{activeModalProject.icon}</span>
                </div>
                <div>
                  <h3 className="pc-name pc-modal-name">{activeModalProject.name}</h3>
                  <span className="pc-subtitle pc-modal-subtitle">
                    {activeModalProject.subtitle}
                  </span>
                </div>
              </div>
              <span className={`pc-badge ${activeModalProject.badgeClass} pc-modal-badge`}>
                {activeModalProject.badgeText}
              </span>
            </div>

            {/* Architectural Fast Metrics Bar (if available) */}
            {activeModalProject.metrics && activeModalProject.metrics.length > 0 && (
              <div className="pc-metrics-grid">
                {activeModalProject.metrics.map((m, idx) => (
                  <div key={idx} className="pc-metric-chip">
                    <span className="pc-metric-label">{m.label}</span>
                    <span className="pc-metric-value">{m.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Full Comprehensive In-Depth Description */}
            <div className="pc-modal-desc-section">
              <span className="pc-section-subhead">// ARCHITECTURAL OVERVIEW:</span>
              <p className="pc-desc pc-modal-desc">{activeModalProject.description}</p>
            </div>

            {/* Full Technical Highlights Deep Dive */}
            <div className="pc-highlights-box pc-modal-highlights">
              <span className="pc-hl-label">// TECHNICAL HIGHLIGHTS &amp; ENGINEERING SPEC:</span>
              <ul className="pc-hl-list">
                {activeModalProject.highlights.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Complete Tech Stack */}
            <div className="pc-modal-tech-section">
              <span className="pc-section-subhead">// CORE STACK &amp; PROTOCOLS:</span>
              <div className="pc-tech-stack pc-modal-tech-stack">
                {activeModalProject.techStack.map((tech: string, idx: number) => (
                  <span key={idx} className="pc-tech-pill pc-modal-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Bottom Action Bar */}
            <div className="pc-modal-footer">
              {activeModalProject.link ? (
                <a
                  href={activeModalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary pc-btn pc-modal-launch-btn"
                  onClick={() => {
                    soundFx.playProjectsClick();
                    trackProjectInteraction(
                      activeModalProject.name,
                      'launch_live',
                      activeModalProject.link
                    );
                  }}
                >
                  {activeModalProject.linkText || 'LAUNCH LIVE APP ↗'}
                </a>
              ) : (
                <div className="pc-offline-notice">
                  <span className="pc-offline-indicator">●</span>{' '}
                  {activeModalProject.linkText || 'OFFLINE-FIRST DISTRIBUTED SYSTEM'}
                </div>
              )}
              <button className="pc-modal-dismiss-btn" onClick={closeFocusView}>
                CLOSE SPECS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
