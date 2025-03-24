
import React, { useEffect, useRef, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { updateRecording } from '../services/alertService';
import { useToast } from "@/components/ui/use-toast";

interface RecordingManagerProps {
  alertId: string;
  recordingId: string;
  onStop?: () => void;
}

const RecordingManager: React.FC<RecordingManagerProps> = ({ 
  alertId, 
  recordingId,
  onStop 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const recordingIntervalRef = useRef<any>(null);
  const recordingStartTimeRef = useRef<number>(0);
  
  const { toast } = useToast();

  useEffect(() => {
    if (alertId && recordingId) {
      startRecording();
    }
    
    return () => {
      stopRecording();
    };
  }, [alertId, recordingId]);
  
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
        // Save the recording
        await saveRecording();
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
    } catch (error) {
      console.error('Error starting continuous recording:', error);
      toast({
        title: "Erreur d'enregistrement",
        description: "Impossible d'accéder à la caméra ou au microphone.",
        variant: "destructive",
      });
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
      
      if (onStop) onStop();
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };
  
  const saveRecording = async () => {
    if (chunksRef.current.length === 0 || !alertId) return;
    
    try {
      // Create video and audio blobs
      const videoBlob = new Blob(chunksRef.current, { type: 'video/webm' });
      const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
      
      // Calculate duration
      const durationSeconds = Math.round((Date.now() - recordingStartTimeRef.current) / 1000);
      
      // Upload video to storage
      const videoFileName = `fraud-evidence-video-${Date.now()}.webm`;
      const { data: videoData, error: videoError } = await supabase.storage
        .from('fraud-evidence')
        .upload(videoFileName, videoBlob, {
          contentType: 'video/webm',
        });
        
      if (videoError) {
        throw new Error(`Erreur de téléchargement vidéo: ${videoError.message}`);
      }
      
      // Get video URL
      const { data: videoUrlData } = supabase.storage
        .from('fraud-evidence')
        .getPublicUrl(videoFileName);
      
      // Upload audio to storage
      const audioFileName = `fraud-evidence-audio-${Date.now()}.webm`;
      const { data: audioData, error: audioError } = await supabase.storage
        .from('fraud-evidence')
        .upload(audioFileName, audioBlob, {
          contentType: 'audio/webm',
        });
        
      if (audioError) {
        throw new Error(`Erreur de téléchargement audio: ${audioError.message}`);
      }
      
      // Get audio URL
      const { data: audioUrlData } = supabase.storage
        .from('fraud-evidence')
        .getPublicUrl(audioFileName);
      
      // Update recording in database
      await updateRecording(
        recordingId,
        videoUrlData.publicUrl,
        audioUrlData.publicUrl,
        durationSeconds
      );
      
      console.log('Recording saved successfully:', {
        videoUrl: videoUrlData.publicUrl,
        audioUrl: audioUrlData.publicUrl,
        duration: durationSeconds
      });
      
      // Reset start time for next segment
      recordingStartTimeRef.current = Date.now();
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  };
  
  // Hidden component - doesn't render anything visible to the user
  return (
    <div className="hidden">
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default RecordingManager;
