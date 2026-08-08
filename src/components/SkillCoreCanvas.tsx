import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { soundFx } from '../utils/audioEffects';

interface SkillNodeData {
  id: string;
  name: string;
  category: string;
  level: string;
  connections: string[];
  pos: [number, number, number];
}

const SKILL_NODES: SkillNodeData[] = [
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI/ML',
    level: '92%',
    connections: ['python', 'cuda', 'react'],
    pos: [0, 2.2, 0],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'AI/ML',
    level: '95%',
    connections: ['pytorch', 'cuda', 'postgres'],
    pos: [-2.2, 1.2, 1.2],
  },
  {
    id: 'cuda',
    name: 'CUDA / C++',
    category: 'Core Systems',
    level: '88%',
    connections: ['pytorch', 'python', 'linux'],
    pos: [2.2, 1.2, -1.2],
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'Frontend',
    level: '96%',
    connections: ['typescript', 'threejs', 'pytorch'],
    pos: [-2.8, -0.8, 0.8],
  },
  {
    id: 'threejs',
    name: 'Three.js / R3F',
    category: '3D Graphics',
    level: '94%',
    connections: ['react', 'typescript'],
    pos: [0, -2.2, 0.5],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    level: '92%',
    connections: ['react', 'threejs', 'nodejs'],
    pos: [2.8, -0.8, 0.8],
  },
  {
    id: 'linux',
    name: 'Linux Kernel',
    category: 'DevOps/Core',
    level: '90%',
    connections: ['cuda', 'docker', 'nodejs'],
    pos: [1.8, 0.2, 2.2],
  },
  {
    id: 'docker',
    name: 'Docker / K8s',
    category: 'Cloud',
    level: '86%',
    connections: ['linux', 'nodejs', 'postgres'],
    pos: [-1.8, 0.2, -2.2],
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    level: '90%',
    connections: ['typescript', 'docker', 'postgres'],
    pos: [0, 0, -2.8],
  },
  {
    id: 'postgres',
    name: 'PostgreSQL',
    category: 'Database',
    level: '88%',
    connections: ['python', 'docker', 'nodejs'],
    pos: [0, 0, 2.8],
  },
];

const SkillNodeItem: React.FC<{
  node: SkillNodeData;
  activeId: string | null;
  onHover: (id: string | null) => void;
}> = ({ node, activeId, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = activeId === node.id;
  const isConnected = useMemo(() => {
    if (!activeId) return false;
    const activeNode = SKILL_NODES.find((n) => n.id === activeId);
    return activeNode ? activeNode.connections.includes(node.id) : false;
  }, [activeId, node.id]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + node.pos[0];
    meshRef.current.position.y = node.pos[1] + Math.sin(t * 1.5) * 0.15;
  });

  const nodeColor = isHovered ? '#00ff88' : isConnected ? '#00d4ff' : '#4a80ff';

  return (
    <group position={node.pos}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          soundFx.playSkillsClick();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.38, 24, 24]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isHovered ? 2.5 : isConnected ? 1.2 : 0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Outer Pulse Ring when Hovered */}
      {isHovered && (
        <mesh>
          <ringGeometry args={[0.5, 0.58, 32]} />
          <meshBasicMaterial color="#00ff88" side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}

      {/* Floating Holographic Skill Name Tag */}
      <Html
        distanceFactor={10}
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '11px',
            fontWeight: 700,
            color: isHovered ? '#00ff88' : isConnected ? '#00d4ff' : 'rgba(255, 255, 255, 0.85)',
            background: isHovered ? 'rgba(0, 255, 136, 0.18)' : 'rgba(2, 8, 20, 0.85)',
            border: `1px solid ${isHovered ? '#00ff88' : isConnected ? '#00d4ff' : 'rgba(255, 255, 255, 0.2)'}`,
            padding: '3px 8px',
            borderRadius: '6px',
            backdropFilter: 'blur(6px)',
            boxShadow: isHovered ? '0 0 15px #00ff88' : 'none',
            transform: `scale(${isHovered ? 1.15 : 1})`,
            transition: 'all 0.15s ease',
          }}
        >
          {node.name}
          {isHovered && <span style={{ marginLeft: '6px', color: '#00ff88' }}>[{node.level}]</span>}
        </div>
      </Html>
    </group>
  );
};

const SkillCoreScene: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Slow continuous rotation of the 3D Skill Core
  useFrame(({ clock }) => {
    if (groupRef.current && !activeId) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.12;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.08) * 0.1;
    }
  });

  // Calculate Laser Connection Lines between related skills
  const lines = useMemo(() => {
    const lineList: { start: THREE.Vector3; end: THREE.Vector3; id: string; active: boolean }[] =
      [];
    const createdPairs = new Set<string>();

    SKILL_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const targetNode = SKILL_NODES.find((n) => n.id === targetId);
        if (targetNode) {
          const pairKey = [node.id, targetId].sort().join('--');
          if (!createdPairs.has(pairKey)) {
            createdPairs.add(pairKey);
            const isLineActive = activeId === node.id || activeId === targetId;
            lineList.push({
              start: new THREE.Vector3(...node.pos),
              end: new THREE.Vector3(...targetNode.pos),
              id: pairKey,
              active: isLineActive,
            });
          }
        }
      });
    });

    return lineList;
  }, [activeId]);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#00d4ff" distance={10} />

      {/* Core Energy Center Sphere */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={2} wireframe />
      </mesh>

      {/* Laser Energy Beams Connecting Related Skills */}
      {lines.map((line) => {
        const geom = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);
        const mat = new THREE.LineBasicMaterial({
          color: line.active ? '#00ff88' : '#00d4ff',
          transparent: true,
          opacity: line.active ? 0.9 : 0.25,
        });
        const lineObj = new THREE.Line(geom, mat);
        return <primitive key={line.id} object={lineObj} />;
      })}

      {/* 3D Skill Nodes */}
      {SKILL_NODES.map((node) => (
        <SkillNodeItem
          key={node.id}
          node={node}
          activeId={activeId}
          onHover={(id) => setActiveId(id)}
        />
      ))}
    </group>
  );
};

export const SkillCoreCanvas: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'rgba(2, 6, 16, 0.65)',
        border: '1px solid var(--border, rgba(0, 212, 255, 0.25))',
        boxShadow: 'inset 0 0 30px rgba(0, 212, 255, 0.1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '14px',
          left: '18px',
          zIndex: 10,
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '11px',
          color: 'var(--aura-color, #00d4ff)',
          letterSpacing: '1.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#00ff88',
            boxShadow: '0 0 8px #00ff88',
          }}
        />
        <span>3D_NEURAL_SKILL_REACTOR // HOVER NODE TO INSPECT FORCE-FIELD</span>
      </div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <SkillCoreScene />
      </Canvas>
    </div>
  );
};
