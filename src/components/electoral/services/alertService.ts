
import { supabase } from "@/integrations/supabase/client";

export interface AlertSubmission {
  description: string;
  location: string;
  mediaFile: Blob | null;
  mediaType: 'photo' | 'audio' | null;
}

export async function submitFraudAlert(data: AlertSubmission): Promise<{
  success: boolean;
  alertId?: string;
  error?: string;
}> {
  try {
    let mediaUrl = null;
    
    // Upload media file if exists
    if (data.mediaFile) {
      const fileName = `fraud-evidence-${Date.now()}.${data.mediaType === 'photo' ? 'jpg' : 'webm'}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('fraud-evidence')
        .upload(fileName, data.mediaFile, {
          contentType: data.mediaType === 'photo' ? 'image/jpeg' : 'audio/webm',
        });
        
      if (uploadError) {
        throw new Error(`Erreur de téléchargement: ${uploadError.message}`);
      }
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('fraud-evidence')
        .getPublicUrl(fileName);
        
      mediaUrl = urlData.publicUrl;
    }
    
    // Create alert in database
    const { data: alertData, error } = await supabase
      .from('electoral_alerts')
      .insert({
        description: data.description,
        location: data.location,
        media_url: mediaUrl,
        media_type: data.mediaType,
        status: 'pending',
      })
      .select();
      
    if (error) throw error;
    
    // Broadcast to all online users via Supabase Realtime
    const channel = supabase.channel('fraud-alerts');
    await channel.send({
      type: 'broadcast',
      event: 'fraud-alert',
      payload: {
        id: alertData[0].id,
        description: data.description,
        location: data.location,
        mediaUrl,
        mediaType: data.mediaType,
        timestamp: new Date().toISOString(),
      },
    });
    
    return { 
      success: true,
      alertId: alertData[0].id
    };
    
  } catch (error: any) {
    console.error('Error submitting fraud alert:', error);
    return {
      success: false,
      error: error.message || 'Une erreur est survenue'
    };
  }
}

export async function startContinuousRecording(alertId: string): Promise<{
  success: boolean;
  recordingId?: string;
  error?: string;
}> {
  try {
    // Create a new recording entry in the database
    const { data: recordingData, error: recordingError } = await supabase
      .from('fraud_evidence_recordings')
      .insert({
        alert_id: alertId,
      })
      .select();
      
    if (recordingError) throw recordingError;
    
    return {
      success: true,
      recordingId: recordingData[0].id
    };
  } catch (error: any) {
    console.error('Error starting continuous recording:', error);
    return {
      success: false,
      error: error.message || 'Erreur d\'initialisation de l\'enregistrement'
    };
  }
}

export async function updateRecording(
  recordingId: string, 
  videoUrl: string, 
  audioUrl: string, 
  durationSeconds: number
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('fraud_evidence_recordings')
      .update({
        video_url: videoUrl,
        audio_url: audioUrl,
        duration_seconds: durationSeconds
      })
      .eq('id', recordingId);
      
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error updating recording:', error);
    return false;
  }
}

export function subscribeToFraudAlerts(callback: (alert: any) => void): () => void {
  const channel = supabase.channel('fraud-alerts')
    .on('broadcast', { event: 'fraud-alert' }, (payload) => {
      callback(payload.payload);
    })
    .subscribe();
    
  return () => {
    supabase.removeChannel(channel);
  };
}
