/**
 * usePrefersReducedMotion: tracks the OS level reduced motion setting.
 * @returns {boolean} true when the user asked for reduced motion
 */
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

export default function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;

    const mql = window.matchMedia(QUERY);
    const update = () => setPrefersReduced(mql.matches);

    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  return prefersReduced;
}
