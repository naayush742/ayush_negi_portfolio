import React, { useState, useEffect } from 'react';
import { projectsData, Project } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  // Handle smooth opening and exit closing transitions
  useEffect(() => {
    if (focusedProjectId) {
      const proj = projectsData.find((p) => p.id === focusedProjectId);
      if (proj) {
        setActiveModalProject(proj);
        setIsClosing(false);
      }
    } else if (activeModalProject) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setActiveModalProject(null);
        setIsClosing(false);
      }, 650); // Match 0.65s CSS exit animation
      return () => clearTimeout(timer);
    }
  }, [focusedProjectId, activeModalProject]);

  // Listen for Escape key to exit project card focus mode smoothly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusedProjectId) {
        setFocusedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedProjectId]);

  const closeFocusView = () => {
    setFocusedProjectId(null);
  };

  return (
    <section
      className="materials-section section-z"
      id="materials"
      onClick={() => {
        if (focusedProjectId) closeFocusView();
      }}
    >
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

        {/* Standard Projects Grid */}
        <div className="mat-grid">
          {projectsData.map((p: Project) => (
            <div
              key={p.id}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedProjectId(p.id);
              }}
              className="mat-card reveal"
              style={
                {
                  '--card-accent': p.accentColor,
                  cursor: 'pointer',
                } as React.CSSProperties
              }
              title="Click card to view centered zoomed details"
            >
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

              <p className="pc-desc">{p.description}</p>

              <div className="pc-highlights-box">
                <span className="pc-hl-label">// TECHNICAL HIGHLIGHTS:</span>
                <ul className="pc-hl-list">
                  {p.highlights.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pc-tech-stack">
                {p.techStack.map((tech: string, idx: number) => (
                  <span key={idx} className="pc-tech-pill">
                    {tech}
                  </span>
                ))}
              </div>

              {p.link && (
                <div className="pc-footer">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary pc-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.linkText || 'LAUNCH APP ↗'}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN DEAD-CENTER SLIGHTLY ZOOMED-IN PROJECT FOCUS OVERLAY WITH SMOOTH EXIT */}
      {activeModalProject && (
        <div
          className={`project-card-centered-overlay ${isClosing ? 'is-closing-overlay' : ''}`}
          onClick={closeFocusView}
          data-lenis-prevent
        >
          <div
            className={`mat-card is-centered-zoomed-card ${isClosing ? 'is-closing-card' : ''}`}
            onClick={(e) => e.stopPropagation()}
            style={
              {
                '--card-accent': activeModalProject.accentColor,
              } as React.CSSProperties
            }
          >
            <div className="pc-focus-header-bar">
              <span className="pc-focus-tag">✦ CENTERED & ZOOMED PROJECT FOCUS</span>
              <button className="pc-focus-close-btn" onClick={closeFocusView}>
                ✕ RETURN TO TUNNEL [ESC]
              </button>
            </div>

            <div className="project-card-header">
              <div className="pc-title-wrap">
                <span className="pc-icon">{activeModalProject.icon}</span>
                <div>
                  <h3 className="pc-name">{activeModalProject.name}</h3>
                  <span className="pc-subtitle">{activeModalProject.subtitle}</span>
                </div>
              </div>
              <span className={`pc-badge ${activeModalProject.badgeClass}`}>
                {activeModalProject.badgeText}
              </span>
            </div>

            <p className="pc-desc">{activeModalProject.description}</p>

            <div className="pc-highlights-box">
              <span className="pc-hl-label">// TECHNICAL HIGHLIGHTS:</span>
              <ul className="pc-hl-list">
                {activeModalProject.highlights.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pc-tech-stack">
              {activeModalProject.techStack.map((tech: string, idx: number) => (
                <span key={idx} className="pc-tech-pill">
                  {tech}
                </span>
              ))}
            </div>

            {activeModalProject.link && (
              <div className="pc-footer">
                <a
                  href={activeModalProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary pc-btn"
                >
                  {activeModalProject.linkText || 'LAUNCH APP ↗'}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
