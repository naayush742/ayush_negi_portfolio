import React, { useState } from 'react';
import { techsData, Tech } from '../data/techs';

export const SkillsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { key: 'all', label: 'ALL CATEGORIES' },
    { key: 'dev', label: 'LANGUAGES & FRAMEWORKS' },
    { key: 'cloud', label: 'CLOUD & DEVOPS' },
    { key: 'db', label: 'DATABASES & APIS' },
    { key: 'tools', label: 'ENGINEERING TOOLS' },
    { key: 'creative', label: 'CREATIVE MEDIA' },
  ];

  const filteredTechs = techsData.filter((t: Tech) => {
    if (filter === 'all') return true;
    return t.type === filter;
  });

  return (
    <section className="tech-section section-z" id="tech">
      <div className="tech-header reveal">
        <div>
          <div className="eyebrow">TECHNICAL MATRIX</div>
          <h2 className="s-heading">
            SKILL <span className="hl">INVENTORY</span>
          </h2>
        </div>

        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`fpill ${filter === cat.key ? 'on' : ''}`}
              onClick={() => setFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tech-grid reveal d2">
        {filteredTechs.map((t: Tech) => (
          <div
            key={t.slug}
            className="tc"
            style={
              {
                '--tc-c': t.color,
                '--tc-a': t.alpha,
                cursor: 'default',
              } as React.CSSProperties
            }
          >
            <div className="tc-front">
              <div className="tc-icon">
                <img src={t.icon} alt={t.name} className="ti" />
              </div>
              <span className="tc-name">{t.name}</span>
              <span className="tc-type">{t.type.toUpperCase()}</span>
            </div>

            <div className="tc-back">
              <div className="tc-b-title">{t.name}</div>
              <div className="tc-b-desc" style={{ color: 'var(--text2)', fontSize: '0.78rem' }}>
                {t.type.toUpperCase()} COMPETENCY
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
