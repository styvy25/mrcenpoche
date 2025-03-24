
import React, { useEffect } from 'react';

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
  useEffect(() => {
    // The actual recording is handled by ContinuousRecorder component
    // This component just manages the recording lifecycle events
    
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        stopRecording();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up function
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      stopRecording();
    };
  }, []);
  
  const stopRecording = () => {
    // Dispatch event to stop recording
    document.dispatchEvent(new Event('stop-fraud-recording'));
    onStop();
  };
  
  return null; // No UI, just event management
};

export default RecordingManager;
