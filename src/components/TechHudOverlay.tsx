import React, { useState, useEffect, useRef } from 'react';
import { useLenis } from '@lenis/react';
import { soundFx } from '../utils/audioEffects';

interface TechHudOverlayProps {
  currentAura: string;
  onSelectAura: (theme: string) => void;
  onOpenTerminal: () => void;
  onOpenLinuxArena: () => void;
  onOpenResume?: () => void;
}

export const TechHudOverlay: React.FC<TechHudOverlayProps> = ({
  currentAura,
  onSelectAura,
  onOpenTerminal,
  onOpenLinuxArena,
  onOpenResume,
}) => {
  // Real State Telemetry
  const [realFps, setRealFps] = useState<number>(60);
  const [heapMemoryMb, setHeapMemoryMb] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollYPx, setScrollYPx] = useState<number>(0);
  const [timeStr, setTimeStr] = useState<string>('');
  const [timezoneStr, setTimezoneStr] = useState<string>('');
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [effectiveConnType, setEffectiveConnType] = useState<string>('4G');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [copyNotification, setCopyNotification] = useState<boolean>(false);

  const lenis = useLenis();
  const frameCountRef = useRef<number>(0);
  const lastFpsTimeRef = useRef<number>(performance.now());

  // 1. Real FPS & Memory Performance Monitor using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const measurePerformance = () => {
      frameCountRef.current += 1;
      const now = performance.now();
      const delta = now - lastFpsTimeRef.current;

      if (delta >= 1000) {
        const calculatedFps = Math.round((frameCountRef.current * 1000) / delta);
        setRealFps(calculatedFps);
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;

        // Read real JS Heap memory if supported by browser (e.g., Chrome / Edge)
        const perf = window.performance as unknown as {
          memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
        };
        if (perf && perf.memory) {
          const usedMb = (perf.memory.usedJSHeapSize / (1024 * 1024)).toFixed(1);
          setHeapMemoryMb(`${usedMb} MB`);
        }
      }

      animationFrameId = requestAnimationFrame(measurePerformance);
    };

    animationFrameId = requestAnimationFrame(measurePerformance);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 2. Real Scroll Telemetry via Lenis
  useLenis(({ progress, scroll }) => {
    setScrollProgress(progress);
    setScrollYPx(Math.round(scroll));
  });

  // 3. Real System Clock & Timezone Offset
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);

      // Calculate real timezone offset string e.g. UTC+05:30
      const offsetMin = -now.getTimezoneOffset();
      const sign = offsetMin >= 0 ? '+' : '-';
      const hrs = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0');
      const mins = String(Math.abs(offsetMin) % 60).padStart(2, '0');
      setTimezoneStr(`UTC${sign}${hrs}:${mins}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 4. Real Network Status & Connection Quality
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      const nav = navigator as unknown as {
        connection?: { effectiveType?: string };
      };
      if (nav.connection && nav.connection.effectiveType) {
        setEffectiveConnType(nav.connection.effectiveType.toUpperCase());
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync Audio Mute status
  useEffect(() => {
    setIsAudioMuted(soundFx.getMuted());
  }, []);

  const handleToggleAudio = () => {
    const muted = soundFx.toggleMute();
    setIsAudioMuted(muted);
    if (!muted) soundFx.playClick();
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playClick();
    navigator.clipboard.writeText('naayush742@gmail.com');
    setCopyNotification(true);
    setTimeout(() => setCopyNotification(false), 2000);
  };

  const handleResetScroll = () => {
    soundFx.playClick();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate real 3D Depth coordinate (-0.0m to -380.0m based on Three.js trajectory curve depth)
  const zDepthMeters = (scrollProgress * 380).toFixed(1);

  const themes = [
    { id: 'azure', label: 'AZURE' },
    { id: 'green', label: 'MATRIX' },
    { id: 'red', label: 'PLASMA' },
    { id: 'orange', label: 'FLAME' },
    { id: 'purple', label: 'VOID' },
  ];

  return (
    <div className="tech-hud-layer" aria-label="Interactive HUD Diagnostics">
      {/* ─── SCREEN CORNER FRAME BRACKETS ─── */}
      <div className="hud-corner hud-corner-tl" />
      <div className="hud-corner hud-corner-tr" />
      <div className="hud-corner hud-corner-bl" />
      <div className="hud-corner hud-corner-br" />

      {/* ─── TOP HUD HEADER BAR (REAL DATA & CONTROLS) ─── */}
      <header className="top-hud-bar">
        {/* Top Left: Real Network & System Telemetry */}
        <div className="top-hud-left">
          <div className={`top-hud-badge ${isOnline ? 'online' : 'offline'}`}>
            <span className="hud-status-dot" />
            <span className="hud-label">NET:</span>
            <span className="hud-val">
              {isOnline ? `ONLINE (${effectiveConnType})` : 'OFFLINE'}
            </span>
          </div>

          <div className="top-hud-divider" />

          <div className="top-hud-time" title="System Local Clock & Timezone">
            <span className="hud-time-val">{timeStr}</span>
            <span className="hud-tz">({timezoneStr})</span>
          </div>
        </div>

        {/* Top Center: Real Quick Command Action Buttons */}
        <div className="top-hud-center">
          {onOpenResume && (
            <button
              className="hud-action-btn"
              onClick={() => {
                soundFx.playClick();
                onOpenResume();
              }}
              title="Open Interactive PDF Resume Viewer"
            >
              <span className="btn-icon">📄</span>
              <span>RESUME</span>
            </button>
          )}

          <button
            className="hud-action-btn"
            onClick={() => {
              soundFx.playClick();
              onOpenTerminal();
            }}
            title="Open Interactive CLI Terminal"
          >
            <span className="btn-icon">&gt;_</span>
            <span>TERMINAL</span>
          </button>

          <button
            className="hud-action-btn"
            onClick={() => {
              soundFx.playClick();
              onOpenLinuxArena();
            }}
            title="Launch Interactive Linux Lab Arena"
          >
            <span className="btn-icon">🐧</span>
            <span>LINUX ARENA</span>
          </button>

          <button
            className="hud-action-btn copy-btn"
            onClick={handleCopyEmail}
            title="Copy Email Address"
          >
            <span className="btn-icon">📋</span>
            <span>{copyNotification ? 'COPIED!' : 'COPY EMAIL'}</span>
          </button>
        </div>

        {/* Top Right: Real Render & FPS Performance Data */}
        <div className="top-hud-right">
          <div className="top-hud-stat" title="Real-time Measured FPS">
            <span className="hud-stat-key">FPS:</span>
            <span className={`hud-stat-val ${realFps >= 50 ? 'good' : 'warning'}`}>{realFps}</span>
          </div>

          {heapMemoryMb && (
            <>
              <div className="top-hud-divider" />
              <div className="top-hud-stat" title="Actual JS Heap Memory Usage">
                <span className="hud-stat-key">RAM:</span>
                <span className="hud-stat-val">{heapMemoryMb}</span>
              </div>
            </>
          )}

          <div className="top-hud-divider" />

          {/* Interactive Sound FX Toggle */}
          <button
            className={`hud-audio-toggle ${isAudioMuted ? 'muted' : 'active'}`}
            onClick={handleToggleAudio}
            title={isAudioMuted ? 'Unmute Web Audio FX' : 'Mute Web Audio FX'}
          >
            <span className="audio-icon">{isAudioMuted ? '🔇' : '🔊'}</span>
            <span>{isAudioMuted ? 'MUTED' : 'AUDIO ON'}</span>
          </button>
        </div>
      </header>

      {/* ─── LEFT HUD SIDE PANEL (REAL SPATIAL TELEMETRY & THEME CONTROLS) ─── */}
      <aside className="left-hud-rail">
        <div className="left-hud-header">
          <span className="lhud-icon">🧭</span>
          <span className="lhud-title">REAL_TELEMETRY</span>
        </div>

        {/* Real 3D Tunnel Spatial Position telemetry */}
        <div className="left-hud-box">
          <div className="hud-box-row">
            <span className="b-label">3D DEPTH:</span>
            <span className="b-val glow">-{zDepthMeters}m</span>
          </div>

          <div className="hud-box-row">
            <span className="b-label">SCROLL:</span>
            <span className="b-val">{scrollYPx}px</span>
          </div>

          <div className="hud-box-row">
            <span className="b-label">PROGRESS:</span>
            <span className="b-val">{(scrollProgress * 100).toFixed(0)}%</span>
          </div>

          {/* Real Reset Scroll Teleport Button */}
          {scrollProgress > 0.05 && (
            <button
              className="hud-teleport-btn"
              onClick={handleResetScroll}
              title="Teleport back to Top 0m"
            >
              ▲ TOP (0m)
            </button>
          )}
        </div>

        {/* Real Aura Visual Theme Selector */}
        <div className="left-hud-box theme-box">
          <span className="box-title">AURA_THEME</span>
          <div className="theme-pills">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-pill ${currentAura === t.id ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  onSelectAura(t.id);
                }}
                title={`Switch visual theme to ${t.label}`}
              >
                <span className={`pill-dot ${t.id}`} />
                <span className="pill-name">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default TechHudOverlay;
