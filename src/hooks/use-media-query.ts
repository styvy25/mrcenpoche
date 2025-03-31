
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string = "(max-width: 768px)"): { isMobile: boolean } {
  const [matches, setMatches] = useState(
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    const handleResize = () => {
      setMatches(mediaQuery.matches);
    };

    // Initial check
    handleResize();
    
    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize);
    } else {
      // For older browsers
      mediaQuery.addListener(handleResize);
    }
    
    // Clean up
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize);
      } else {
        // For older browsers
        mediaQuery.removeListener(handleResize);
      }
    };
  }, [query]);

  return { isMobile: matches };
}
