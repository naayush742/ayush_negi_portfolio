import React, { useState } from 'react';
import { useLenis } from '@lenis/react';

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useLenis(({ progress }) => {
    setScrollPercent(progress * 100);
  });

  return <div id="scroll-progress" style={{ width: `${scrollPercent}%` }} />;
};
