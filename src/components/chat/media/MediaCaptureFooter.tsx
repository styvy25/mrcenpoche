
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MediaCaptureFooterProps {
  capturedMedia: Blob | null;
  isCapturing: boolean;
  mode: 'photo' | 'audio';
  onCapture: () => void;
  onReset: () => void;
  onSend: () => Promise<void>;
}

const MediaCaptureFooter: React.FC<MediaCaptureFooterProps> = ({
  capturedMedia,
  isCapturing,
  mode,
  onCapture,
  onReset,
  onSend
}) => {
  if (capturedMedia) {
    return (
      <div className="flex justify-between p-3 border-t border-gray-700">
        <Button
          type="button"
          variant="ghost"
          onClick={onReset}
          className="text-gray-300"
        >
          Reprendre
        </Button>
        <Button
          type="button"
          variant="default"
          onClick={onSend}
          className="bg-mrc-blue text-white hover:bg-mrc-blue/90 flex items-center gap-1"
        >
          <Send size={16} />
          Envoyer
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between p-3 border-t border-gray-700">
      <Button
        type="button"
        variant={isCapturing ? "destructive" : "default"}
        onClick={onCapture}
        className="mx-auto"
      >
        {mode === 'photo' ? (
          'Prendre une photo'
        ) : isCapturing ? (
          'Arrêter l\'enregistrement'
        ) : (
          'Démarrer l\'enregistrement'
        )}
      </Button>
    </div>
  );
};

export default MediaCaptureFooter;
