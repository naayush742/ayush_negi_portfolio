export interface Tech {
  name: string;
  type: 'dev' | 'cloud' | 'db' | 'tools' | 'creative';
  icon: string;
  color: string;
  alpha: string;
  slug: string;
}

export const techsData: Tech[] = [
  { name: 'Python', type: 'dev', icon: '/icon/python.png', color: '#3776ab', alpha: 'rgba(55,118,171,0.15)', slug: 'python' },
  { name: 'Java', type: 'dev', icon: '/icon/java.png', color: '#f89820', alpha: 'rgba(248,152,32,0.15)', slug: 'java' },
  { name: 'Flutter', type: 'dev', icon: '/icon/flutter.png', color: '#02569b', alpha: 'rgba(2,86,155,0.15)', slug: 'flutter' },
  { name: '.NET', type: 'dev', icon: '/icon/dotnet.png', color: '#512bd4', alpha: 'rgba(81,43,212,0.15)', slug: 'dotnet' },
  { name: 'JavaScript (ES6+)', type: 'dev', icon: '/icon/js.png', color: '#f7df1e', alpha: 'rgba(247,223,30,0.15)', slug: 'javascript' },
  { name: 'WebRTC', type: 'dev', icon: '/icon/webrtc.svg', color: '#ff4d9b', alpha: 'rgba(255,77,155,0.15)', slug: 'webrtc' },
  { name: 'AWS', type: 'cloud', icon: '/icon/aws.png', color: '#ff9900', alpha: 'rgba(255,153,0,0.15)', slug: 'aws' },
  { name: 'Linux OS', type: 'cloud', icon: '/icon/linux.png', color: '#fcc624', alpha: 'rgba(252,198,36,0.15)', slug: 'linux' },
  { name: 'Docker', type: 'cloud', icon: '/icon/docker.png', color: '#2496ed', alpha: 'rgba(36,150,237,0.15)', slug: 'docker' },
  { name: 'Kubernetes', type: 'cloud', icon: '/icon/k8.png', color: '#326ce5', alpha: 'rgba(50,108,229,0.15)', slug: 'kubernetes' },
  { name: 'Terraform', type: 'cloud', icon: '/icon/teraform.png', color: '#844fba', alpha: 'rgba(132,79,186,0.15)', slug: 'terraform' },
  { name: 'CI/CD Automation', type: 'cloud', icon: '/icon/cicd.png', color: '#2088ff', alpha: 'rgba(32,136,255,0.15)', slug: 'github' },
  { name: 'Firebase', type: 'db', icon: '/icon/firebase.svg', color: '#ffca28', alpha: 'rgba(255,202,40,0.15)', slug: 'firebase' },
  { name: 'SQLite', type: 'db', icon: '/icon/sqlite.png', color: '#00d4ff', alpha: 'rgba(0,212,255,0.15)', slug: 'sqlite' },
  { name: 'REST APIs', type: 'db', icon: '/icon/api.png', color: '#00ff88', alpha: 'rgba(0,255,136,0.15)', slug: 'restapi' },
  { name: 'Git Version Control', type: 'tools', icon: '/icon/github.png', color: '#f05032', alpha: 'rgba(240,80,50,0.15)', slug: 'git' },
  { name: 'Postman', type: 'tools', icon: '/icon/postman.png', color: '#ff6c37', alpha: 'rgba(255,108,55,0.15)', slug: 'postman' },
  { name: 'jsPDF Engine', type: 'tools', icon: '/icon/jspdf.svg', color: '#e61d24', alpha: 'rgba(230,29,36,0.15)', slug: 'jspdf' },
  { name: 'Leaflet.js', type: 'tools', icon: '/icon/leafletjs.png', color: '#199900', alpha: 'rgba(25,153,0,0.15)', slug: 'leaflet' },
  { name: 'Videography', type: 'creative', icon: '/icon/videography.svg', color: '#ff4d9b', alpha: 'rgba(255,77,155,0.15)', slug: 'videography' },
  { name: 'Photography', type: 'creative', icon: '/icon/photography.svg', color: '#ffb84d', alpha: 'rgba(255,184,77,0.15)', slug: 'photography' },
  { name: 'Content Writing', type: 'creative', icon: '/icon/writing.svg', color: '#9b59ff', alpha: 'rgba(155,89,255,0.15)', slug: 'content' }
];
