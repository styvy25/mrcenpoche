
import { useState, useEffect } from 'react';

// Standard device breakpoints (following industry standards)
export const DEVICE_SIZES = {
  xs: 320,   // iPhone SE, small phones
  sm: 375,   // iPhone X/11/12/13, average small phones
  md: 390,   // iPhone 12/13 Pro, larger phones
  lg: 414,   // iPhone 8 Plus, larger phones
  xl: 428,   // iPhone Pro Max, largest phones
  tablet: 768, // iPad Mini, iPad
  laptop: 1024, // iPad Pro, small laptops
  desktop: 1280, // Desktop
};

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  isLargeScreen: boolean;
  isTouchDevice: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceType: 'desktop',
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    orientation: 'portrait',
    isLargeScreen: true,
    isTouchDevice: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = height > width ? 'portrait' : 'landscape';
      
      // Determine device type based on width
      const isMobile = width < DEVICE_SIZES.tablet;
      const isTablet = width >= DEVICE_SIZES.tablet && width < DEVICE_SIZES.desktop;
      const isDesktop = width >= DEVICE_SIZES.desktop;
      
      // Determine device type
      let deviceType: DeviceType = 'desktop';
      if (isMobile) deviceType = 'mobile';
      else if (isTablet) deviceType = 'tablet';
      
      // Check if touch is available
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        deviceType,
        width,
        height,
        orientation,
        isLargeScreen: width >= DEVICE_SIZES.xl,
        isTouchDevice,
      });
    };

    // Set initial values
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceInfo;
}

export default useDeviceDetect;
