import React, { useEffect } from 'react';
import { soundFx } from '../utils/audioEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = '/Ayush Negi Resume.pdf';

  return (
    <div
      className="resume-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        background: 'rgba(2, 6, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        animation: 'fadeIn 0.25s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playHudClick();
          onClose();
        }
      }}
    >
      {/* Glass Container */}
      <div
        className="resume-modal-container"
        style={{
          width: '100%',
          maxWidth: '1050px',
          height: '88vh',
          background: 'rgba(4, 10, 22, 0.9)',
          border: '1px solid var(--border, rgba(0, 212, 255, 0.3))',
          borderRadius: '20px',
          boxShadow:
            '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px var(--aura-glow, rgba(0, 212, 255, 0.2))',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Top Header Bar */}
        <div
          className="resume-modal-header"
          style={{
            height: '54px',
            padding: '0 20px',
            background: 'rgba(6, 16, 32, 0.8)',
            borderBottom: '1px solid var(--border, rgba(0, 212, 255, 0.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono, monospace)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📄</span>
            <span
              style={{
                fontSize: '15px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                color: 'var(--aura-color, #00d4ff)',
              }}
            >
              AYUSH_NEGI_RESUME.PDF
            </span>
            <span
              style={{
                fontSize: '12px',
                padding: '2px 8px',
                borderRadius: '10px',
                background: 'rgba(0, 255, 136, 0.15)',
                border: '1px solid #00ff88',
                color: '#00ff88',
              }}
            >
              LIVE_PREVIEW
            </span>
          </div>

          {/* Quick Action Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={pdfUrl}
              download="Ayush_Negi_Resume.pdf"
              className="hud-action-btn"
              onClick={() => soundFx.playClick()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '14px',
                background: 'rgba(0, 255, 136, 0.12)',
                border: '1px solid #00ff88',
                color: '#00ff88',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span>📥</span> DOWNLOAD
            </a>

            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-action-btn"
              onClick={() => soundFx.playClick()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '14px',
                background: 'rgba(0, 212, 255, 0.12)',
                border: '1px solid var(--aura-color, #00d4ff)',
                color: 'var(--aura-color, #00d4ff)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <span>↗</span> NEW TAB
            </a>

            <button
              onClick={() => {
                soundFx.playHudClick();
                onClose();
              }}
              className="hud-action-btn"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 85, 85, 0.15)',
                border: '1px solid #ff5555',
                color: '#ff5555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* PDF Embedded Viewport Container */}
        <div style={{ flex: 1, width: '100%', background: '#0a121e', position: 'relative' }}>
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0`}
            title="Ayush Negi Resume"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
          />
        </div>
      </div>
    </div>
  );
};
