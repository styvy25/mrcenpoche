
import React, { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface CameraCaptureProps {
  previewUrl: string | null;
  onCapture: () => void;
  onReset: () => void;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  previewUrl,
  onCapture,
  onReset,
  videoRef,
  canvasRef
}) => {
  if (previewUrl) {
    return (
      <div className="flex flex-col items-center justify-center">
        <img src={previewUrl} alt="Captured" className="w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
