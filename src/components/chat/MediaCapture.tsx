
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Camera, Mic, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MediaCaptureProps {
  onCapture: (mediaBlob: Blob, type: 'photo' | 'audio') => void;
  type: 'photo' | 'audio';
}

const MediaCapture = ({ onCapture, type }: MediaCaptureProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  
  const openMedia = async () => {
    setIsOpen(true);
    try {
      const constraints = type === 'photo' 
        ? { video: { facingMode: 'user' } } 
        : { audio: true };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (type === 'photo' && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };
  
  const closeMedia = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsOpen(false);
    setIsRecording(false);
    setMediaBlob(null);
    chunksRef.current = [];
  };
  
  const startRecording = () => {
    if (!stream) return;
    
    setIsRecording(true);
    chunksRef.current = [];
    
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const mediaBlob = new Blob(chunksRef.current, {
        type: type === 'photo' ? 'image/jpeg' : 'audio/webm'
      });
      setMediaBlob(mediaBlob);
      
      if (type === 'audio' && audioRef.current) {
        audioRef.current.src = URL.createObjectURL(mediaBlob);
      }
    };
    
    if (type === 'audio') {
      mediaRecorder.start();
      // Auto stop after 30 seconds
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, 30000);
    } else {
      // For photos, we'll do a 3 second countdown
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            capturePhoto();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };
  
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setMediaBlob(blob);
            setIsRecording(false);
          }
        }, 'image/jpeg', 0.95);
      }
    }
  };
  
  const confirmMedia = () => {
    if (mediaBlob) {
      onCapture(mediaBlob, type);
      closeMedia();
    }
  };
  
  return (
    <>
      <Button 
        type="button" 
        variant="ghost"
        size="icon"
        onClick={openMedia}
        className="h-10 w-10 rounded-full"
        title={type === 'photo' ? 'Prendre une photo' : 'Enregistrer un message vocal'}
      >
        {type === 'photo' ? (
          <Camera className="h-5 w-5 text-mrc-blue" />
        ) : (
          <Mic className="h-5 w-5 text-mrc-green" />
        )}
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {type === 'photo' ? 'Prendre une photo' : 'Enregistrer un message audio'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            {type === 'photo' && (
              <>
                <div className="relative w-full h-64 bg-black rounded-md overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {mediaBlob && (
                    <img 
                      src={URL.createObjectURL(mediaBlob)} 
                      alt="Captured" 
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  
                  {countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-6xl font-bold">
                      {countdown}
                    </div>
                  )}
                </div>
              </>
            )}
            
            {type === 'audio' && (
              <div className="w-full">
                <div className="h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
                  {isRecording ? (
                    <div className="flex flex-col items-center text-mrc-red">
                      <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mb-2"></div>
                      <span>Enregistrement en cours...</span>
                    </div>
                  ) : mediaBlob ? (
                    <audio ref={audioRef} controls className="w-full" />
                  ) : (
                    <span className="text-gray-500">Appuyez sur le bouton d'enregistrement</span>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {!mediaBlob ? (
                <>
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      variant="default"
                      className="bg-mrc-red hover:bg-mrc-red/80"
                    >
                      {type === 'photo' ? 'Prendre une photo' : 'Commencer l\'enregistrement'}
                    </Button>
                  ) : (
                    type === 'audio' && (
                      <Button
                        onClick={stopRecording}
                        variant="destructive"
                      >
                        Arrêter l'enregistrement
                      </Button>
                    )
                  )}
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setMediaBlob(null);
                      if (type === 'photo') {
                        setIsRecording(false);
                      }
                    }}
                    variant="outline"
                  >
                    Reprendre
                  </Button>
                  <Button onClick={confirmMedia} variant="default">
                    Confirmer
                  </Button>
                </>
              )}
              <Button
                onClick={closeMedia}
                variant="outline"
              >
                <X className="h-4 w-4 mr-2" />
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaCapture;
