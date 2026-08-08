export interface Project {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
  badgeText: string;
  badgeClass: 'green' | 'cyan' | 'orange' | 'purple';
  accentColor: string;
  description: string;
  highlights: string[];
  techStack: string[];
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
    description: 'Progressive Web App leveraging Firebase serverless architecture and Leaflet.js for real-time vehicle telemetry and commuter route tracking.',
    highlights: [
      'Multi-stage driver onboarding verification system.',
      'Dynamic commuter route search & spatial mapping algorithm.',
      'Scaled serverless streams for concurrent drivers & commuters.'
    ],
    techStack: ['Firebase', 'Leaflet.js', 'JavaScript', 'PWA'],
    link: 'https://navara.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ navara.ayushnegi.in'
  },
  {
    id: '02',
    icon: '🏥',
    name: 'SEVA',
    subtitle: 'Health Worker Mobile Application',
    badgeText: 'FLUTTER / OFFLINE',
    badgeClass: 'cyan',
    accentColor: 'var(--cyan)',
    description: 'Cross-platform Flutter app tailored for ASHA health workers in low-connectivity rural zones with zero data loss architecture.',
    highlights: [
      'Offline-first local SQLite database for zero-downtime input.',
      'Automated connectivity monitoring & queue engine.',
      'Background cloud sync transferring local records to Firestore.'
    ],
    techStack: ['Flutter', 'SQLite', 'Firebase Firestore', 'Android/iOS'],
    linkText: 'OFFLINE-FIRST MOBILE SYSTEM'
  },
  {
    id: '03',
    icon: '🩺',
    name: 'MEDI CONNECT',
    subtitle: 'Healthcare Management Platform',
    badgeText: 'WEBRTC / FULL-STACK',
    badgeClass: 'orange',
    accentColor: 'var(--orange)',
    description: 'Comprehensive clinic management dashboard combining real-time WebRTC video consultations with client-side PDF document compilation.',
    highlights: [
      'Peer-to-peer low-latency WebRTC video stream integration.',
      'Automated digital prescription compilation engine via jsPDF.',
      'Full clinic appointment scheduling & patient management.'
    ],
    techStack: ['WebRTC', 'jsPDF', 'JavaScript', 'HTML/CSS'],
    link: 'https://mediconnect.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ mediconnect.ayushnegi.in'
  },
  {
    id: '04',
    icon: '♻️',
    name: 'USCS E-WALL',
    subtitle: 'E-Waste Art Installation Showcase',
    badgeText: 'INTERACTIVE / CANVAS',
    badgeClass: 'purple',
    accentColor: 'var(--purple)',
    description: 'Cyberpunk showcase for a 9m² physical e-waste art installation built from 50kg+ IT components (CPUs, PCBs, RAM), featuring dynamic matrix maps and impact metrics.',
    highlights: [
      'Interactive multi-touch pan & zoom physical wall map.',
      'EPA research-backed personal environmental impact calculator.',
      'Integrated UNIX CLI terminal & matrix particle canvas.'
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS Grid', 'UNIX CLI'],
    link: 'https://uscs-e-wall.ayushnegi.in',
    linkText: 'LAUNCH APP ↗ uscs-e-wall.ayushnegi.in'
  },
  {
    id: '05',
    icon: '📡',
    name: 'NIM MESH',
    subtitle: 'Resilient Off-Grid P2P MANET System',
    badgeText: 'FLUTTER / MANET / P2P',
    badgeClass: 'cyan',
    accentColor: 'var(--cyan)',
    description: 'Autonomous Mobile Ad-hoc Network (MANET) app using Google Nearby Connections (BLE & Wi-Fi Direct) for off-grid peer-to-peer text & chunked file communication without cellular or internet access.',
    highlights: [
      'P2P_CLUSTER topology with store-and-forward naive flooding & UUID deduplication.',
      'Custom 20KB chunked fragmentation protocol for binary file streaming over BLE/Wi-Fi.',
      'Emergency response communication tool designed for denied & disaster environments.'
    ],
    techStack: ['Flutter', 'Dart', 'Nearby Connections API', 'BLE / Wi-Fi Direct', 'SQLite'],
    linkText: 'OFF-GRID P2P MESH SYSTEM'
  }
];
