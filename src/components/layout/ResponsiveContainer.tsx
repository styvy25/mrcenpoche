
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = "",
  fullWidth = false
}) => {
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  
  return (
    <div className={`${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'} ${isMobile ? 'px-3 py-3' : 'px-6 py-4'} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
