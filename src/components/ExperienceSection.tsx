import React from 'react';

export const ExperienceSection: React.FC = () => {
  return (
    <section className="impact-section section-z" id="experience">
      <div className="eyebrow reveal in" style={{ justifyContent: 'center' }}>
        Industry History
      </div>
      <h2 className="s-heading reveal in d1" style={{ textAlign: 'center' }}>
        Work <span className="hl">Experience</span>
      </h2>
      <p className="s-body reveal in d2" style={{ margin: '0 auto 40px', textAlign: 'center' }}>
        Professional roles combining full-stack web engineering, media production, and technical
        content strategy.
      </p>

      <div style={{ maxWidth: '920px', margin: '0 auto' }} className="reveal in d3">
        <div
          className="mat-card"
          style={
            {
              '--card-accent': 'var(--aura-color)',
            } as React.CSSProperties
          }
        >
          <div className="project-card-header">
            <div className="pc-title-wrap">
              <span className="pc-icon">💻</span>
              <div>
                <h3 className="pc-name" style={{ fontSize: '1.4rem' }}>
                  Web Developer, Videographer &amp; Content Writer
                </h3>
                <span className="pc-subtitle">Duraal Tech • Kotdwara, Uttarakhand, India</span>
              </div>
            </div>

            <span className="pc-badge green">MAY 2022 – JAN 2023</span>
          </div>

          <p className="pc-desc" style={{ fontSize: '1.05rem', margin: '10px 0' }}>
            Managed digital production workflows, built web application modules, and handled media
            creation for clients.
          </p>

          <div className="pc-highlights-box">
            <span className="pc-hl-label">CORE RESPONSIBILITIES &amp; DELIVERABLES</span>
            <ul className="pc-hl-list">
              <li>
                <strong style={{ color: 'var(--text)' }}>Web Application Engineering:</strong> Built
                responsive web interfaces, implemented UI/UX components, debugged front-end issues,
                and performed deployment maintenance.
              </li>
              <li>
                <strong style={{ color: 'var(--text)' }}>End-to-End Videography:</strong> Executed
                camera operations, studio lighting setup, multi-track audio capture, and
                post-production video editing for technical promo materials.
              </li>
              <li>
                <strong style={{ color: 'var(--text)' }}>Technical Content Strategy:</strong>{' '}
                Authored structured documentation and created technical articles, maintaining a
                consistent brand voice across web platforms.
              </li>
            </ul>
          </div>

          <div className="pc-tech-stack" style={{ marginTop: '12px' }}>
            <span className="pc-tech-pill">Web Development</span>
            <span className="pc-tech-pill">HTML5 / CSS3 / JS</span>
            <span className="pc-tech-pill">Videography &amp; Editing</span>
            <span className="pc-tech-pill">Technical Documentation</span>
            <span className="pc-tech-pill">Digital Media</span>
          </div>
        </div>
      </div>
    </section>
  );
};
