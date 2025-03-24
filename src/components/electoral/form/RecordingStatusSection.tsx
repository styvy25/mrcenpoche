
import React from 'react';

const RecordingStatusSection = () => {
  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-red-500 mb-4">
        <div className="w-3 h-3 bg-red-500 animate-pulse rounded-full"></div>
        <span>Enregistrement en cours</span>
      </div>
      <p className="text-sm text-gray-500">
        L'application enregistre discrètement en arrière-plan. Vous pouvez 
        fermer cette fenêtre, mais l'enregistrement continuera.
      </p>
    </div>
  );
};

export default RecordingStatusSection;
