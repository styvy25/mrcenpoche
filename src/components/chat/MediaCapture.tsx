
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Mic, Send, Image as ImageIcon } from "lucide-react";

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
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === 'photo' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => {
              setMode('photo');
              setCapturedMedia(null);
              setPreviewUrl(null);
              setIsCapturing(false);
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
              setCapturedMedia(null);
              setPreviewUrl(null);
              setIsCapturing(false);
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
      
      <div className="p-4">
        {mode === 'photo' && !capturedMedia ? (
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
        ) : mode === 'audio' && !capturedMedia ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className={`mb-4 p-4 rounded-full ${isCapturing ? 'bg-red-500/20 animate-pulse' : 'bg-gray-700'}`}>
              <Mic size={32} className={isCapturing ? 'text-red-500' : 'text-gray-300'} />
            </div>
            <p className="text-gray-300 mb-2">
              {isCapturing ? 'Enregistrement en cours...' : 'Prêt à enregistrer'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {mode === 'photo' && previewUrl ? (
              <img src={previewUrl} alt="Captured" className="w-full rounded-lg" />
            ) : mode === 'audio' && previewUrl ? (
              <div className="w-full flex flex-col items-center py-4">
                <div className="bg-gray-700 p-4 rounded-full mb-4">
                  <ImageIcon size={32} className="text-gray-300" />
                </div>
                <audio src={previewUrl} controls className="w-full" />
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      <div className="flex justify-between p-3 border-t border-gray-700">
        {capturedMedia ? (
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={resetCapture}
              className="text-gray-300"
            >
              Reprendre
            </Button>
            <Button
              type="button"
              variant="default"
              onClick={handleSend}
              className="bg-mrc-blue text-white hover:bg-mrc-blue/90 flex items-center gap-1"
            >
              <Send size={16} />
              Envoyer
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant={isCapturing ? "destructive" : "default"}
            onClick={handleCapture}
            className="mx-auto"
          >
            {mode === 'photo' ? (
              'Prendre une photo'
            ) : isCapturing ? (
              'Arrêter l\'enregistrement'
            ) : (
              'Démarrer l\'enregistrement'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MediaCapture;
