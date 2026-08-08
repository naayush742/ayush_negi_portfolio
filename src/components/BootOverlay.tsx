import React, { useState, useEffect } from 'react';

export const BootOverlay: React.FC = () => {
  const [isBooted, setIsBooted] = useState<boolean>(() => {
    return sessionStorage.getItem('uscs-booted') === 'true';
  });

  const [isInitializing, setIsInitializing] = useState<boolean>(false);
  const [isGateOpening, setIsGateOpening] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('INITIATING BOOT SEQUENCE...');
  const [logs, setLogs] = useState<string[]>([]);

  const handleSkip = () => {
    sessionStorage.setItem('uscs-booted', 'true');
    setIsGateOpening(true);
    setTimeout(() => {
      setIsBooted(true);
    }, 600);
  };

  const handleInitiateBoot = () => {
    if (isInitializing) return;
    setIsInitializing(true);
    setLogs([]);
    setProgress(0);

    const bootSteps = [
      'SYS: MOUNTING CLOUD ARCHITECTURE NODES...',
      'NET: ESTABLISHING WEBRTC PEER CONNECTIONS...',
      'DB: INITIALIZING OFFLINE SQLITE QUEUE ENGINE...',
      'AWS: CONNECTING TO SERVERLESS MICROSERVICES...',
      'SYS: AYUSH_NEGI_OS V3.0 READY — NOMINAL'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const currentProg = Math.min(currentStep * 20, 100);
      setProgress(currentProg);

      if (currentStep <= bootSteps.length) {
        setLogs((prev) => [...prev, bootSteps[currentStep - 1]]);
        setStatusText(bootSteps[currentStep - 1]);
      }

      if (currentProg >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsGateOpening(true);
          setTimeout(() => {
            sessionStorage.setItem('uscs-booted', 'true');
            setIsBooted(true);
          }, 600);
        }, 500);
      }
    }, 350);
  };

  // Auto-initiate boot sequence if not booted yet
  useEffect(() => {
    if (!isBooted && !isInitializing) {
      const autoTimer = setTimeout(() => {
        handleInitiateBoot();
      }, 400);
      return () => clearTimeout(autoTimer);
    }
  }, [isBooted]);

  if (isBooted) return null;

  return (
    <div id="boot-overlay" className={`${isBooted ? 'booted' : ''} ${isGateOpening ? 'booting-out' : ''}`}>
      <div className="boot-gate gate-left" />
      <div className="boot-gate gate-right" />
      <div className="boot-container">
        <div className="boot-header">
          <div className="boot-info-grid">
            <div>SYS: AYUSH_NEGI_OS V3.0</div>
            <div>LOC: DEHRADUN, INDIA</div>
            <div>MEM: 64.0 GB [OK]</div>
            <div>STATUS: {progress === 100 ? 'SYSTEM READY' : 'INITIALIZING...'}</div>
          </div>
        </div>

        <div className="boot-brand">
          <pre className="boot-ascii">
{` █████╗ ██╗   ██╗██╗   ██╗███████╗██╗  ██╗    
██╔══██╗╚██╗ ██╔╝██║   ██║██╔════╝██║  ██║    
███████║ ╚████╔╝ ██║   ██║███████╗███████║    
██╔══██║  ╚██╔╝  ██║   ██║╚════██║██╔══██║    
██║  ██║   ██║   ╚██████╔╝███████║██║  ██║   
╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝╚═╝  ╚═╝ `}
          </pre>
          <div className="boot-subtitle">// MCA STUDENT // CLOUD & DEVOPS ENGINEER //</div>
        </div>

        {!isInitializing ? (
          <div className="boot-controls">
            <button id="boot-btn" onClick={handleInitiateBoot}>
              [ INITIATE SYSTEM BOOT ]
            </button>
            <button id="boot-skip-btn" onClick={handleSkip}>
              [ SKIP INITIALIZATION ]
            </button>
          </div>
        ) : (
          <>
            <div id="boot-terminal">
              {logs.map((log, index) => (
                <div key={index} className="boot-log success">
                  {log}
                </div>
              ))}
            </div>

            <div className="boot-progress-wrap">
              <div className="boot-progress-info">
                <span>{statusText}</span>
                <span>{progress}%</span>
              </div>
              <div className="boot-progress-bar-bg">
                <div className="boot-progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4px' }}>
              <button id="boot-skip-btn" onClick={handleSkip} style={{ padding: '6px 14px', fontSize: '0.65rem' }}>
                [ SKIP TO MAIN SITE ➔ ]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
