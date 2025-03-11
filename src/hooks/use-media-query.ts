
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string = "(max-width: 768px)"): { isMobile: boolean } {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [query]);

  return { isMobile };
}
