
import React from 'react';

interface MRCLogoNewProps {
  className?: string;
  width?: number;
  height?: number;
  size?: 'small' | 'medium' | 'large';
  withTagline?: boolean;
}

const MRCLogoNew: React.FC<MRCLogoNewProps> = ({ className, width, height, size = 'medium', withTagline = false }) => {
  let sizeValues = {
    width: width,
    height: height
  };

  if (!width && !height) {
    switch (size) {
      case 'small':
        sizeValues = { width: 40, height: 40 };
        break;
      case 'medium':
        sizeValues = { width: 80, height: 80 };
        break;
      case 'large':
        sizeValues = { width: 120, height: 120 };
        break;
    }
  }

  return (
    <div className={`flex flex-col items-center ${className || ''}`}>
      <img
        src="/assets/mrc-logo.png"
        alt="MRC Logo"
        width={sizeValues.width}
        height={sizeValues.height}
        className="object-contain"
      />
      {withTagline && (
        <p className="text-xs mt-1 text-muted-foreground">Cameroun Renaissance</p>
      )}
    </div>
  );
};

export default MRCLogoNew;
