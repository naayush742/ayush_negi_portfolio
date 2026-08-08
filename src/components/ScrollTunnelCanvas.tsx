import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useLenis } from '@lenis/react';
import * as THREE from 'three';

import { Hero } from './Hero';
import { StatsBar } from './StatsBar';
import { AboutSection } from './AboutSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { ContactSection } from './ContactSection';

// ─── 3D SPATIAL STATION (DISTANCE FOCAL VISIBILITY & FADING) ───
interface SpatialStationProps {
  id: string;
  pos: THREE.Vector3;
  t: number;
  scrollProgressRef: React.MutableRefObject<number>;
  distanceFactor: number;
  comp: React.ReactNode;
}

const SpatialStation: React.FC<SpatialStationProps> = ({
  pos,
  t,
  scrollProgressRef,
  distanceFactor,
  comp,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useFrame(() => {
    if (!containerRef.current) return;
    const currentT = scrollProgressRef.current;
    const tDelta = Math.abs(currentT - t);

    // Dynamic focal depth thresholding
    let opacity = 0;
    if (t === 0.12 && currentT <= 0.14) {
      opacity = 1;
    } else if (tDelta <= 0.08) {
      opacity = 1;
    } else if (tDelta <= 0.15) {
      const norm = (tDelta - 0.08) / 0.07;
      opacity = Math.max(0, 1 - norm);
    } else {
      opacity = 0;
    }

    containerRef.current.style.opacity = opacity.toFixed(3);
    containerRef.current.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
    containerRef.current.style.visibility = opacity > 0.01 ? 'visible' : 'hidden';
    containerRef.current.style.transform = `scale(${0.95 + opacity * 0.05})`;
  });

  return (
    <group position={pos}>
      <Html
        transform
        sprite
        center
        distanceFactor={distanceFactor}
        zIndexRange={[100, 0]}
        style={{
          width: '90vw',
          maxWidth: '1200px',
        }}
      >
        <div
          ref={containerRef}
          className="tunnel-3d-card"
          style={{
            position: 'relative',
            willChange: 'opacity, transform',
          }}
        >
          {comp}
        </div>
      </Html>
    </group>
  );
};

// ─── 3D SPATIAL SCENE ───
const SpatialScene: React.FC = () => {
  const { camera, mouse } = useThree();
  const scrollProgressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);

  // Dynamic Theme Color state
  const [themeColor, setThemeColor] = useState<string>('#00d4ff');

  // Read Lenis scroll progress smoothly
  useLenis(({ progress }) => {
    targetProgressRef.current = progress;
  });

  // Dynamic Aura Theme Color tracking
  useEffect(() => {
    const updateThemeColor = () => {
      const col = getComputedStyle(document.documentElement)
        .getPropertyValue('--aura-color')
        .trim();
      if (col) setThemeColor(col);
    };

    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  // 1. Generate 3D Path Trajectory down depth
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const numPoints = 100;
    const totalDepth = 380; // Total 3D travel distance

    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const z = -t * totalDepth;
      const x = Math.sin(t * Math.PI * 4) * 8;
      const y = Math.cos(t * Math.PI * 3) * 5;
      points.push(new THREE.Vector3(x, y, z));
    }

    return new THREE.CatmullRomCurve3(points);
  }, []);

  // 2. Sections 3D Spatial Positions along path
  const spatialSections = useMemo(() => {
    const sections = [
      { id: 'hero', t: 0.12, distanceFactor: 20, comp: <Hero /> },
      { id: 'stats', t: 0.24, distanceFactor: 18, comp: <StatsBar /> },
      { id: 'about', t: 0.36, distanceFactor: 18, comp: <AboutSection /> },
      { id: 'skills', t: 0.5, distanceFactor: 18, comp: <SkillsSection /> },
      { id: 'projects', t: 0.64, distanceFactor: 18, comp: <ProjectsSection /> },
      { id: 'experience', t: 0.76, distanceFactor: 18, comp: <ExperienceSection /> },
      { id: 'education', t: 0.86, distanceFactor: 18, comp: <EducationSection /> },
      { id: 'contact', t: 0.94, distanceFactor: 18, comp: <ContactSection /> },
    ];

    return sections.map((sec) => {
      const pos = curve.getPointAt(sec.t);
      return {
        ...sec,
        pos,
      };
    });
  }, [curve]);

  // Frame Loop (Camera trajectory motion down 3D tunnel depth)
  useFrame(() => {
    scrollProgressRef.current = THREE.MathUtils.lerp(
      scrollProgressRef.current,
      targetProgressRef.current,
      0.08
    );

    const currentT = Math.max(0, Math.min(0.998, scrollProgressRef.current));

    // Get current 3D position on flight road
    const camPos = curve.getPointAt(currentT);
    const lookAtPos = curve.getPointAt(Math.min(currentT + 0.03, 0.999));

    // Mouse Parallax reaction
    const mouseX = (mouse.x * 2 - camera.position.x) * 0.04;
    const mouseY = (mouse.y * 1.5 - camera.position.y) * 0.04;

    const startZOffset = Math.max(0, (0.12 - currentT) * 200);

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, camPos.x + mouseX, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, camPos.y + mouseY, 0.1);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, camPos.z + startZOffset + 4.5, 0.1);

    camera.lookAt(lookAtPos.x + mouseX * 0.5, lookAtPos.y + mouseY * 0.5, lookAtPos.z);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 20, 10]} intensity={1.2} />
      <pointLight position={[0, 0, -20]} intensity={2.5} color={themeColor} />

      {/* 3D Spatial Content Stations */}
      {spatialSections.map((sec) => (
        <SpatialStation
          key={sec.id}
          id={sec.id}
          pos={sec.pos}
          t={sec.t}
          scrollProgressRef={scrollProgressRef}
          distanceFactor={sec.distanceFactor || 18}
          comp={sec.comp}
        />
      ))}
    </>
  );
};

// ─── CANVAS CONTAINER WRAPPER ───
export const ScrollTunnelCanvas: React.FC = () => {
  return (
    <div
      id="scroll-tunnel-wrap"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 32], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <SpatialScene />
      </Canvas>
    </div>
  );
};

export default ScrollTunnelCanvas;
