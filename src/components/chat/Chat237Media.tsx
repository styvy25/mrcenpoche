
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, X, Mic, Send, RotateCcw, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMediaProps {
  mediaType: 'photo' | 'audio';
  onCapture: (file: File) => Promise<void>;
  onCancel: () => void;
}

const ChatMedia: React.FC<ChatMediaProps> = ({ mediaType, onCapture, onCancel }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    // Set up camera if photo mode
    if (mediaType === 'photo') {
      setupCamera();
    }

    return () => {
      // Clean up resources
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [mediaType]);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      toast({
        title: "Erreur d'accès à la caméra",
        description: "Veuillez autoriser l'accès à la caméra pour continuer",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
      }
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    // Start timer
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    // Here you'd actually start recording audio
    toast({
      title: "Enregistrement démarré",
      description: "Parlez clairement..."
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Here you'd actually stop recording and get the audio file
    toast({
      title: "Enregistrement terminé",
      description: "Audio capturé avec succès"
    });
    
    // For demo purposes, we'll create a dummy file
    const dummyBlob = new Blob(['dummy audio data'], { type: 'audio/mp3' });
    const dummyFile = new File([dummyBlob], 'audio-recording.mp3', { type: 'audio/mp3' });
    
    // Send the captured audio
    handleSendMedia(dummyFile);
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const handleSendMedia = async (file: File) => {
    try {
      await onCapture(file);
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le média",
        variant: "destructive"
      });
    }
  };

  const sendCapturedPhoto = async () => {
    if (capturedImage) {
      // Convert data URL to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
      
      // Send the captured photo
      handleSendMedia(file);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <div className="flex items-center gap-2">
          {mediaType === 'photo' ? (
            <>
              <Camera className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Appareil photo</span>
            </>
          ) : (
            <>
              <Mic className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Enregistrement audio</span>
            </>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <CardContent className="flex-grow p-0 flex flex-col">
        {mediaType === 'photo' ? (
          <>
            <div className="relative flex-grow bg-black flex items-center justify-center">
              {capturedImage ? (
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="max-h-full max-w-full"
                />
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            <div className="p-4 flex justify-center">
              {capturedImage ? (
                <div className="flex gap-4">
                  <Button variant="outline" onClick={retakePhoto}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reprendre
                  </Button>
                  <Button onClick={sendCapturedPhoto}>
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer
                  </Button>
                </div>
              ) : (
                <Button 
                  className="h-14 w-14 rounded-full"
                  onClick={capturePhoto}
                >
                  <Camera className="h-6 w-6" />
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="rounded-lg bg-accent p-6 flex flex-col items-center">
                <Mic className={`h-12 w-12 ${isRecording ? 'text-red-500 animate-pulse' : 'text-blue-500'}`} />
                
                {isRecording ? (
                  <div className="mt-4 text-center">
                    <p className="text-2xl font-bold">{formatTime(recordingTime)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Enregistrement en cours...</p>
                  </div>
                ) : (
                  <p className="mt-4 text-center text-muted-foreground">
                    Appuyez sur le bouton pour commencer l'enregistrement
                  </p>
                )}
              </div>
              
              <div className="mt-8 flex justify-center">
                {isRecording ? (
                  <Button 
                    className="h-14 w-14 rounded-full bg-red-500 hover:bg-red-600"
                    onClick={stopRecording}
                  >
                    <span className="h-6 w-6 bg-white rounded-sm" />
                  </Button>
                ) : (
                  <Button 
                    className="h-14 w-14 rounded-full"
                    onClick={startRecording}
                  >
                    <Mic className="h-6 w-6" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Chat237Media;
