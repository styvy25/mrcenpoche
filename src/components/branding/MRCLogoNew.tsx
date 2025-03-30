
import React from 'react';

interface MRCLogoNewProps {
  size?: 'small' | 'medium' | 'large';
  withTagline?: boolean;
  className?: string;
}

const MRCLogoNew: React.FC<MRCLogoNewProps> = ({ 
  size = 'medium', 
  withTagline = false,
  className = ''
}) => {
  // Définir les tailles en fonction du paramètre size
  let logoClass = 'h-10';
  let containerClass = 'flex items-center';
  
  if (size === 'small') {
    logoClass = 'h-8';
  } else if (size === 'large') {
    logoClass = 'h-16';
  }
  
  return (
    <div className={`${containerClass} ${className}`}>
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/8250b7f1-9a06-448f-ac14-063e4c7dae68.png" 
          alt="MRC Logo" 
          className={`${logoClass} object-contain`}
        />
        {withTagline && (
          <span className="text-xs text-gray-600 dark:text-gray-300 font-normal mt-1">
            En Poche
          </span>
        )}
      </div>
    </div>
  );
};

export default MRCLogoNew;
