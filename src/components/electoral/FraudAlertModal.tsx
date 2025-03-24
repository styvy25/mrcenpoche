
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Camera, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import MediaCapture from "../chat/MediaCapture";

interface FraudAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FraudAlertModal = ({ open, onOpenChange }: FraudAlertModalProps) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mediaFile, setMediaFile] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);
  const { toast } = useToast();

  const handleMediaCapture = (blob: Blob, type: 'photo' | 'audio') => {
    setMediaFile(blob);
    setMediaType(type);
  };

  const startContinuousRecording = async (alertId: string) => {
    try {
      // Create a new recording entry in the database
      const { data: recordingData, error: recordingError } = await supabase
        .from('fraud_evidence_recordings')
        .insert({
          alert_id: alertId,
          created_at: new Date().toISOString(),
        })
        .select();
        
      if (recordingError) throw recordingError;
      
      // Start continuous recording in the background
      // We'll use a separate component for this functionality
      // This will be handled by a global component that stays active
      const event = new CustomEvent('start-fraud-recording', { 
        detail: { 
          alertId: alertId,
          recordingId: recordingData?.[0]?.id 
        } 
      });
      document.dispatchEvent(event);
      
      toast({
        title: "Enregistrement en arrière-plan activé",
        description: "La caméra et le microphone enregistrent en continu.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error starting continuous recording:', error);
    }
  };

  const handleSubmit = async () => {
    if (!description || !location) {
      toast({
        title: "Information manquante",
        description: "Veuillez fournir une description et un lieu",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let mediaUrl = null;
      
      // Upload media file if exists
      if (mediaFile) {
        const fileName = `fraud-evidence-${Date.now()}.${mediaType === 'photo' ? 'jpg' : 'webm'}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('fraud-alerts')
          .upload(fileName, mediaFile, {
            contentType: mediaType === 'photo' ? 'image/jpeg' : 'audio/webm',
          });
          
        if (uploadError) {
          throw new Error(`Erreur de téléchargement: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data } = supabase.storage
          .from('fraud-alerts')
          .getPublicUrl(fileName);
          
        mediaUrl = data.publicUrl;
      }
      
      // Create alert in database
      const { data: alertData, error } = await supabase
        .from('electoral_alerts')
        .insert({
          description,
          location,
          media_url: mediaUrl,
          media_type: mediaType,
          status: 'pending',
        })
        .select();
        
      if (error) throw error;
      
      // Start continuous recording in the background
      if (alertData && alertData[0]) {
        await startContinuousRecording(alertData[0].id);
      }
      
      // Broadcast to all online users via Supabase Realtime
      const channel = supabase.channel('fraud-alerts');
      await channel.send({
        type: 'broadcast',
        event: 'fraud-alert',
        payload: {
          description,
          location,
          mediaUrl,
          mediaType,
          timestamp: new Date().toISOString(),
        },
      });
      
      toast({
        title: "Alerte envoyée",
        description: "Votre signalement a été transmis. Merci pour votre vigilance!",
      });
      
      // Reset form
      setDescription('');
      setLocation('');
      setMediaFile(null);
      setMediaType(null);
      onOpenChange(false);
      
    } catch (error) {
      console.error('Error submitting fraud alert:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'alerte",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-mrc-red">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Signaler une fraude électorale
          </DialogTitle>
          <DialogDescription>
            Décrivez la situation et ajoutez une preuve photo ou audio si possible
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Décrivez la fraude observée..."
            className="resize-none min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          <Textarea
            placeholder="Lieu (bureau de vote, ville...)"
            className="resize-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Ajouter une preuve:</p>
            <div className="flex gap-2">
              <MediaCapture onCapture={handleMediaCapture} type="photo" />
            </div>
          </div>
          
          {mediaFile && (
            <div className="border rounded-md p-3 bg-gray-100">
              <p className="text-sm font-medium mb-2">
                {mediaType === 'photo' ? 'Photo attachée' : 'Audio attaché'}
              </p>
              {mediaType === 'photo' && (
                <img 
                  src={URL.createObjectURL(mediaFile)} 
                  alt="Evidence" 
                  className="w-full h-32 object-cover rounded"
                />
              )}
              {mediaType === 'audio' && (
                <audio src={URL.createObjectURL(mediaFile)} controls className="w-full" />
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 text-red-500 hover:text-red-700"
                onClick={() => {
                  setMediaFile(null);
                  setMediaType(null);
                }}
              >
                Supprimer
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Annuler
          </Button>
          <Button 
            type="submit" 
            onClick={handleSubmit}
            disabled={isSubmitting || !description || !location}
            className="bg-mrc-red hover:bg-mrc-red/80"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Envoi...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Envoyer l'alerte
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FraudAlertModal;
