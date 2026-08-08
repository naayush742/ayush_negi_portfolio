import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <span className="f-brand-name">
            AYUSH<span className="a">.NEGI</span>
          </span>
          <p>
            Computer Science Student pursuing Master of Computer Applications (MCA). Cloud &amp; DevOps Enthusiast.
          </p>
        </div>

        <div>
          <div className="f-col-h">QUICK TELEMETRY</div>
          <ul className="f-lnks">
            <li><a href="#home">01 // TOP</a></li>
            <li><a href="#about">02 // SPECIFICATIONS</a></li>
            <li><a href="#tech">03 // SKILLS MATRIX</a></li>
            <li><a href="#materials">04 // PORTFOLIO</a></li>
            <li><a href="#contact">05 // CONTACT</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-btm">
        <span className="f-copy">
          © {new Date().getFullYear()} AYUSH NEGI. ALL RIGHTS RESERVED. DEPLOYED ON FIREBASE HOSTING.
        </span>

        <div className="f-status">
          <span className="f-dot"></span>
          <span>AURA COLOR ENGINE ACTIVE</span>
        </div>
      </div>
    </footer>
  );
};
