
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Camera, CameraOff, X } from "lucide-react";

interface VideoControlsProps {
  isMicOn: boolean;
  isCameraOn: boolean;
  isScreenSharing: boolean;
  onToggleMicrophone: () => void;
  onToggleCamera: () => void;
  onToggleScreenSharing: () => void;
  onEndMeeting: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isMicOn,
  isCameraOn,
  isScreenSharing,
  onToggleMicrophone,
  onToggleCamera,
  onToggleScreenSharing,
  onEndMeeting
}) => {
  return (
    <div className="border-t border-gray-800 p-4 flex justify-center">
      <div className="flex gap-3">
        <Button 
          variant={isMicOn ? "default" : "secondary"} 
          size="sm" 
          onClick={onToggleMicrophone}
          className={isMicOn ? "bg-mrc-blue hover:bg-mrc-blue/90 mic-active" : ""}
        >
          {isMicOn ? <Mic size={16} className="mr-2" /> : <MicOff size={16} className="mr-2" />}
          Micro
        </Button>
        <Button 
          variant={isCameraOn ? "default" : "secondary"} 
          size="sm" 
          onClick={onToggleCamera}
          className={isCameraOn ? "bg-mrc-green hover:bg-mrc-green/90 camera-active" : ""}
        >
          {isCameraOn ? <Camera size={16} className="mr-2" /> : <CameraOff size={16} className="mr-2" />}
          Caméra
        </Button>
        <Button 
          variant={isScreenSharing ? "destructive" : "outline"} 
          size="sm" 
          onClick={onToggleScreenSharing}
        >
          <span className="mr-2">🖥️</span>
          {isScreenSharing ? "Arrêter" : "Partager l'écran"}
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          className="ml-2" 
          onClick={onEndMeeting}
        >
          <X size={16} className="mr-2" />
          Quitter
        </Button>
      </div>
    </div>
  );
};

export default VideoControls;
