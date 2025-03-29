
import React from 'react';

interface MRCLogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white' | 'dark';
  withTagline?: boolean;
}

const MRCLogo: React.FC<MRCLogoProps> = ({ 
  size = 'medium', 
  variant = 'default',
  withTagline = false
}) => {
  // Set the logo size based on the size prop
  let containerClass = 'flex items-center';
  let logoSizeClass = 'text-2xl';
  let taglineClass = 'text-xs';
  
  if (size === 'small') {
    logoSizeClass = 'text-xl';
    taglineClass = 'text-[10px]';
  } else if (size === 'large') {
    logoSizeClass = 'text-4xl';
    taglineClass = 'text-sm';
  }
  
  // Set colors based on variant
  let logoClass = 'font-bold';
  let accentColor = 'text-blue-600';
  let textColor = 'text-gray-800 dark:text-white';
  let taglineColor = 'text-gray-600 dark:text-gray-300';
  
  if (variant === 'white') {
    textColor = 'text-white';
    accentColor = 'text-blue-300';
    taglineColor = 'text-gray-200';
  } else if (variant === 'dark') {
    textColor = 'text-gray-800';
    accentColor = 'text-blue-700';
    taglineColor = 'text-gray-600';
  }
  
  return (
    <div className={containerClass}>
      <div className="flex flex-col">
        <span className={`${logoClass} ${logoSizeClass} ${textColor} tracking-tight`}>
          MRC<span className={accentColor}>+</span>
        </span>
        {withTagline && (
          <span className={`${taglineClass} ${taglineColor} font-normal -mt-1`}>
            En Poche
          </span>
        )}
      </div>
    </div>
  );
};

export default MRCLogo;
