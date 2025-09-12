/**
 * useDeviceType: returns booleans for responsive rendering.
 * @param {number} [breakpoint=769] - width threshold in pixels
 * @returns {{isDesktop: boolean, isMobile: boolean}}
 */
import { useEffect, useState } from 'react';

// Simple viewport breakpoint detection shared across components.
// Avoids duplicating the same effect logic and ensures consistent behavior.
export default function useDeviceType(breakpoint = 769) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      if (typeof window !== 'undefined') {
        const isWide = window.innerWidth > breakpoint;
        setIsDesktop(isWide);
        setIsMobile(!isWide);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [breakpoint]);

  return { isDesktop, isMobile };
}


