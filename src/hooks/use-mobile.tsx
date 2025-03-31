
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Check if window is available (client-side only)
    if (typeof window === "undefined") return;
    
    // Initialize with the current state
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Create a media query for better performance
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Use the modern API
    mql.addEventListener("change", onChange);
    
    // Clean up
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Return false rather than undefined as a fallback
  return isMobile === undefined ? false : isMobile;
}
