import React from 'react';

export const StatsBar: React.FC = () => {
  return (
    <div className="stats-wrap">
      <div className="stats-inner">
        <div className="stat-item reveal d1">
          <span className="stat-num">99.9%</span>
          <span className="stat-label">Target Uptime SLA</span>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-item reveal d2">
          <span className="stat-num">&lt;15ms</span>
          <span className="stat-label">WebRTC Stream Latency</span>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-item reveal d3">
          <span className="stat-num">5,000+</span>
          <span className="stat-label">MANET Node Capacity</span>
          <div className="stat-bar"></div>
        </div>

        <div className="stat-item reveal d4">
          <span className="stat-num">100%</span>
          <span className="stat-label">CI/CD Sync Automation</span>
          <div className="stat-bar"></div>
        </div>
      </div>
    </div>
  );
};
