import React, { useEffect, useState } from 'react';

export const SystemLog: React.FC = () => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="system-log">
      <div className="log-track" id="log-track">
        <div className="log-item">
          <span className="log-time">[{timeStr}]</span>
          <span>SYS_TELEMETRY: CLOUD_STACK_NOMINAL</span>
        </div>
        <div className="log-item">
          <span className="log-time">[{timeStr}]</span>
          <span>AWS_DEVOPS_PROD: ALL_SERVICES_HEALTHY</span>
        </div>
        <div className="log-item">
          <span className="log-time">[{timeStr}]</span>
          <span>WEBRTC: LATENCY &lt;50ms</span>
        </div>
        <div className="log-item">
          <span className="log-time">[{timeStr}]</span>
          <span>OFFLINE_DB_SYNC: READY</span>
        </div>
      </div>
    </div>
  );
};
