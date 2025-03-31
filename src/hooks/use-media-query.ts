
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): { 
  matches: boolean;
  isMobile: boolean;
} {
  const [matches, setMatches] = useState<boolean>(() => {
    // Check on the client side only
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const mediaQuery = window.matchMedia(query);
    
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Add the listener
    mediaQuery.addEventListener("change", handleChange);
    
    // Set the initial state
    setMatches(mediaQuery.matches);
    
    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  // Provide a convenience flag for mobile devices
  const isMobile = matches;

  return { matches, isMobile };
}
