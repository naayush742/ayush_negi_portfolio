import React, { useEffect, useState } from 'react';

interface ClickSpark {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [sparks, setSparks] = useState<ClickSpark[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('tc') ||
          target.classList.contains('mat-card') ||
          target.classList.contains('fpill') ||
          target.classList.contains('t-node'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const newSpark = { id: Date.now() + Math.random(), x: e.clientX, y: e.clientY };
      setSparks((prev) => [...prev, newSpark]);
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
      }, 700);
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'mousemove') {
        setPos({ x: e.data.x, y: e.data.y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <>
      <div
        id="cursor"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '18px' : '10px',
          height: isHovered ? '18px' : '10px',
          background: isHovered ? 'var(--cyan)' : 'var(--green)',
        }}
      />
      <div
        id="cursor-ring"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? '56px' : '36px',
          height: isHovered ? '56px' : '36px',
          borderColor: isHovered ? 'var(--cyan)' : 'rgba(0, 255, 136, 0.5)',
        }}
      />

      {/* CLICK NEON SPARK RIPPLES */}
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="click-spark"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
          }}
        />
      ))}
    </>
  );
};
