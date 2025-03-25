
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const RecordingStatusSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`py-4 ${isMobile ? 'mobile-padding' : ''}`}>
      <div className="flex items-center gap-2 text-red-500 mb-4">
        <div className="w-3 h-3 bg-red-500 animate-pulse rounded-full"></div>
        <span className={isMobile ? 'mobile-text-sm' : ''}>Enregistrement en cours</span>
      </div>
      <p className={`text-sm text-gray-500 ${isMobile ? 'mobile-text-sm' : ''}`}>
        L'application enregistre discrètement en arrière-plan. Vous pouvez 
        fermer cette fenêtre, mais l'enregistrement continuera.
      </p>
      {isMobile && (
        <p className="text-xs text-gray-400 mt-2">
          Note: En mode mobile, l'enregistrement s'arrête si l'application est mise en arrière-plan.
        </p>
      )}
    </div>
  );
};

export default RecordingStatusSection;
