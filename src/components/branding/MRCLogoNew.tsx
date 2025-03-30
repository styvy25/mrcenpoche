
import React from 'react';

interface MRCLogoNewProps {
  className?: string;
  width?: number;
  height?: number;
}

const MRCLogoNew: React.FC<MRCLogoNewProps> = ({ 
  className = '', 
  width = 40, 
  height = 40 
}) => {
  return (
    <img 
      src="/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png" 
      alt="MRC Logo" 
      width={width} 
      height={height} 
      className={`${className}`} 
    />
  );
};

export default MRCLogoNew;
