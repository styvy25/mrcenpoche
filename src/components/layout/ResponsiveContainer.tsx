
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({ 
  children, 
  className = ""
}) => {
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  
  return (
    <div className={`w-full px-4 ${isMobile ? 'py-2' : 'py-4 px-6'} ${className}`}>
      {children}
    </div>
  );
};

export default ResponsiveContainer;
