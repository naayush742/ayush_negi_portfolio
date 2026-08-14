export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  badgeText: string;
  badgeClass: 'green' | 'cyan' | 'orange' | 'purple';
  accentColor: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  techStack: string[];
  metrics?: ProjectMetric[];
  link?: string;
  linkText?: string;
}

export const projectsData: Project[] = [
  {
    id: '01',
    icon: '🚌',
    name: 'NAVARA',
    subtitle: 'Real-Time Transport Tracking Web App',
    badgeText: 'PWA / REAL-TIME',
    badgeClass: 'green',
    accentColor: 'var(--green)',
    shortDescription:
      'Progressive Web App for real-time vehicle telemetry, dynamic commuter route mapping, and driver verification.',
    description:
      'Progressive Web App leveraging Firebase serverless architecture and Leaflet.js for real-time vehicle telemetry, live spatial tracking, and dynamic commuter route navigation across transport corridors.',
    metrics: [
      { label: 'ARCHITECTURE', value: 'Serverless PWA' },
      { label: 'STREAM LATENCY', value: '< 250ms Live Sync' },
      { label: 'MAP ENGINE', value: 'Leaflet.js Spatial' },
    ],
    highlights: [
      'Multi-stage driver onboarding verification system with credential checks.',
      'Dynamic commuter route search & spatial mapping algorithm for real-time corridor tracking.',
      'Scaled serverless streams for concurrent drivers & commuters with zero pipeline lag.',
    ],
    techStack: ['Firebase', 'Leaflet.js', 'JavaScript', 'PWA', 'Cloud Functions'],
    link: 'https://navara.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ navara.ayushnegi.in',
  },
  {
    id: '02',
    icon: '🏥',
    name: 'SEVA',
    subtitle: 'Health Worker Mobile Application',
    badgeText: 'FLUTTER / OFFLINE',
    badgeClass: 'cyan',
    accentColor: 'var(--cyan)',
    shortDescription:
      'Offline-first Flutter mobile application engineered for rural healthcare workers with zero data loss architecture.',
    description:
      'Cross-platform Flutter app tailored for ASHA health workers operating in low-connectivity and offline rural zones, featuring local SQLite queues and automated background synchronization to Firestore.',
    metrics: [
      { label: 'STORAGE', value: 'Local SQLite Engine' },
      { label: 'DATA INTEGRITY', value: '100% Zero-Loss' },
      { label: 'SYNC PIPELINE', value: 'Automated Cloud Queue' },
    ],
    highlights: [
      'Offline-first local SQLite database enabling uninterrupted zero-downtime medical data input.',
      'Automated network connectivity monitoring & background queuing engine.',
      'Background cloud sync safely transferring local records to Firestore upon reconnection.',
    ],
    techStack: ['Flutter', 'Dart', 'SQLite', 'Firebase Firestore', 'Android/iOS'],
    linkText: 'OFFLINE-FIRST MOBILE SYSTEM',
  },
  {
    id: '03',
    icon: '🩺',
    name: 'MEDI CONNECT',
    subtitle: 'Healthcare Management Platform',
    badgeText: 'WEBRTC / FULL-STACK',
    badgeClass: 'orange',
    accentColor: 'var(--orange)',
    shortDescription:
      'Full-stack clinic platform featuring low-latency WebRTC video consultations and automated client-side PDF prescriptions.',
    description:
      'Comprehensive clinic management dashboard combining peer-to-peer real-time WebRTC video consultations with client-side PDF document compilation and patient scheduling.',
    metrics: [
      { label: 'COMMUNICATION', value: 'P2P WebRTC Video' },
      { label: 'DOC GENERATION', value: 'Client-Side jsPDF' },
      { label: 'CLINIC SUITE', value: 'Full Patient Portal' },
    ],
    highlights: [
      'Peer-to-peer low-latency WebRTC video stream integration for remote doctor consultations.',
      'Automated digital prescription compilation engine powered by jsPDF directly in browser.',
      'Full clinic appointment scheduling, patient records management, and history tracking.',
    ],
    techStack: ['WebRTC', 'jsPDF', 'JavaScript', 'HTML5', 'CSS3', 'Node.js'],
    link: 'https://mediconnect.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ mediconnect.ayushnegi.in',
  },
  {
    id: '04',
    icon: '♻️',
    name: 'USCS E-WALL',
    subtitle: 'E-Waste Art Installation Showcase',
    badgeText: 'INTERACTIVE / CANVAS',
    badgeClass: 'purple',
    accentColor: 'var(--purple)',
    shortDescription:
      'Interactive cyberpunk showcase for a 9m² physical e-waste art installation built from 50kg+ recycled IT hardware.',
    description:
      'Cyberpunk digital showcase for a 9m² physical e-waste art installation built from 50kg+ IT components (CPUs, PCBs, RAM), featuring multi-touch matrix maps, personal environmental calculators, and an embedded UNIX CLI.',
    metrics: [
      { label: 'SCALE', value: '9m² Physical Installation' },
      { label: 'HARDWARE', value: '50kg+ Recycled Components' },
      { label: 'ANALYTICS', value: 'EPA-Backed Impact Engine' },
    ],
    highlights: [
      'Interactive multi-touch pan & zoom physical wall map of motherboards, chips, and circuits.',
      'EPA research-backed personal environmental impact and carbon savings calculator.',
      'Integrated UNIX CLI terminal & matrix particle canvas simulating cybernetic circuits.',
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS Grid', 'UNIX CLI', 'Audio API'],
    link: 'https://uscs-e-wall.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ uscs-e-wall.ayushnegi.in',
  },
  {
    id: '05',
    icon: '📡',
    name: 'NIM MESH',
    subtitle: 'Resilient Off-Grid P2P MANET System',
    badgeText: 'FLUTTER / MANET / P2P',
    badgeClass: 'cyan',
    accentColor: 'var(--cyan)',
    shortDescription:
      'Autonomous off-grid Mobile Ad-hoc Network for peer-to-peer communication over BLE & Wi-Fi Direct without internet.',
    description:
      'Autonomous Mobile Ad-hoc Network (MANET) application using Google Nearby Connections (BLE & Wi-Fi Direct) for off-grid peer-to-peer text & chunked binary file communication in denied or disaster environments.',
    metrics: [
      { label: 'TOPOLOGY', value: 'P2P Cluster MANET' },
      { label: 'CONNECTIVITY', value: 'BLE + Wi-Fi Direct' },
      { label: 'PROTOCOL', value: '20KB Chunked Streaming' },
    ],
    highlights: [
      'P2P_CLUSTER topology with store-and-forward naive flooding & UUID deduplication.',
      'Custom 20KB chunked fragmentation protocol for binary file streaming over BLE/Wi-Fi.',
      'Emergency response communication tool designed for denied, offline, and disaster environments.',
    ],
    techStack: ['Flutter', 'Dart', 'Nearby Connections API', 'BLE / Wi-Fi Direct', 'SQLite'],
    linkText: 'OFF-GRID P2P MESH SYSTEM',
  },
];
