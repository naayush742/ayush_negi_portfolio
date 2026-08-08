import React from 'react';
import { projectsData, Project } from '../data/projects';

export const ProjectsSection: React.FC = () => {
  return (
    <section className="materials-section section-z" id="materials">
      <div className="mat-inner">
        <div className="reveal">
          <div className="eyebrow">PRODUCTION PORTFOLIO</div>
          <h2 className="s-heading">
            FEATURED <span className="hl">PROJECTS</span>
          </h2>
          <p className="s-body">
            High-availability cloud platforms, offline-first mobile synchronization apps, WebRTC media networks, and MANET mesh infrastructure engineered for production performance.
          </p>
        </div>

        <div className="mat-grid">
          {projectsData.map((p: Project) => (
            <div
              key={p.id}
              className="mat-card reveal"
              style={
                {
                  '--card-accent': p.accentColor,
                } as React.CSSProperties
              }
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
                  >
                    {p.linkText || 'LAUNCH APP ↗'}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
