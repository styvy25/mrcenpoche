
import React, { useState } from 'react';
import CameraCapture from './media/CameraCapture';
import AudioCapture from './media/AudioCapture';
import MediaCaptureHeader from './media/MediaCaptureHeader';
import MediaCaptureFooter from './media/MediaCaptureFooter';

interface MediaCaptureProps {
  mediaType: 'photo' | 'audio';
  onCapture: (mediaBlob: Blob, mediaType: 'photo' | 'audio') => Promise<void>;
  onCancel: () => void;
}

const MediaCapture: React.FC<MediaCaptureProps> = ({
  mediaType,
  onCapture,
  onCancel
}) => {
  const [isCapturing, setIsCapturing] = useState(true);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  
  // Wrapper function that returns a Promise
  const handleCapture = async (blob: Blob) => {
    setMediaBlob(blob);
    setIsCapturing(false);
    return onCapture(blob, mediaType);
  };
  
  const handleRetake = () => {
    setMediaBlob(null);
    setIsCapturing(true);
  };
  
  const handleConfirm = async () => {
    if (mediaBlob) {
      await onCapture(mediaBlob, mediaType);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <MediaCaptureHeader 
        mediaType={mediaType} 
        isCapturing={isCapturing}
      />
      
      <div className="relative overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 aspect-video">
        {mediaType === 'photo' ? (
          <CameraCapture 
            isCapturing={isCapturing}
            onCapture={handleCapture}
            capturedImage={mediaBlob ? URL.createObjectURL(mediaBlob) : undefined}
          />
        ) : (
          <AudioCapture 
            isCapturing={isCapturing}
            onCapture={handleCapture}
            capturedAudio={mediaBlob ? URL.createObjectURL(mediaBlob) : undefined}
          />
        )}
      </div>
      
      <MediaCaptureFooter 
        mediaType={mediaType}
        isCapturing={isCapturing}
        onRetake={handleRetake}
        onConfirm={handleConfirm}
        onCancel={onCancel}
      />
    </div>
  );
};

export default MediaCapture;
