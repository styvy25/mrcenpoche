
import React, { memo } from 'react';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  preventLayoutShift?: boolean;
  mobilePadding?: 'none' | 'small' | 'medium' | 'large';
  mobileCenter?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = memo(({
  children,
  className = "",
  fullWidth = false,
  preventLayoutShift = true,
  mobilePadding = 'medium',
  mobileCenter = false
}) => {
  const { isMobile, deviceType } = useDeviceDetect();
  
  // Determine padding class based on mobilePadding prop
  const getPaddingClass = () => {
    if (isMobile) {
      switch (mobilePadding) {
        case 'none': return 'px-0';
        case 'small': return 'px-2';
        case 'large': return 'px-6';
        default: return 'px-4';
      }
    }
    return fullWidth ? '' : 'px-4';
  };
  
  return (
    <div 
      className={`
        ${fullWidth ? 'w-full' : 'container mx-auto'} 
        ${getPaddingClass()}
        ${className}
        ${preventLayoutShift ? 'min-h-[50vh]' : ''}
        ${mobileCenter && isMobile ? 'text-center' : ''}
        ${isMobile ? 'mobile-optimize' : ''}
      `}
      style={{
        // Prevent content jumping
        contentVisibility: preventLayoutShift ? 'auto' : undefined,
        containIntrinsicSize: preventLayoutShift ? '0 500px' : undefined,
        // Adjust max-width based on device to prevent stretched UI on tablets
        maxWidth: deviceType === 'tablet' ? '700px' : undefined,
      }}
      data-device={deviceType}
    >
      {children}
    </div>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';

export default ResponsiveContainer;
