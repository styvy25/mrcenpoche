
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Smartphone, X } from 'lucide-react';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

const MobileCompatibilityBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { isMobile, deviceType, width } = useDeviceDetect();
  const [showBanner, setShowBanner] = useState(false);
  
  useEffect(() => {
    // Check if we should show compatibility warning
    const hasWarningBeenShown = localStorage.getItem('mobile-compatibility-shown');
    
    if (!hasWarningBeenShown && isMobile && width < 320) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [isMobile, width]);
  
  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('mobile-compatibility-shown', 'true');
    setShowBanner(false);
  };
  
  if (dismissed || !showBanner) return null;
  
  return (
    <Alert variant="default" className="mb-4 bg-yellow-500/10 border-yellow-500/20">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <Smartphone className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <AlertTitle className="text-yellow-500">
              Appareil de petite taille détecté
            </AlertTitle>
            <AlertDescription className="text-xs mt-1">
              Votre appareil a un écran de taille réduite. Pour une meilleure expérience, basculez en mode paysage ou utilisez un appareil avec un écran plus grand.
            </AlertDescription>
          </div>
        </div>
        <button onClick={handleDismiss} className="text-gray-500 hover:text-gray-700">
          <X className="h-4 w-4" />
        </button>
      </div>
    </Alert>
  );
};

export default MobileCompatibilityBanner;
