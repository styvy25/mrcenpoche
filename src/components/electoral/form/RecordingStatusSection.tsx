
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle, Video, Mic } from "lucide-react";

const RecordingStatusSection: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card className="p-4 border-red-500/30 bg-red-500/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-500 mb-1">Enregistrement en cours</h3>
            <p className="text-sm text-gray-600">
              Votre alerte a été transmise. La caméra et le microphone enregistrent en arrière-plan pour capturer davantage de preuves.
            </p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            <Video className="h-6 w-6 text-red-500" />
          </div>
          <span className="text-xs text-gray-500 text-center">Caméra active</span>
        </div>
        
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            <Mic className="h-6 w-6 text-red-500" />
          </div>
          <span className="text-xs text-gray-500 text-center">Microphone actif</span>
        </div>
      </div>
      
      <p className="text-xs text-gray-500">
        Vous pouvez fermer cette fenêtre. L'enregistrement continuera en arrière-plan jusqu'à ce que vous l'arrêtiez.
      </p>
    </div>
  );
};

export default RecordingStatusSection;
