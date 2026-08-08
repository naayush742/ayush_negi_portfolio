import React from 'react';
import { baseHotspots, HotspotData } from '../data/hotspots';
import { techsData } from '../data/techs';

interface HotspotModalProps {
  slug: string | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ slug, onClose }) => {
  if (!slug) return null;

  const hotspotInfo: HotspotData = baseHotspots.find((h) => h.slug === slug) || {
    slug,
    components: 'Core Technology Integration',
    fact: `Demonstrating proficiency and production usage of ${slug.toUpperCase()}.`,
    videoId: '3XFODda6YXo',
  };

  const tech = techsData.find((t) => t.slug === slug);
  const title = tech ? tech.name.toUpperCase() : slug.toUpperCase();

  return (
    <div className={`modal-overlay ${slug ? 'active' : ''}`} id="hotspot-modal">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-dot-glow" />
            <h3 id="modal-title">{title}</h3>
          </div>
          <button className="modal-close-btn" id="modalCloseBtn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">
          {/* Left column: Visuals/Video */}
          <div className="modal-media-col">
            <div className="crt-screen-wrap">
              <div className="crt-scanlines" />
              <div className="crt-screen">
                <iframe
                  id="modal-video"
                  src={`https://www.youtube.com/embed/${hotspotInfo.videoId}?autoplay=1&mute=1&controls=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                />
              </div>
            </div>
            <div className="diagnostic-console">
              <div>
                <span className="console-prompt">system@ayush_os:~$</span>{' '}
                <span id="modal-console-text">Inspecting {title} proficiency...</span>
              </div>
              <div style={{ opacity: 0.5 }}>
                <span className="console-prompt">status:</span>{' '}
                <span id="modal-console-status">SKILL_VERIFIED</span>
              </div>
            </div>
          </div>

          {/* Right column: Details */}
          <div className="modal-info-col">
            <div className="info-section">
              <span className="info-label">FEATURED IN PROJECTS</span>
              <div className="info-value" id="modal-components">
                {hotspotInfo.components}
              </div>
            </div>
            <div className="info-section">
              <span className="info-label">CAPABILITY &amp; DETAILS</span>
              <p className="info-text" id="modal-fact">
                {hotspotInfo.fact}
              </p>
            </div>
            <div className="info-actions">
              <a href="#skills" id="modal-doc-link" className="btn-primary" onClick={onClose}>
                VIEW ALL SKILLS ➔
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
