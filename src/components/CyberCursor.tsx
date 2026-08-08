import React, { useEffect, useState, useRef } from 'react';
import { soundFx } from '../utils/audioEffects';

export const CyberCursor: React.FC = () => {
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockLabel, setLockLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const prevHoverRef = useRef<boolean>(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (desktop / laptop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      setPos({ x, y });
      setCoords({ x: Math.round(x), y: Math.round(y) });

      // Check if mouse is hovering over an interactive element
      const target = e.target as HTMLElement;
      if (!target) {
        setIsLocked(false);
        return;
      }

      const interactive = target.closest(
        'button, a, .mat-card, .tc, .fpill, .side-nav-rail button, .hud-action-btn, .hud-theme-pill, .cloud-topology-card'
      ) as HTMLElement | null;

      if (interactive) {
        if (!prevHoverRef.current) {
          soundFx.playHudClick();
        }
        prevHoverRef.current = true;
        setIsLocked(true);

        const text =
          interactive.getAttribute('aria-label') ||
          interactive.innerText.slice(0, 18).trim() ||
          'TARGET_LOCK';
        setLockLabel(text.toUpperCase());
      } else {
        prevHoverRef.current = false;
        setIsLocked(false);
        setLockLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      id="cyber-cursor-root"
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.05s ease-out',
      }}
    >
      {/* Outer Reticle Crosshair Ring */}
      <div
        className={`cyber-cursor-ring ${isLocked ? 'locked' : ''}`}
        style={{
          width: isLocked ? '48px' : '32px',
          height: isLocked ? '48px' : '32px',
          borderRadius: '50%',
          border: `1.5px dashed ${isLocked ? '#00ff88' : 'var(--aura-color, #00d4ff)'}`,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: isLocked
            ? '0 0 15px #00ff88, inset 0 0 10px #00ff88'
            : '0 0 10px var(--aura-glow, rgba(0, 212, 255, 0.4))',
          transition: 'all 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Reticle Crosshair Tick Lines */}
        <div className="cursor-tick tick-top" />
        <div className="cursor-tick tick-bottom" />
        <div className="cursor-tick tick-left" />
        <div className="cursor-tick tick-right" />
      </div>

      {/* Inner Target Center Laser Dot */}
      <div
        style={{
          width: isLocked ? '8px' : '5px',
          height: isLocked ? '8px' : '5px',
          borderRadius: '50%',
          background: isLocked ? '#00ff88' : 'var(--aura-color, #00d4ff)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 8px ${isLocked ? '#00ff88' : 'var(--aura-color, #00d4ff)'}`,
          transition: 'all 0.15s ease',
        }}
      />

      {/* Dynamic Telemetry Coordinates Readout Badge */}
      <div
        className="cursor-coords-badge"
        style={{
          position: 'absolute',
          top: '28px',
          left: '28px',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          letterSpacing: '1px',
          color: isLocked ? '#00ff88' : 'var(--aura-color, #00d4ff)',
          background: 'rgba(2, 6, 16, 0.85)',
          padding: '2px 6px',
          borderRadius: '4px',
          border: `1px solid ${isLocked ? '#00ff88' : 'rgba(0, 212, 255, 0.3)'}`,
          backdropFilter: 'blur(6px)',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
        {isLocked ? (
          <span>LOCK: {lockLabel}</span>
        ) : (
          <span>
            X:{coords.x} Y:{coords.y}
          </span>
        )}
      </div>
    </div>
  );
};
