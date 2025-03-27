
import React, { useState } from 'react';
import CameraCapture from './media/CameraCapture';
import AudioCapture from './media/AudioCapture';
import MediaCaptureHeader from './media/MediaCaptureHeader';
import MediaCaptureFooter from './media/MediaCaptureFooter';

interface MediaCaptureProps {
  mediaType?: 'photo' | 'audio';
  onCapture: (mediaBlob: Blob, mediaType: 'photo' | 'audio') => Promise<void>;
  onCancel: () => void;
}

const MediaCapture: React.FC<MediaCaptureProps> = ({
  mediaType = 'photo',
  onCapture,
  onCancel
}) => {
  const [mode, setMode] = useState<'photo' | 'audio'>(mediaType);
  const [isCapturing, setIsCapturing] = useState(true);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Reset capture state when changing mode
  const resetCapture = () => {
    setMediaBlob(null);
    setPreviewUrl(null);
    setIsCapturing(true);
  };
  
  // Handle media capture
  const handleCapture = async () => {
    if (mediaBlob) {
      return;
    }
    
    // For camera capture
    if (mode === 'photo' && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          setMediaBlob(blob);
          setPreviewUrl(URL.createObjectURL(blob));
          setIsCapturing(false);
        }
      }, 'image/jpeg', 0.8);
    } 
    // For audio recording
    else if (mode === 'audio' && isCapturing) {
      // Toggle recording state
      setIsCapturing(false);
      // In a real implementation, we would stop the recording here
      // and get the audio blob
    }
  };
  
  // Handle sending captured media
  const handleSend = async () => {
    if (mediaBlob) {
      await onCapture(mediaBlob, mode);
    }
  };
  
  // Handle retaking photo/audio
  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setMediaBlob(null);
    setPreviewUrl(null);
    setIsCapturing(true);
  };
  
  // References for video and canvas elements
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  // Set up camera when component mounts
  React.useEffect(() => {
    if (mode === 'photo' && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error('Error accessing camera:', err));
      
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [mode]);
  
  return (
    <div className="flex flex-col space-y-4">
      <MediaCaptureHeader 
        mode={mode}
        setMode={setMode}
        onClose={onCancel}
        resetCapture={resetCapture}
      />
      
      <div className="relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 aspect-video">
        {mode === 'photo' ? (
          <CameraCapture 
            previewUrl={previewUrl}
            onCapture={handleCapture}
            onReset={handleReset}
            videoRef={videoRef}
            canvasRef={canvasRef}
          />
        ) : (
          <AudioCapture 
            isCapturing={isCapturing}
            previewUrl={previewUrl}
          />
        )}
      </div>
      
      <MediaCaptureFooter 
        mode={mode}
        isCapturing={isCapturing}
        capturedMedia={mediaBlob}
        onCapture={handleCapture}
        onReset={handleReset}
        onSend={handleSend}
      />
    </div>
  );
};

export default MediaCapture;
