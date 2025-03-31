
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): { 
  matches: boolean;
  isMobile: boolean;
} {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    // Initialize with the current match state
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);
    
    // Set up the listener
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Modern API
    mediaQuery.addEventListener("change", handleChange);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  // Determine if it's mobile based on the query
  const isMobile = matches;

  return { matches, isMobile };
}
