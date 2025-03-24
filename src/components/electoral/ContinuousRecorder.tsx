
import React, { useState } from 'react';
import { useEventListener } from './recording/hooks/useEventListener';
import { useMediaRecording } from './recording/hooks/useMediaRecording';
import { useRecordingStorage } from './recording/hooks/useRecordingStorage';
import RecordingVideo from './recording/RecordingVideo';

interface ContinuousRecorderProps {
  // Optional props if needed
}

interface RecordingEventDetail {
  alertId: string;
  recordingId: string;
}

const ContinuousRecorder: React.FC<ContinuousRecorderProps> = () => {
  const [alertId, setAlertId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  
  const { saveRecording } = useRecordingStorage(alertId, recordingId);
  
  const onSaveRecording = async (chunks: BlobPart[], durationSeconds: number): Promise<void> => {
    await saveRecording(chunks, durationSeconds);
  };
  
  const { videoRef, startRecording, stopRecording } = useMediaRecording({
    onSaveRecording: onSaveRecording
  });

  // Listen for start recording events
  useEventListener<RecordingEventDetail>(
    'start-fraud-recording', 
    (event) => {
      const { alertId, recordingId } = event.detail;
      setAlertId(alertId);
      setRecordingId(recordingId);
      startRecording();
      
      // Dispatch event to notify recording started
      document.dispatchEvent(new Event('start-fraud-recording'));
    },
    []
  );
  
  // Hidden component - doesn't render anything visible to the user
  return <RecordingVideo videoRef={videoRef} />;
};

export default ContinuousRecorder;
