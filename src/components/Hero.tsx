import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="hero section-z" id="home">
      <div className="hero-orb o1"></div>
      <div className="hero-orb o2"></div>
      <div className="hero-orb o3"></div>
      <div className="hero-grid"></div>

      <div className="hero-content reveal">
        <div className="hero-eyebrow">
          <span className="pulse"></span>
          <span>MCA STUDENT // CLOUD &amp; DEVOPS ENTHUSIAST</span>
        </div>

        <div className="hero-hud-wrap">
          <div className="hero-hud-orbit"></div>
          <h1 className="hero-title" style={{ position: 'relative', zIndex: 1 }}>
            <span className="t1">AYUSH NEGI</span>
            <span className="t2">LEARNING &amp; EXPLORING MODERN CLOUD TECH</span>
          </h1>
        </div>

        <p className="hero-sub s-body">
          Computer Science student pursuing Master of Computer Applications (MCA), passionate about building serverless cloud systems, offline-first mobile sync apps, and real-time WebRTC media networks.
        </p>

        <div className="hero-orbit-badges">
          <div className="orbit-badge">
            <span className="ob-dot"></span>
            <span>CLOUD &amp; DEVOPS</span>
          </div>
          <div className="orbit-badge">
            <span className="ob-dot" style={{ background: 'var(--cyan)' }}></span>
            <span>OFFLINE-FIRST MOBILE</span>
          </div>
          <div className="orbit-badge">
            <span className="ob-dot" style={{ background: '#9b59ff' }}></span>
            <span>WEBRTC MEDIA MESH</span>
          </div>
        </div>

        <div className="hero-btns" style={{ marginTop: '28px' }}>
          <a href="#materials" className="btn-primary">
            EXPLORE PROJECTS ↗
          </a>
          <a href="#contact" className="btn-secondary">
            INITIATE CONTACT
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <span>SCROLL DOWN</span>
        <div className="sh-line"></div>
      </div>
    </section>
  );
};
