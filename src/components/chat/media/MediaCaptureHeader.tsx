
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, X } from "lucide-react";

interface MediaCaptureHeaderProps {
  mode: 'photo' | 'audio';
  setMode: (mode: 'photo' | 'audio') => void;
  onClose: () => void;
  resetCapture: () => void;
}

const MediaCaptureHeader: React.FC<MediaCaptureHeaderProps> = ({
  mode,
  setMode,
  onClose,
  resetCapture
}) => {
  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-700">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={mode === 'photo' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setMode('photo');
            resetCapture();
          }}
          className="flex items-center gap-1"
        >
          <Camera size={16} />
          Photo
        </Button>
        <Button
          type="button"
          variant={mode === 'audio' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => {
            setMode('audio');
            resetCapture();
          }}
          className="flex items-center gap-1"
        >
          <Mic size={16} />
          Audio
        </Button>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="rounded-full"
      >
        <X size={18} />
      </Button>
    </div>
  );
};

export default MediaCaptureHeader;
