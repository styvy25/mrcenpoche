
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, StopCircle } from "lucide-react";

interface MediaCaptureProps {
  onCapture: (blob: Blob, type: 'photo' | 'audio') => void;
  type: 'photo' | 'audio';
  onRecordingStateChange?: (isRecording: boolean) => void;
}

const MediaCapture = ({ onCapture, type, onRecordingStateChange }: MediaCaptureProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onCapture(file, 'photo');
    }
  };

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/webm' });
        onCapture(audioBlob, 'audio');
        stream.getTracks().forEach(track => track.stop());
        setAudioChunks([]);
        setIsRecording(false);
        if (onRecordingStateChange) onRecordingStateChange(false);
      };
      
      recorder.start();
      setIsRecording(true);
      if (onRecordingStateChange) onRecordingStateChange(true);
      setAudioChunks(chunks);
    } catch (error) {
      console.error('Error starting audio recording:', error);
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
    }
  };

  return (
    <>
      {type === 'photo' && (
        <>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handlePhotoCapture} 
            className="hidden"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            className="h-11 w-11 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Camera size={20} />
          </Button>
        </>
      )}
      
      {type === 'audio' && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className={`h-11 w-11 rounded-full ${isRecording ? 'text-red-500 bg-red-500/10' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
          onClick={isRecording ? stopAudioRecording : startAudioRecording}
        >
          {isRecording ? <StopCircle size={20} /> : <Mic size={20} />}
        </Button>
      )}
    </>
  );
};

export default MediaCapture;
