
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Mic } from "lucide-react";
import { submitAlert } from "../services/alertService";
import { useToast } from "@/hooks/use-toast";
import RecordingStatusSection from "./RecordingStatusSection";
import AlertSubmitSection from "./AlertSubmitSection";
import MediaCapture from '@/components/chat/MediaCapture';

const AlertForm = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("irregularity");
  const [submitting, setSubmitting] = useState(false);
  const [isMediaCaptureOpen, setIsMediaCaptureOpen] = useState(false);
  const [mediaAttachment, setMediaAttachment] = useState<Blob | null>(null);
  const [mediaType, setMediaType] = useState<'photo' | 'audio' | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await submitAlert({
        location, 
        description, 
        type, 
        media: mediaAttachment,
        mediaType
      });
      
      toast({
        title: "Alerte envoyée",
        description: "Votre alerte a été transmise avec succès.",
      });
      
      // Reset form
      setLocation("");
      setDescription("");
      setType("irregularity");
      setMediaAttachment(null);
      setMediaType(null);
      
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'alerte. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleMediaCapture = async (blob: Blob, type: 'photo' | 'audio'): Promise<void> => {
    setMediaAttachment(blob);
    setMediaType(type);
    setIsMediaCaptureOpen(false);
    return Promise.resolve();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isMediaCaptureOpen ? (
        <MediaCapture 
          onClose={() => setIsMediaCaptureOpen(false)}
          onCapture={handleMediaCapture}
        />
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input
              id="location"
              placeholder="Bureau de vote, quartier, ville..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alert-type">Type d'alerte</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="alert-type">
                <SelectValue placeholder="Sélectionnez le type d'alerte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="irregularity">Irrégularité</SelectItem>
                <SelectItem value="intimidation">Intimidation</SelectItem>
                <SelectItem value="violence">Violence</SelectItem>
                <SelectItem value="fraud">Fraude</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez ce que vous avez observé..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Ajouter un média (optionnel)</Label>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsMediaCaptureOpen(true)}
                className="flex-1"
              >
                <Camera className="mr-2 h-4 w-4" />
                {mediaType === 'photo' ? 'Changer la photo' : 'Ajouter une photo'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsMediaCaptureOpen(true)}
                className="flex-1"
              >
                <Mic className="mr-2 h-4 w-4" />
                {mediaType === 'audio' ? 'Changer l\'audio' : 'Ajouter un audio'}
              </Button>
            </div>
            
            {mediaAttachment && (
              <div className="mt-2 p-2 border rounded bg-background">
                <p className="text-sm">
                  {mediaType === 'photo' ? 'Photo ajoutée' : 'Audio ajouté'}
                </p>
              </div>
            )}
          </div>
          
          <RecordingStatusSection />
          <AlertSubmitSection submitting={submitting} />
        </>
      )}
    </form>
  );
};

export default AlertForm;
