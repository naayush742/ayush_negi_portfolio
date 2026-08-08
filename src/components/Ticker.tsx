import React from 'react';

export const Ticker: React.FC = () => {
  const items = [
    'AYUSH NEGI',
    'CLOUD & DEVOPS',
    'FULL-STACK ARCHITECTURE',
    'OFFLINE-FIRST MOBILE',
    'REAL-TIME TELEMETRY',
    'WEBRTC VIDEO',
    'SERVERLESS CLOUD',
    'CREATIVE MEDIA',
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.concat(items).map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            <span className="sep">◈</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
