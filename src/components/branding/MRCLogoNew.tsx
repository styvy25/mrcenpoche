
import React from 'react';

interface MRCLogoNewProps {
  className?: string;
  width?: number;
  height?: number;
  size?: 'small' | 'medium' | 'large';
  withTagline?: boolean;
}

const MRCLogoNew: React.FC<MRCLogoNewProps> = ({ 
  className = '', 
  width, 
  height, 
  size = 'medium',
  withTagline = false
}) => {
  // Calculate dimensions based on size prop
  let calculatedWidth = width;
  let calculatedHeight = height;
  
  if (!width || !height) {
    switch (size) {
      case 'small':
        calculatedWidth = 30;
        calculatedHeight = 30;
        break;
      case 'large':
        calculatedWidth = 60;
        calculatedHeight = 60;
        break;
      case 'medium':
      default:
        calculatedWidth = 40;
        calculatedHeight = 40;
        break;
    }
  }
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png" 
        alt="MRC Logo" 
        width={calculatedWidth} 
        height={calculatedHeight} 
        className="object-contain" 
      />
      {withTagline && (
        <span className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-300">
          En Poche
        </span>
      )}
    </div>
  );
};

export default MRCLogoNew;
