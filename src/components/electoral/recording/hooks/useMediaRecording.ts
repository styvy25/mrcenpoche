
import { useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface UseMediaRecordingOptions {
  onSaveRecording?: (chunks: BlobPart[], durationSeconds: number) => Promise<void>;
}

export const useMediaRecording = ({ onSaveRecording }: UseMediaRecordingOptions = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const recordingIntervalRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number>(0);
  
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      // Request permissions for video and audio
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, // Try to use the rear camera
        audio: true 
      });
      
      streamRef.current = stream;
      
      // If video element exists, attach the stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.muted = true; // Mute to prevent feedback
      }
      
      // Start recording
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = async () => {
        // Save the recording if callback provided
        if (onSaveRecording) {
          const durationSeconds = Math.round((Date.now() - recordingStartTimeRef.current) / 1000);
          await onSaveRecording(chunksRef.current, durationSeconds);
        }
      };
      
      // Start recording
      mediaRecorder.start();
      recordingStartTimeRef.current = Date.now();
      setIsRecording(true);
      
      // Set up interval to save recordings every 30 seconds
      recordingIntervalRef.current = setInterval(async () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          // Stop the current recording
          mediaRecorderRef.current.stop();
          
          // Wait for the onstop event to finish processing
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Start a new recording
          chunksRef.current = [];
          mediaRecorderRef.current.start();
        }
      }, 30000); // Save every 30 seconds
      
      toast({
        title: "Enregistrement en arrière-plan",
        description: "La caméra et le microphone enregistrent en continu.",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error('Error starting continuous recording:', error);
      toast({
        title: "Erreur d'enregistrement",
        description: "Impossible d'accéder à la caméra ou au microphone.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  const stopRecording = async () => {
    try {
      // Clear the recording interval
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
      
      // Stop the media recorder if it's recording
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
        // Wait for onstop to finish
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Stop all tracks in the stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      setIsRecording(false);
      
      toast({
        title: "Enregistrement terminé",
        description: "L'enregistrement en arrière-plan a été arrêté.",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error('Error stopping recording:', error);
      return false;
    }
  };

  return {
    isRecording,
    videoRef,
    startRecording,
    stopRecording
  };
};
