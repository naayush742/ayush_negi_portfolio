import React, { useEffect, useRef } from 'react';

interface DataPacket {
  x: number;
  y: number;
  speed: number;
  text: string;
  opacity: number;
  size: number;
}

interface TechNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  baseX: number;
  baseY: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface CloudPuff {
  dx: number;
  dy: number;
  r: number;
  alphaMult: number;
}

interface Cloud3D {
  x: number;
  y: number;
  z: number; // 3D depth depth coordinate (50 to 500)
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  puffs: CloudPuff[];
  pulse: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mousePos = { x: -1000, y: -1000 };
    const shockwaves: Shockwave[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleClick = (e: MouseEvent) => {
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 5,
        maxRadius: 220,
        alpha: 1,
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Tech keywords for data rain streams
    const techWords = [
      '01', '10', 'AWS', 'DOCKER', 'K8S', 'DEVOPS', 'MANET', 'WEBRTC',
      'PWA', 'FLUTTER', 'SQLITE', 'PYTHON', 'REST', 'CI/CD', 'TERRAFORM',
      'SYSTEM_OK', 'TELEMETRY', 'SYNC', 'NODE_ONLINE', '0101', '1100'
    ];

    // Data packets (matrix rain / streaming code)
    const packetCount = Math.min(Math.floor(width / 32), 50);
    const packets: DataPacket[] = Array.from({ length: packetCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 1.4 + 0.6,
      text: techWords[Math.floor(Math.random() * techWords.length)],
      opacity: Math.random() * 0.7 + 0.25,
      size: Math.floor(Math.random() * 4) + 10,
    }));

    // Interactive tech network nodes
    const nodeCount = Math.min(Math.floor((width * height) / 14000), 70);
    const nodes: TechNode[] = Array.from({ length: nodeCount }, () => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      return {
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.2 + 1,
        pulse: Math.random() * Math.PI * 2,
        baseX: rx,
        baseY: ry,
      };
    });

    // Generate 3D Atmospheric Clouds
    const cloudCount = Math.min(Math.floor(width / 160), 12);
    const clouds: Cloud3D[] = Array.from({ length: cloudCount }, () => {
      const puffCount = Math.floor(Math.random() * 5) + 6;
      const puffs: CloudPuff[] = [];
      const baseRadius = Math.random() * 90 + 120;
      for (let p = 0; p < puffCount; p++) {
        puffs.push({
          dx: (Math.random() - 0.5) * baseRadius * 1.2,
          dy: (Math.random() - 0.5) * baseRadius * 0.6,
          r: baseRadius * (Math.random() * 0.5 + 0.6),
          alphaMult: Math.random() * 0.4 + 0.6,
        });
      }

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 350 + 50, // 3D depth from 50 (front) to 400 (back)
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.2,
        radius: baseRadius,
        alpha: Math.random() * 0.12 + 0.08,
        puffs,
        pulse: Math.random() * Math.PI * 2,
      };
    });

    // Convert hex to rgb for opacity handling
    const hexToRgb = (hex: string) => {
      let cleanHex = hex.trim().replace('#', '');
      if (cleanHex.length === 3) {
        cleanHex = cleanHex.split('').map((c) => c + c).join('');
      }
      const num = parseInt(cleanHex, 16);
      if (isNaN(num)) return '0, 212, 255';
      return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Get current dynamic aura theme color
      const rawColor = getComputedStyle(document.documentElement).getPropertyValue('--aura-color') || '#00d4ff';
      const rgbColor = hexToRgb(rawColor);

      // 1. Draw Perspective Cyberpunk Grid Lines
      ctx.strokeStyle = `rgba(${rgbColor}, 0.035)`;
      ctx.lineWidth = 1;
      const gridSize = 55;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render 3D Interactive Atmospheric Clouds
      // Sort clouds by 3D depth z descending (render farthest depth first)
      clouds.sort((a, b) => b.z - a.z);

      const focalLength = 300;
      const mouseParallaxX = ((mousePos.x - width / 2) / width) * 45;
      const mouseParallaxY = ((mousePos.y - height / 2) / height) * 45;

      for (let c = 0; c < clouds.length; c++) {
        const cloud = clouds[c];
        cloud.pulse += 0.008;

        // Move cloud gradually
        cloud.x += cloud.vx;
        cloud.y += cloud.vy;

        // Wrap around screen boundaries
        if (cloud.x < -cloud.radius * 2) cloud.x = width + cloud.radius * 2;
        if (cloud.x > width + cloud.radius * 2) cloud.x = -cloud.radius * 2;
        if (cloud.y < -cloud.radius * 2) cloud.y = height + cloud.radius * 2;
        if (cloud.y > height + cloud.radius * 2) cloud.y = -cloud.radius * 2;

        // 3D Perspective Scale & Parallax Projection
        const scale = focalLength / (focalLength + cloud.z);
        const parallaxDepthFactor = (400 - cloud.z) / 400;

        const screenX = cloud.x + mouseParallaxX * parallaxDepthFactor;
        const screenY = cloud.y + mouseParallaxY * parallaxDepthFactor;

        // Mouse Repulsion & Dynamic Wind Interaction
        const mdx = mousePos.x - screenX;
        const mdy = mousePos.y - screenY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const maxInteractDist = 280 * scale;

        if (mdist < maxInteractDist && mdist > 2) {
          const force = (1 - mdist / maxInteractDist) * 1.8;
          cloud.x -= (mdx / mdist) * force * scale * 2.5;
          cloud.y -= (mdy / mdist) * force * scale * 2.5;
        }

        // Click Shockwave Push on 3D Clouds
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = screenX - sw.x;
          const sdy = screenY - sw.y;
          const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
          if (Math.abs(sdist - sw.radius) < 70 && sdist > 2) {
            const push = (1 - Math.abs(sdist - sw.radius) / 70) * sw.alpha * 4.5;
            cloud.x += (sdx / sdist) * push;
            cloud.y += (sdy / sdist) * push;
          }
        }

        // Render Volumetric Soft Cloud Puffs
        const cloudAlpha = cloud.alpha * (0.85 + Math.sin(cloud.pulse) * 0.15) * scale;

        for (let p = 0; p < cloud.puffs.length; p++) {
          const puff = cloud.puffs[p];
          const px = screenX + puff.dx * scale;
          const py = screenY + puff.dy * scale;
          const pradius = puff.r * scale;

          if (pradius <= 1) continue;

          // Soft volumetric radial gradient blending with background
          const grad = ctx.createRadialGradient(px, py, 0, px, py, pradius);
          const alpha1 = Math.min(cloudAlpha * puff.alphaMult * 0.14, 0.25);
          const alpha2 = Math.min(cloudAlpha * puff.alphaMult * 0.05, 0.1);

          grad.addColorStop(0, `rgba(${rgbColor}, ${alpha1})`);
          grad.addColorStop(0.5, `rgba(${rgbColor}, ${alpha2})`);
          grad.addColorStop(1, `rgba(${rgbColor}, 0)`);

          ctx.beginPath();
          ctx.arc(px, py, pradius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      // 3. Render Interactive Click Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 5;
        sw.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgbColor}, ${Math.max(0, sw.alpha)})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = rawColor;
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // 4. Render Animated Data Packets (Tech Matrix Rain)
      ctx.font = '10px "JetBrains Mono", monospace';
      for (let i = 0; i < packets.length; i++) {
        const pkt = packets[i];
        pkt.y += pkt.speed;

        if (pkt.y > height + 20) {
          pkt.y = -20;
          pkt.x = Math.random() * width;
          pkt.text = techWords[Math.floor(Math.random() * techWords.length)];
        }

        ctx.fillStyle = `rgba(${rgbColor}, ${pkt.opacity * 0.5})`;
        ctx.fillText(pkt.text, pkt.x, pkt.y);

        // Glow trail behind text
        ctx.fillStyle = `rgba(${rgbColor}, ${pkt.opacity * 0.15})`;
        ctx.fillText(pkt.text, pkt.x, pkt.y - 12);
      }

      // 5. Render Interactive Tech Nodes & Gravitational Cursor Mesh
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.03;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // Gravitational pull toward mouse cursor if within 220px
        const mdx = mousePos.x - n.x;
        const mdy = mousePos.y - n.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 220 && mdist > 5) {
          const force = (220 - mdist) / 220;
          n.x += (mdx / mdist) * force * 1.5;
          n.y += (mdy / mdist) * force * 1.5;
        }

        const currentRadius = n.radius + Math.sin(n.pulse) * 0.8;

        // Node glow dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(currentRadius, 0.5), 0, Math.PI * 2);
        ctx.fillStyle = mdist < 180 ? rawColor : `rgba(${rgbColor}, 0.75)`;
        ctx.shadowBlur = mdist < 180 ? 15 : 8;
        ctx.shadowColor = rawColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect node to mouse cursor if nearby
        if (mdist < 200) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mousePos.x, mousePos.y);
          const alpha = 0.55 * (1 - mdist / 200);
          ctx.strokeStyle = `rgba(${rgbColor}, ${alpha})`;
          ctx.lineWidth = 1.4;
          ctx.shadowBlur = 8;
          ctx.shadowColor = rawColor;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Connect nodes to neighboring nodes (Quantum Circuit lines)
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n.x - n2.x;
          const dy = n.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            const lineAlpha = 0.25 * (1 - dist / 140);
            ctx.strokeStyle = `rgba(${rgbColor}, ${lineAlpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="particles-canvas" ref={canvasRef} />;
};

