
import React, { memo } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  preventLayoutShift?: boolean;
  padBottom?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = memo(({
  children,
  className = "",
  fullWidth = false,
  preventLayoutShift = true,
  padBottom = true
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <div 
      className={`
        ${fullWidth ? 'w-full' : 'container mx-auto px-4'} 
        ${className}
        ${preventLayoutShift ? 'min-h-[50vh]' : ''}
        ${padBottom ? 'pb-28 sm:pb-20' : ''}
      `}
      style={{
        // Prevent content jumping
        contentVisibility: preventLayoutShift ? 'auto' : undefined,
        containIntrinsicSize: preventLayoutShift ? '0 500px' : undefined,
      }}
    >
      {children}
    </div>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';

export default ResponsiveContainer;
