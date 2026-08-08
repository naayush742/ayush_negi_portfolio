import React from 'react';

export const EducationSection: React.FC = () => {
  const educationTimeline = [
    {
      num: '01',
      color: 'var(--green)',
      phase: 'AUG 2025 — PRESENT',
      title: 'Master of Computer Applications (MCA)',
      spec: 'Focus on Cloud Computing & DevOps',
      location: 'Uttaranchal University, Dehradun, Uttarakhand',
    },
    {
      num: '02',
      color: 'var(--cyan)',
      phase: 'SEP 2022 — JUN 2025',
      title: 'Bachelor of Science in Information Technology (B.Sc. IT)',
      location: 'Uttaranchal University, Dehradun, Uttarakhand',
    },
    {
      num: '03',
      color: 'var(--orange)',
      phase: 'APR 2021 — JUN 2022',
      title: 'Intermediate (10+2)',
      location: 'SGRR Public School, Kotdwara, Uttarakhand',
    },
    {
      num: '04',
      color: 'var(--purple)',
      phase: 'APR 2019 — JUL 2020',
      title: 'High School (10th)',
      location: 'Bal Bharti Sr. Sec School, Kotdwara, Uttarakhand',
    },
  ];

  return (
    <section className="materials-section section-z" id="education" style={{ background: 'transparent' }}>
      <div className="mat-inner">
        <div>
          <div className="eyebrow reveal in">Academic Foundation</div>
          <h2 className="s-heading reveal in d1">
            Education &amp;<br />
            <span className="hl">Degrees</span>
          </h2>

          <div className="timeline" style={{ marginTop: '30px' }}>
            {educationTimeline.map((item, idx) => (
              <div key={item.num} className={`tl-item reveal in d${idx + 1}`}>
                <div className="tl-num" style={{ '--tc': item.color } as React.CSSProperties}>
                  {item.num}
                </div>
                <div>
                  <div className="tl-phase" style={{ '--tc': item.color } as React.CSSProperties}>
                    {item.phase}
                  </div>
                  <div className="tl-title">{item.title}</div>
                  {item.spec && (
                    <div className="tl-desc" style={{ color: 'var(--cyan)', fontWeight: 600 }}>
                      {item.spec}
                    </div>
                  )}
                  <div className="tl-desc">{item.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
