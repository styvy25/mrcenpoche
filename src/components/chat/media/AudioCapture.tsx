
import React from "react";
import { Mic } from "lucide-react";

interface AudioCaptureProps {
  isCapturing: boolean;
  previewUrl: string | null;
}

const AudioCapture: React.FC<AudioCaptureProps> = ({ isCapturing, previewUrl }) => {
  if (previewUrl) {
    return (
      <div className="w-full flex flex-col items-center py-4">
        <div className="bg-gray-700 p-4 rounded-full mb-4">
          <Mic size={32} className="text-gray-300" />
        </div>
        <audio src={previewUrl} controls className="w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`mb-4 p-4 rounded-full ${isCapturing ? 'bg-red-500/20 animate-pulse' : 'bg-gray-700'}`}>
        <Mic size={32} className={isCapturing ? 'text-red-500' : 'text-gray-300'} />
      </div>
      <p className="text-gray-300 mb-2">
        {isCapturing ? 'Enregistrement en cours...' : 'Prêt à enregistrer'}
      </p>
    </div>
  );
};

export default AudioCapture;
