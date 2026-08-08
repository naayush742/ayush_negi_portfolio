export interface HotspotData {
  slug: string;
  components: string;
  fact: string;
  videoId: string;
}

export const baseHotspots: HotspotData[] = [
  { slug: 'aws', components: 'Cloud Infrastructure & Hosting', fact: 'AWS cloud platform for serverless application hosting and cloud infrastructure.', videoId: '3XFODda6YXo' },
  { slug: 'docker', components: 'Container Deployments', fact: 'Docker containerization used to encapsulate full-stack environments and microservices.', videoId: 'rOTqEljQGpk' },
  { slug: 'kubernetes', components: 'Container Orchestration & Cluster Management', fact: 'Orchestration platform managing container scaling, service discovery, and resilient cluster deployments.', videoId: 'rOTqEljQGpk' },
  { slug: 'terraform', components: 'Cloud Infrastructure & IaC Automation', fact: 'Infrastructure as Code (IaC) tool for cloud resource provisioning and architecture state management.', videoId: '3XFODda6YXo' },
  { slug: 'vscode', components: 'Primary Development IDE', fact: 'Visual Studio Code environment configured for Flutter, Python, and Web stacks.', videoId: 'VqCgcpAypFQ' },
  { slug: 'onedrive', components: 'Cloud Document Storage', fact: 'Document synchronization and cloud storage workflows.', videoId: '3XFODda6YXo' },
  { slug: 'github', components: 'Automated CI/CD Pipelines', fact: 'Version control workflows and continuous deployment pipelines.', videoId: 'w3jLJU7DT5E' },
  { slug: 'git', components: 'Source Code & Version Control', fact: 'Distributed version control system for source code management and collaborative engineering.', videoId: 'w3jLJU7DT5E' },
  { slug: 'html', components: 'PWA Web Structure', fact: 'Semantic HTML5 structure and accessible markup for progressive web applications.', videoId: 'w3jLJU7DT5E' },
  { slug: 'kafka', components: 'Stream Processing Concepts', fact: 'Data pipeline and real-time telemetry stream processing concepts.', videoId: 'HXX8tQMRyS8' },
  { slug: 'linux', components: 'DevOps & Server Environments', fact: 'Linux command line, shell scripting, and container deployment environments.', videoId: 'yVpbFMhOAwE' },
  { slug: 'gemini', components: 'AI Integration Capabilities', fact: 'Integrating generative AI developer APIs and cloud services.', videoId: 'jpHJ64S2a8k' },
  { slug: 'golang', components: 'Backend Systems', fact: 'Concurrent backend microservice architectures.', videoId: 'upDLs1sn7g4' },
  { slug: 'dinogame', components: 'Offline Fallback UX', fact: 'Design inspiration for offline fallback indicators in mobile applications.', videoId: '5FKnkv_gWwU' },
  { slug: 'python', components: 'Automation & Scripting', fact: 'Python scripting for data processing, web backend utilities, and cloud tasks.', videoId: 'Y8Tko2JC5Cs' },
  { slug: 'flutter', components: 'Seva Mobile Health Worker App', fact: 'Cross-platform Flutter framework powering the offline-first Seva application for rural healthcare workers.', videoId: '5FKnkv_gWwU' },
  { slug: 'sqlite', components: 'Seva Mobile App (Offline Storage)', fact: 'Embedded local database powering offline-first data storage and zero-data-loss synchronization.', videoId: '5FKnkv_gWwU' },
  { slug: 'firebase', components: 'Navara PWA & Seva Cloud Backend', fact: 'Cloud Firestore database, serverless architecture, authentication, and real-time telemetry streaming.', videoId: '3XFODda6YXo' },
  { slug: 'restapi', components: 'Microservices & API Integrations', fact: 'Designing structured, secure HTTP RESTful API endpoints for mobile and web application data flow.', videoId: 'upDLs1sn7g4' },
  { slug: 'webrtc', components: 'Medi Connect Telehealth System', fact: 'Peer-to-peer real-time audio/video streaming framework integrated into Medi Connect video consultations.', videoId: 'upDLs1sn7g4' },
  { slug: 'jspdf', components: 'Medi Connect Digital Prescriptions', fact: 'Client-side PDF generation engine powering instant digital medical report and prescription compilation.', videoId: 'upDLs1sn7g4' },
  { slug: 'leaflet', components: 'Navara Real-Time Bus Tracker', fact: 'Interactive mobile and web mapping library rendering real-time vehicle telemetry vectors.', videoId: '3XFODda6YXo' },
  { slug: 'postman', components: 'API Testing & Verification', fact: 'API endpoint testing, payload verification, and automated collection inspection.', videoId: 'upDLs1sn7g4' },
  { slug: 'videography', components: 'Production & Technical Media', fact: 'End-to-end video production, camera operation, lighting, audio capture, and post-production editing.', videoId: 'VqCgcpAypFQ' },
  { slug: 'content', components: 'Technical Documentation & Writing', fact: 'Technical documentation, architecture case studies, and digital content curation.', videoId: 'VqCgcpAypFQ' },
  { slug: 'photography', components: 'Visual Media & Creative Composition', fact: 'Digital camera operation, framing, visual asset creation, and creative composition.', videoId: 'VqCgcpAypFQ' },
  { slug: 'dotnet', components: 'Enterprise Application Framework', fact: 'Enterprise software framework for building scalable desktop and server applications.', videoId: 'mUQZ1gO0Sls' },
  { slug: 'java', components: 'Object-Oriented Backend Systems', fact: 'Core object-oriented language for structured software development and backend systems.', videoId: 'mUQZ1gO0Sls' },
  { slug: 'php', components: 'Web Scripting', fact: 'Server-side web scripting and API endpoint handlers.', videoId: 'upDLs1sn7g4' },
  { slug: 'streamlit', components: 'Analytical Dashboards', fact: 'Rapid Python dashboard generation for telemetry metrics.', videoId: 'rOTqEljQGpk' },
  { slug: 'javascript', components: 'Full-Stack Web Engines', fact: 'Full-stack ES6+ JavaScript powering WebRTC video and interactive web UIs.', videoId: 'upDLs1sn7g4' },
  { slug: 'css', components: 'Cyberpunk Design System', fact: 'Vanilla CSS3 styling, custom properties, matrix animations, and responsive layouts.', videoId: 'w3jLJU7DT5E' },
  { slug: 'cpp', components: 'Software Fundamentals', fact: 'Data structures, memory management, and system programming foundation.', videoId: 'mUQZ1gO0Sls' }
];
