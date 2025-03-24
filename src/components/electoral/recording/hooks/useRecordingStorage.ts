
import { supabase } from "@/integrations/supabase/client";
import { updateRecording } from '../../services/alertService';

export const useRecordingStorage = (alertId: string | null, recordingId: string | null) => {
  const saveRecording = async (chunks: BlobPart[], durationSeconds: number): Promise<void> => {
    if (chunks.length === 0 || !alertId || !recordingId) return;
    
    try {
      // Create video and audio blobs
      const videoBlob = new Blob(chunks, { type: 'video/webm' });
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      
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
      const success = await updateRecording(
        recordingId,
        videoUrlData.publicUrl,
        audioUrlData.publicUrl,
        durationSeconds
      );
      
      if (!success) {
        throw new Error('Erreur lors de la mise à jour de l\'enregistrement');
      }
      
      console.log('Recording saved successfully:', {
        videoUrl: videoUrlData.publicUrl,
        audioUrl: audioUrlData.publicUrl,
        duration: durationSeconds
      });
    } catch (error) {
      console.error('Error saving recording:', error);
    }
  };

  return { saveRecording };
};
