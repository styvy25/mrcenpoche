
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
        calculatedWidth = 32;
        calculatedHeight = 32;
        break;
      case 'large':
        calculatedWidth = 64;
        calculatedHeight = 64;
        break;
      case 'medium':
      default:
        calculatedWidth = 48;
        calculatedHeight = 48;
        break;
    }
  }
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img 
        src="/lovable-uploads/cc9f79c8-5602-4c13-adb4-d6ef44e8a7cd.png" 
        alt="CADE-SHARING Logo" 
        width={calculatedWidth} 
        height={calculatedHeight} 
        className="object-contain rounded-md" 
      />
      {withTagline && (
        <span className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-300">
          CADE-SHARING
        </span>
      )}
    </div>
  );
};

export default MRCLogoNew;
