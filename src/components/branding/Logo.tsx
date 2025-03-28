
import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'white';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', variant = 'default' }) => {
  // Determine the classNames based on size
  let sizeClass = 'h-8';
  
  if (size === 'small') {
    sizeClass = 'h-6';
  } else if (size === 'large') {
    sizeClass = 'h-12';
  }
  
  // Determine text color based on variant
  const textColor = variant === 'white' ? 'text-white' : 'text-gray-800 dark:text-white';
  const accentColor = variant === 'white' ? 'text-white' : 'text-mrc-blue';

  return (
    <div className="flex items-center">
      <span className={`font-bold text-xl ${textColor}`}>
        MRC<span className={`${accentColor}`}>+</span>
      </span>
    </div>
  );
};

export default Logo;
