
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertCircle, Video, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecordingStatusSectionProps {
  mediaType: 'photo' | 'audio';
  onReset: () => void;
}

const RecordingStatusSection: React.FC<RecordingStatusSectionProps> = ({ mediaType, onReset }) => {
  return (
    <div className="space-y-4">
      <Card className="p-4 border-red-500/30 bg-red-500/5">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-500 mb-1">
              {mediaType === 'photo' ? 'Photo capturée' : 'Enregistrement audio'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {mediaType === 'photo' 
                ? 'Votre photo a été capturée et sera jointe à votre alerte.'
                : 'Votre enregistrement audio a été capturé et sera joint à votre alerte.'}
            </p>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
            {mediaType === 'photo' 
              ? <Video className="h-6 w-6 text-red-500" />
              : <Mic className="h-6 w-6 text-red-500" />
            }
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {mediaType === 'photo' ? 'Photo enregistrée' : 'Audio enregistré'}
          </span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        className="w-full border-red-500/30 text-red-500 hover:bg-red-500/10"
        onClick={onReset}
      >
        Effacer et capturer à nouveau
      </Button>
    </div>
  );
};

export default RecordingStatusSection;
