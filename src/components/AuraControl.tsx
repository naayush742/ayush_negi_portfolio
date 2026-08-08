import React, { useState, useEffect } from 'react';

interface AuraControlProps {
  currentAura: string;
  onSelectAura: (theme: string) => void;
  glitchActive: boolean;
  onToggleGlitch: () => void;
  crtActive: boolean;
  onToggleCrt: () => void;
  bitTrailActive: boolean;
  onToggleBitTrail: () => void;
}

export const AuraControl: React.FC<AuraControlProps> = ({
  currentAura,
  onSelectAura,
  glitchActive,
  onToggleGlitch,
  crtActive,
  onToggleCrt,
  bitTrailActive,
  onToggleBitTrail,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const auraThemes = [
    { id: 'azure', label: 'AZURE' },
    { id: 'green', label: 'MATRIX' },
    { id: 'red', label: 'PLASMA' },
    { id: 'orange', label: 'FLAME' },
    { id: 'purple', label: 'VOID' },
  ];

  return (
    <div className={`aura-ctrl ${isOpen ? 'open' : ''}`}>
      <div className="aura-panel">
        <div className="ap-header">
          <div className="ap-dots">
            <span />
            <span />
            <span />
          </div>
          <span className="ap-title">AURA_CALIBRATION</span>
        </div>

        <div className="ap-grid">
          {auraThemes.map((theme) => (
            <button
              key={theme.id}
              className={`aura-btn ${currentAura === theme.id ? 'active' : ''}`}
              data-aura={theme.id}
              onClick={() => onSelectAura(theme.id)}
            >
              <span className="ab-box" />
              <span className="ab-label">{theme.label}</span>
            </button>
          ))}
        </div>

        <div className="ap-header" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="ap-title">SYSTEM_MODS</span>
        </div>

        <div className="ap-grid">
          <button
            className={`aura-btn ${glitchActive ? 'active' : ''}`}
            onClick={onToggleGlitch}
          >
            <span className="ab-box" style={{ background: 'var(--text2)', borderRadius: '2px' }} />
            <span className="ab-label">GLITCH_MODE</span>
          </button>

          <button
            className={`aura-btn ${crtActive ? 'active' : ''}`}
            onClick={onToggleCrt}
          >
            <span className="ab-box" style={{ background: 'var(--text2)', borderRadius: '2px' }} />
            <span className="ab-label">CRT_FILTER</span>
          </button>

          <button
            className={`aura-btn ${bitTrailActive ? 'active' : ''}`}
            onClick={onToggleBitTrail}
          >
            <span className="ab-box" style={{ background: 'var(--text2)', borderRadius: '2px' }} />
            <span className="ab-label">BIT_TRAIL</span>
          </button>
        </div>

        <div className="ap-footer">
          <span className="ap-code">SYNC_ACTIVE</span>
        </div>
      </div>

      <button
        className="aura-trigger"
        title="Personalize Aura Theme"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="aura-trigger-icon">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a7 7 0 1 0 10 7" fill="var(--aura-color, #00d4ff)" opacity="0.35" />
            <circle cx="12" cy="12" r="4" fill="var(--aura-color, #00d4ff)" />
          </svg>
        </span>
      </button>
    </div>
  );
};
