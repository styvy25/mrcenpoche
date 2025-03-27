
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Camera, Mic } from "lucide-react";
import AlertSubmitSection from './AlertSubmitSection';
import RecordingStatusSection from './RecordingStatusSection';
import { submitAlert, AlertData } from "../services/alertService";

interface AlertFormProps {
  onClose: () => void;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  mediaFile: Blob | null;
  setMediaFile: React.Dispatch<React.SetStateAction<Blob | null>>;
  mediaType: 'photo' | 'audio' | null;
  setMediaType: React.Dispatch<React.SetStateAction<'photo' | 'audio' | null>>;
  onCaptureMedia: () => void;
}

const AlertForm: React.FC<AlertFormProps> = ({
  onClose,
  description,
  setDescription,
  location,
  setLocation,
  mediaFile,
  setMediaFile,
  mediaType,
  setMediaType,
  onCaptureMedia
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const alertData: AlertData = {
        description,
        location,
        mediaFile: mediaFile || undefined,
        mediaType: mediaType || undefined
      };

      const success = await submitAlert(alertData);
      
      if (success) {
        // Réinitialiser le formulaire
        setDescription('');
        setLocation('');
        setMediaFile(null);
        setMediaType(null);
        onClose();
      }
    } catch (error) {
      console.error("Error submitting alert:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description de l'incident</Label>
          <Textarea
            id="description"
            placeholder="Décrivez ce que vous avez observé..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Lieu de l'incident</Label>
          <Input
            id="location"
            placeholder="Adresse du bureau de vote, ville, etc."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {mediaFile ? (
          <RecordingStatusSection 
            mediaType={mediaType} 
            onReset={() => {
              setMediaFile(null);
              setMediaType(null);
            }} 
          />
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                setMediaType('photo');
                onCaptureMedia();
              }}
              variant="outline"
              className="flex-1"
            >
              <Camera className="mr-2 h-4 w-4" />
              Ajouter une photo
            </Button>
            <Button
              type="button"
              onClick={() => {
                setMediaType('audio');
                onCaptureMedia();
              }}
              variant="outline"
              className="flex-1"
            >
              <Mic className="mr-2 h-4 w-4" />
              Ajouter un audio
            </Button>
          </div>
        )}

        <AlertSubmitSection isSubmitting={isSubmitting} />
      </div>
    </form>
  );
};

export default AlertForm;
