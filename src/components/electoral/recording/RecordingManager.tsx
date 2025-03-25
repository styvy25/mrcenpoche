
import React, { useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface RecordingManagerProps {
  alertId: string;
  recordingId: string;
  onStop: () => void;
}

const RecordingManager: React.FC<RecordingManagerProps> = ({ 
  alertId, 
  recordingId,
  onStop 
}) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    // The actual recording is handled by ContinuousRecorder component
    // This component just manages the recording lifecycle events
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stopRecording();
      }
    };
    
    const handleVisibilityChange = () => {
      if (isMobile && document.visibilityState === 'hidden') {
        // On mobile, stop recording when app goes to background
        console.log('Mobile device: app in background, stopping recording');
        stopRecording();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up function
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopRecording();
    };
  }, [isMobile]);
  
  const stopRecording = () => {
    // Dispatch event to stop recording
    document.dispatchEvent(new Event('stop-fraud-recording'));
    onStop();
  };
  
  return null; // No UI, just event management
};

export default RecordingManager;
