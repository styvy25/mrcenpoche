
import React, { useState, useRef, useEffect } from "react";
import MediaCaptureHeader from "./media/MediaCaptureHeader";
import CameraCapture from "./media/CameraCapture";
import AudioCapture from "./media/AudioCapture";
import MediaCaptureFooter from "./media/MediaCaptureFooter";

interface MediaCaptureProps {
  onClose: () => void;
  onCapture: (mediaBlob: Blob, mediaType: 'photo' | 'audio') => Promise<void>;
}

const MediaCapture = ({ onClose, onCapture }: MediaCaptureProps) => {
  const [mode, setMode] = useState<'photo' | 'audio'>('photo');
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<BlobPart[]>([]);
  
  useEffect(() => {
    if (mode === 'photo') {
      startCamera();
    } else {
      stopMediaTracks();
    }
    
    return () => {
      stopMediaTracks();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [mode]);
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  
  const stopMediaTracks = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            setCapturedMedia(blob);
            const url = URL.createObjectURL(blob);
            setPreviewUrl(url);
            stopMediaTracks();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };
  
  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        setCapturedMedia(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setPreviewUrl(url);
        setIsCapturing(false);
      };
      
      mediaRecorderRef.current.start();
      setIsCapturing(true);
    } catch (error) {
      console.error("Error starting audio recording:", error);
    }
  };
  
  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };
  
  const handleCapture = () => {
    if (mode === 'photo') {
      capturePhoto();
    } else {
      if (isCapturing) {
        stopAudioRecording();
      } else {
        startAudioRecording();
      }
    }
  };
  
  const handleSend = async () => {
    if (capturedMedia) {
      await onCapture(capturedMedia, mode);
    }
  };
  
  const resetCapture = () => {
    setCapturedMedia(null);
    setPreviewUrl(null);
    if (mode === 'photo') {
      startCamera();
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <MediaCaptureHeader 
        mode={mode} 
        setMode={setMode} 
        onClose={onClose} 
        resetCapture={resetCapture} 
      />
      
      <div className="p-4">
        {mode === 'photo' ? (
          <CameraCapture 
            previewUrl={previewUrl} 
            onCapture={capturePhoto} 
            onReset={resetCapture} 
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
        capturedMedia={capturedMedia}
        isCapturing={isCapturing}
        mode={mode}
        onCapture={handleCapture}
        onReset={resetCapture}
        onSend={handleSend}
      />
    </div>
  );
};

export default MediaCapture;
