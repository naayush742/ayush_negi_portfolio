import React, { useState, useEffect, useRef } from 'react';

interface TerminalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: (slug: string) => void;
  onSetAura: (theme: string) => void;
  onOpenLinuxArena?: () => void;
}

interface CommandOutput {
  cmd?: string;
  res?: string;
  type?: 'cmd' | 'res' | 'error';
}

export const TerminalOverlay: React.FC<TerminalOverlayProps> = ({
  isOpen,
  onClose,
  onOpenModal,
  onSetAura,
  onOpenLinuxArena,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    { res: "AYUSH_NEGI_OS v3.0.0 — System initialized. Type 'help', 'whoami', or 'linux' to launch Linux Terminal Lab." },
  ]);

  const [currentTime, setCurrentTime] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: CommandOutput[] = [...history, { cmd: inputVal, type: 'cmd' }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          res: `Available commands:
  whoami    - Display student profile summary
  skills    - List core technical competencies & launch modal
  projects  - Inspect production portfolio applications
  linux     - Launch Linux Terminal Lab 🐧
  reboot    - Restart system boot initialization sequence ⚡
  contact   - Display direct email & phone channels
  theme     - Switch aura theme (azure, green, red, orange, purple)
  clear     - Clear terminal screen
  date      - Print current system date & time
  exit      - Close terminal interface`,
          type: 'res',
        });
        break;

      case 'reboot':
      case 'boot':
      case 'restart':
        sessionStorage.removeItem('uscs-booted');
        window.location.reload();
        return;

      case 'linux':
      case 'game':
      case 'play':
      case 'learn':
      case 'academy':
        newHistory.push({
          res: `Launching Linux Terminal Lab...`,
          type: 'res',
        });
        if (onOpenLinuxArena) onOpenLinuxArena();
        break;

      case 'whoami':
        newHistory.push({
          res: `Ayush Negi — MCA Student | Cloud & DevOps Enthusiast
Pursuing Master of Computer Applications (MCA), passionate about serverless cloud infrastructure, offline-first mobile databases, and WebRTC streaming.
Location: Dehradun, India
Status: MCA Student / Open for Cloud & DevOps opportunities.`,
          type: 'res',
        });
        break;

      case 'skills':
        newHistory.push({
          res: `Core Competencies: Python, AWS, Docker, Kubernetes, Terraform, Flutter, SQLite, WebRTC, jsPDF, Leaflet.js, REST APIs, Linux OS.
Opening Python diagnostic modal...`,
          type: 'res',
        });
        onOpenModal('python');
        break;

      case 'projects':
        newHistory.push({
          res: `Production Engineering Showcase:
1. NAVARA [PWA / Real-Time] - Transport tracking web app (navara.ayushnegi.in)
2. SEVA [Flutter / Offline] - Health worker mobile application
3. MEDI CONNECT [WebRTC / Full-Stack] - Telehealth platform (mediconnect.ayushnegi.in)
4. USCS E-WALL [Canvas / CLI] - E-waste art showcase (uscs-e-wall.ayushnegi.in)
5. NIM MESH [Flutter / MANET / P2P] - Resilient off-grid mesh system`,
          type: 'res',
        });
        break;

      case 'contact':
        newHistory.push({
          res: `Direct Channels:
• Email: ayushnegi5328@gmail.com
• Phone / WhatsApp: +91 9528532822
• LinkedIn: linkedin.com/in/ayush-negi-88a848381/`,
          type: 'res',
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'date':
        newHistory.push({ res: new Date().toString(), type: 'res' });
        break;

      case 'exit':
        onClose();
        setInputVal('');
        return;

      case 'theme azure':
      case 'theme green':
      case 'theme red':
      case 'theme orange':
      case 'theme purple':
        const theme = cmd.split(' ')[1];
        onSetAura(theme);
        newHistory.push({ res: `Aura theme updated to ${theme.toUpperCase()}.`, type: 'res' });
        break;

      default:
        newHistory.push({
          res: `Command not recognized: '${cmd}'. Type 'help' for a list of commands.`,
          type: 'error',
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <>
      <div id="terminal-overlay" className={isOpen ? 'active' : ''}>
        <div className="term-header">
          <span>AYUSH_NEGI_OS v3.0.0 — TERMINAL_ACCESS</span>
          <span id="term-time">{currentTime}</span>
        </div>

        <div id="term-output" ref={outputRef}>
          {history.map((item, idx) => (
            <React.Fragment key={idx}>
              {item.cmd && <span className="term-line cmd">{item.cmd}</span>}
              {item.res && (
                <span className={`term-line ${item.type === 'error' ? 'error' : 'res'}`} style={{ whiteSpace: 'pre-wrap' }}>
                  {item.res}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        <form className="term-input-wrap" onSubmit={handleCommandSubmit}>
          <span className="term-prompt">student@ayushnegi:~$</span>
          <input
            type="text"
            id="term-input"
            ref={inputRef}
            placeholder="Type a command..."
            autoComplete="off"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
        </form>
        <span className="term-hint">Press 'ESC' or type 'exit' to close terminal</span>
      </div>

      {/* CLI TRIGGER BUTTON */}
      <button className="cli-trigger" id="cli-open" title="Open System Terminal (CLI)" onClick={() => (isOpen ? onClose() : undefined)}>
        <span className="cli-trigger-icon" onClick={() => (isOpen ? onClose() : undefined)}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </span>
      </button>
    </>
  );
};
