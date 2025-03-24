import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AlertForm from './form/AlertForm';
import { submitFraudAlert, startContinuousRecording } from './services/alertService';
import RecordingManager from './recording/RecordingManager';
import AlertSubmitSection from './form/AlertSubmitSection';
import RecordingStatusSection from './form/RecordingStatusSection';

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
  
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [alertId, setAlertId] = useState<string | null>(null);
  const [recordingId, setRecordingId] = useState<string | null>(null);
  
  const { toast } = useToast();

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
      // Submit the alert
      const alertResult = await submitFraudAlert({
        description,
        location,
        mediaFile,
        mediaType
      });
      
      if (!alertResult.success) {
        throw new Error(alertResult.error);
      }
      
      // Start continuous recording
      if (alertResult.alertId) {
        setAlertId(alertResult.alertId);
        
        const recordingResult = await startContinuousRecording(alertResult.alertId);
        
        if (recordingResult.success && recordingResult.recordingId) {
          setRecordingId(recordingResult.recordingId);
          setRecordingStarted(true);
          
          // Initialize the event to start recording
          const event = new CustomEvent('start-fraud-recording', { 
            detail: { 
              alertId: alertResult.alertId,
              recordingId: recordingResult.recordingId 
            } 
          });
          document.dispatchEvent(event);
        }
      }
      
      toast({
        title: "Alerte envoyée",
        description: "Votre signalement a été transmis. Merci pour votre vigilance!",
      });
      
      // Reset form but keep modal open for recording
      setDescription('');
      setLocation('');
      setMediaFile(null);
      setMediaType(null);
      
    } catch (error: any) {
      console.error('Error in alert submission process:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de l'alerte",
        variant: "destructive",
      });
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (recordingStarted) {
      // If recording is active, ask for confirmation
      if (confirm("Fermer cette fenêtre arrêtera l'enregistrement en arrière-plan. Êtes-vous sûr?")) {
        setRecordingStarted(false);
        onOpenChange(false);
      }
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {recordingStarted ? "Enregistrement en cours" : "Signaler une fraude électorale"}
          </DialogTitle>
          <DialogDescription>
            {recordingStarted 
              ? "La caméra et le microphone enregistrent en arrière-plan."
              : "Décrivez la situation et ajoutez une preuve photo ou audio si possible"
            }
          </DialogDescription>
        </DialogHeader>
        
        {!recordingStarted ? (
          // Show form when not recording
          <AlertForm 
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
            mediaType={mediaType}
            setMediaType={setMediaType}
          />
        ) : (
          // Show recording status when recording
          <RecordingStatusSection />
        )}
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCloseModal}
          >
            {recordingStarted ? "Arrêter l'enregistrement" : "Annuler"}
          </Button>
          
          {!recordingStarted && (
            <AlertSubmitSection 
              isSubmitting={isSubmitting}
              description={description}
              location={location}
              onSubmit={handleSubmit}
            />
          )}
        </DialogFooter>
        
        {/* Hidden recording manager component */}
        {recordingStarted && alertId && recordingId && (
          <RecordingManager 
            alertId={alertId} 
            recordingId={recordingId}
            onStop={() => setRecordingStarted(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FraudAlertModal;
