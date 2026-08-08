import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../utils/audioEffects';

interface ConstellationNode {
  id: string;
  title: string;
  type: 'PROJECT' | 'SKILL' | 'EXPERIENCE';
  subtitle: string;
  connections: string[];
  pos: [number, number, number];
  color: string;
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  // Projects
  {
    id: 'proj-ayush-os',
    title: 'AyushOS Kernel',
    type: 'PROJECT',
    subtitle: 'Custom OS & Virtual File System in C++',
    connections: ['sk-cpp', 'sk-linux'],
    pos: [-3.5, 2.0, 1.5],
    color: '#00d4ff',
  },
  {
    id: 'proj-neural-net',
    title: 'Neural Vision AI',
    type: 'PROJECT',
    subtitle: 'PyTorch Deep Learning Computer Vision System',
    connections: ['sk-pytorch', 'sk-python'],
    pos: [3.2, 2.4, -1.2],
    color: '#00ff88',
  },
  {
    id: 'proj-aura-3d',
    title: 'Aura 3D Spatial Canvas',
    type: 'PROJECT',
    subtitle: 'Real-time WebGL Trajectory Engine',
    connections: ['sk-threejs', 'sk-react'],
    pos: [0, 3.2, -2.5],
    color: '#9b59ff',
  },
  {
    id: 'proj-linux-lab',
    title: 'Interactive Linux Lab',
    type: 'PROJECT',
    subtitle: 'In-Browser POSIX CLI Engine',
    connections: ['sk-linux', 'sk-react'],
    pos: [-2.8, -2.2, 1.8],
    color: '#ff3131',
  },

  // Skills
  {
    id: 'sk-pytorch',
    title: 'PyTorch',
    type: 'SKILL',
    subtitle: 'Deep Learning & Neural Architectures',
    connections: ['proj-neural-net'],
    pos: [1.8, 1.2, -0.5],
    color: '#00ff88',
  },
  {
    id: 'sk-python',
    title: 'Python',
    type: 'SKILL',
    subtitle: 'Data Science & Scientific Computing',
    connections: ['proj-neural-net'],
    pos: [4.2, 0.8, -2.2],
    color: '#ffbd2e',
  },
  {
    id: 'sk-cpp',
    title: 'C++ / Systems',
    type: 'SKILL',
    subtitle: 'High Performance Kernel Systems',
    connections: ['proj-ayush-os'],
    pos: [-1.8, 1.2, 0.5],
    color: '#00d4ff',
  },
  {
    id: 'sk-linux',
    title: 'Linux Kernel',
    type: 'SKILL',
    subtitle: 'POSIX, Memory Management & IPC',
    connections: ['proj-ayush-os', 'proj-linux-lab'],
    pos: [-4.2, -0.5, 0.8],
    color: '#ff3131',
  },
  {
    id: 'sk-threejs',
    title: 'Three.js / WebGL',
    type: 'SKILL',
    subtitle: '3D Spatial Shader Pipeline',
    connections: ['proj-aura-3d'],
    pos: [0.8, 1.8, -3.2],
    color: '#9b59ff',
  },
  {
    id: 'sk-react',
    title: 'React.js',
    type: 'SKILL',
    subtitle: 'Modern Fullstack Frontend Architecture',
    connections: ['proj-aura-3d', 'proj-linux-lab'],
    pos: [-1.2, 0.8, -1.8],
    color: '#00d4ff',
  },
];

const GalaxyStarfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 1800;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 8 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      col[i * 3] = 0.4 + Math.random() * 0.6;
      col[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      col[i * 3 + 2] = 1.0;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.25} vertexColors transparent opacity={0.65} sizeAttenuation />
    </points>
  );
};

const ConstellationScene: React.FC<{
  onSelectNode: (node: ConstellationNode | null) => void;
  selectedNode: ConstellationNode | null;
}> = ({ onSelectNode, selectedNode }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && !selectedNode) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  // Calculate Constellation Beams
  const lines = useMemo(() => {
    const list: { start: THREE.Vector3; end: THREE.Vector3; id: string; isHighlighted: boolean }[] =
      [];
    const pairs = new Set<string>();

    CONSTELLATION_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = CONSTELLATION_NODES.find((n) => n.id === targetId);
        if (target) {
          const key = [node.id, targetId].sort().join('--');
          if (!pairs.has(key)) {
            pairs.add(key);
            const isHighlighted = selectedNode?.id === node.id || selectedNode?.id === targetId;

            list.push({
              start: new THREE.Vector3(...node.pos),
              end: new THREE.Vector3(...target.pos),
              id: key,
              isHighlighted,
            });
          }
        }
      });
    });

    return list;
  }, [selectedNode]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.7} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#00d4ff" />

      {/* Constellation Beams */}
      {lines.map((line) => {
        const geom = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);
        const mat = new THREE.LineBasicMaterial({
          color: line.isHighlighted ? '#00ff88' : '#00d4ff',
          transparent: true,
          opacity: line.isHighlighted ? 0.95 : 0.25,
        });
        const lineObj = new THREE.Line(geom, mat);
        return <primitive key={line.id} object={lineObj} />;
      })}

      {/* Constellation Nodes */}
      {CONSTELLATION_NODES.map((node) => {
        const isSelected = selectedNode?.id === node.id;
        return (
          <group key={node.id} position={node.pos}>
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                soundFx.playClick();
                onSelectNode(node);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                soundFx.playHover();
              }}
            >
              <sphereGeometry args={[node.type === 'PROJECT' ? 0.55 : 0.38, 32, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isSelected ? 3 : 1}
                roughness={0.2}
              />
            </mesh>

            {/* Glowing Ring for Projects */}
            {node.type === 'PROJECT' && (
              <mesh rotation={[Math.PI / 3, 0, 0]}>
                <ringGeometry args={[0.7, 0.8, 32]} />
                <meshBasicMaterial
                  color={node.color}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.5}
                />
              </mesh>
            )}

            {/* Label */}
            <Html distanceFactor={12} center style={{ pointerEvents: 'none', userSelect: 'none' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: node.type === 'PROJECT' ? '12px' : '10px',
                  fontWeight: 700,
                  color: isSelected ? '#00ff88' : '#ffffff',
                  background: isSelected ? 'rgba(0, 255, 136, 0.2)' : 'rgba(2, 6, 16, 0.85)',
                  border: `1px solid ${isSelected ? '#00ff88' : node.color}`,
                  padding: '4px 10px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 0 15px #00ff88' : 'none',
                }}
              >
                <span style={{ fontSize: '9px', opacity: 0.7, marginRight: '4px' }}>
                  [{node.type}]
                </span>
                {node.title}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

export const ConstellationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99995,
        background: 'rgba(2, 6, 16, 0.94)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Controls Bar */}
      <header
        style={{
          height: '56px',
          padding: '0 24px',
          background: 'rgba(4, 10, 22, 0.85)',
          borderBottom: '1px solid var(--border, rgba(0, 212, 255, 0.25))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
          fontFamily: 'var(--font-mono, monospace)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '20px' }}>🛰️</span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: 'var(--aura-color, #00d4ff)',
            }}
          >
            3D_PROJECT_CONSTELLATION_GALAXY_MAP
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text2, #888)' }}>
            [ CLICK & DRAG TO ROTATE 3D STAR MAP ]
          </span>
          <button
            onClick={() => {
              soundFx.playHudClick();
              onClose();
            }}
            className="hud-action-btn"
            style={{
              padding: '6px 16px',
              borderRadius: '16px',
              background: 'rgba(255, 85, 85, 0.15)',
              border: '1px solid #ff5555',
              color: '#ff5555',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✕ EXIT CONSTELLATION
          </button>
        </div>
      </header>

      {/* Main 3D Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [0, 0, 9], fov: 55 }} gl={{ antialias: true, alpha: true }}>
          <OrbitControls enableZoom enableRotate autoRotate={!selectedNode} autoRotateSpeed={0.4} />
          <GalaxyStarfield />
          <ConstellationScene
            selectedNode={selectedNode}
            onSelectNode={(n) => setSelectedNode(n)}
          />
        </Canvas>

        {/* Selected Station Glass Card Detail Popup */}
        {selectedNode && (
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '480px',
              background: 'rgba(4, 12, 26, 0.92)',
              border: `1.5px solid ${selectedNode.color}`,
              borderRadius: '16px',
              padding: '20px',
              backdropFilter: 'blur(16px)',
              boxShadow: `0 10px 40px rgba(0,0,0,0.8), 0 0 25px ${selectedNode.color}40`,
              fontFamily: 'var(--font-mono, monospace)',
              animation: 'fadeIn 0.2s ease-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '10px',
                    color: selectedNode.color,
                    fontWeight: 700,
                    letterSpacing: '1px',
                  }}
                >
                  [{selectedNode.type}_NODE]
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '16px', color: '#ffffff' }}>
                  {selectedNode.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#888',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: '12px',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.5',
              }}
            >
              {selectedNode.subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
