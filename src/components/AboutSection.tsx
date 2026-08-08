import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section className="about-section section-z" id="about">
      <div className="about-inner">
        <div className="about-text reveal-l">
          <div className="eyebrow">SYSTEM SPECIFICATIONS</div>
          <h2 className="s-heading">
            ABOUT <span className="hl">AYUSH NEGI</span>
          </h2>

          <div className="s-body">
            <p>
              Computer Science student currently pursuing Master of Computer Applications (MCA). Passionate about scalable serverless cloud architectures, offline-first mobile synchronization platforms, and low-latency peer-to-peer WebRTC media networks.
            </p>
          </div>

          <div className="about-period">
            <div className="period-block">
              <span className="period-label">BACHELOR OF SCIENCE</span>
              <span className="period-date">2022</span>
            </div>
            <div className="period-arrow">
              <span className="period-line"></span>
              <span className="period-tag">COMPUTER SCIENCE</span>
            </div>
            <div className="period-block">
              <span className="period-label">MCA DEGREE</span>
              <span className="period-date">PURSUING</span>
            </div>
          </div>
        </div>

        <div className="about-visual reveal-r">
          <div className="cloud-topology-card">
            <div className="topo-header">
              <span className="topo-title">☁️ CLOUD TOPOLOGY &amp; ARCHITECTURE</span>
              <span className="topo-status-tag">SYSTEM ONLINE</span>
            </div>

            <div className="topo-grid-box">
              <div className="topo-cluster">
                <div className="cluster-title">CONTAINER ORCHESTRATION</div>
                <div className="cluster-nodes">
                  <span className="t-node"><img src="/icon/docker.png" alt="Docker" /> Docker</span>
                  <span className="t-node"><img src="/icon/k8.png" alt="K8s" /> Kubernetes</span>
                  <span className="t-node"><img src="/icon/aws.png" alt="AWS" /> AWS ECR</span>
                </div>
              </div>

              <div className="topo-cluster">
                <div className="cluster-title">CI/CD &amp; AUTOMATION</div>
                <div className="cluster-nodes">
                  <span className="t-node"><img src="/icon/cicd.png" alt="CI/CD" /> GitHub Actions</span>
                  <span className="t-node"><img src="/icon/teraform.png" alt="Terraform" /> Terraform</span>
                  <span className="t-node"><img src="/icon/github.png" alt="Git" /> Git Ops</span>
                </div>
              </div>

              <div className="topo-cluster">
                <div className="cluster-title">REAL-TIME MEDIA STREAMING</div>
                <div className="cluster-nodes">
                  <span className="t-node"><img src="/icon/webrtc.svg" alt="WebRTC" /> WebRTC P2P</span>
                  <span className="t-node"><img src="/icon/js.png" alt="WebSocket" /> WebSockets</span>
                  <span className="t-node"><img src="/icon/api.png" alt="REST" /> REST APIs</span>
                </div>
              </div>

              <div className="topo-cluster">
                <div className="cluster-title">OFFLINE-FIRST &amp; MESH</div>
                <div className="cluster-nodes">
                  <span className="t-node"><img src="/icon/flutter.png" alt="Flutter" /> Flutter</span>
                  <span className="t-node"><img src="/icon/sqlite.png" alt="SQLite" /> SQLite</span>
                  <span className="t-node"><img src="/icon/firebase.svg" alt="Firebase" /> Firestore</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-metadata">
            <div className="meta-header">
              <div className="meta-dot"></div>
              <div className="meta-dot"></div>
              <div className="meta-dot"></div>
              <span className="meta-title">STUDENT_PROFILE.SYS</span>
            </div>
            <div className="meta-body">
              <div className="meta-line">
                <span className="m-lbl">LOCATION: </span>
                <span className="m-val">Dehradun, UK, India</span>
              </div>
              <div className="meta-line">
                <span className="m-lbl">STATUS: </span>
                <span className="m-val">MCA Student</span>
              </div>
              <div className="meta-line">
                <span className="m-lbl">DEGREES: </span>
                <span className="m-val">B.Sc. (2022) / MCA (Pursuing)</span>
              </div>
              <div className="meta-line">
                <span className="m-lbl">FOCUS: </span>
                <span className="m-val">Cloud &amp; DevOps Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
