
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, Mic, Play, Square, X, Send, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMediaProps {
  mediaType: 'photo' | 'audio';
  onCapture: (file: File) => void;
  onCancel: () => void;
}

const ChatMedia: React.FC<ChatMediaProps> = ({ mediaType, onCapture, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  const { toast } = useToast();

  useEffect(() => {
    // Request camera or microphone access
    const requestMedia = async () => {
      try {
        if (mediaType === 'photo') {
          const videoStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user' },
            audio: false
          });
          
          setStream(videoStream);
          
          if (videoRef.current) {
            videoRef.current.srcObject = videoStream;
          }
        } else if (mediaType === 'audio') {
          const audioStream = await navigator.mediaDevices.getUserMedia({ 
            audio: true,
            video: false
          });
          
          setStream(audioStream);
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast({
          title: "Erreur d'accès",
          description: "Impossible d'accéder à la caméra ou au microphone",
          variant: "destructive",
        });
        onCancel();
      }
    };

    requestMedia();

    // Cleanup function to stop media streams when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mediaType, onCancel, toast]);

  const startAudioRecording = () => {
    if (!stream) return;
    
    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };
    
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      const audioURL = URL.createObjectURL(audioBlob);
      
      setAudioBlob(audioBlob);
      setAudioURL(audioURL);
    };
    
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to image URL
        const imageURL = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageURL);
      }
    }
  };

  const resetPhoto = () => {
    setCapturedImage(null);
  };

  const handleSendMedia = async () => {
    setIsProcessing(true);
    
    try {
      if (mediaType === 'photo' && capturedImage) {
        // Convert data URL to blob
        const response = await fetch(capturedImage);
        const blob = await response.blob();
        
        const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        onCapture(file);
      } else if (mediaType === 'audio' && audioBlob) {
        const file = new File([audioBlob], `audio-${Date.now()}.webm`, { type: 'audio/webm' });
        onCapture(file);
      }
    } catch (error) {
      console.error('Error processing media:', error);
      toast({
        title: "Erreur",
        description: "Impossible de traiter le média",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden border-blue-200 dark:border-blue-900">
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">
            {mediaType === 'photo' ? 'Prendre une photo' : 'Enregistrer un message vocal'}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel}
            className="text-gray-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-grow flex flex-col items-center justify-center">
          {mediaType === 'photo' && (
            <div className="flex flex-col items-center">
              {!capturedImage ? (
                <>
                  <div className="relative w-full max-w-sm h-64 bg-black rounded-lg overflow-hidden mb-4">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <canvas ref={canvasRef} className="hidden" />
                  <Button 
                    onClick={capturePhoto}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Prendre une photo
                  </Button>
                </>
              ) : (
                <>
                  <div className="relative w-full max-w-sm h-64 bg-black rounded-lg overflow-hidden mb-4">
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={resetPhoto}
                    >
                      <RotateCw className="h-4 w-4 mr-2" />
                      Reprendre
                    </Button>
                    <Button 
                      onClick={handleSendMedia}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                          Envoi...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
          
          {mediaType === 'audio' && (
            <div className="flex flex-col items-center">
              <div className="w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Mic className={`h-24 w-24 ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
              </div>
              
              {!audioURL ? (
                <div className="flex gap-2">
                  {!isRecording ? (
                    <Button 
                      onClick={startAudioRecording}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Commencer l'enregistrement
                    </Button>
                  ) : (
                    <Button 
                      variant="destructive"
                      onClick={stopAudioRecording}
                    >
                      <Square className="h-4 w-4 mr-2" />
                      Arrêter l'enregistrement
                    </Button>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-xs">
                  <audio src={audioURL} controls className="w-full mb-4" />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setAudioBlob(null);
                        setAudioURL(null);
                      }}
                    >
                      <RotateCw className="h-4 w-4 mr-2" />
                      Réenregistrer
                    </Button>
                    <Button 
                      onClick={handleSendMedia}
                      disabled={isProcessing}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {isProcessing ? (
                        <div className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-20 border-t-white rounded-full" />
                          Envoi...
                        </div>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Envoyer
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatMedia;
