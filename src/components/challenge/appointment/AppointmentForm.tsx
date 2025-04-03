
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Appointment, AppointmentRequest } from "@/components/quiz/types";

// Define topics manually since TOPICS is not exported
const APPOINTMENT_TOPICS = [
  "Introduction aux principes du MRC",
  "Formation politique de base",
  "Techniques de mobilisation",
  "Stratégies de campagne",
  "Communication politique",
  "Droits et obligations des militants"
];

interface AppointmentFormProps {
  selectedDate: Date;
  selectedTime: string;
  formData: Partial<AppointmentRequest>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTopicChange: (value: string) => void;
  onSubmit: (appointment: Appointment) => void;
  onBack: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  selectedDate,
  selectedTime,
  formData,
  onInputChange,
  onTopicChange,
  onSubmit,
  onBack
}) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }
    
    // Format date and create appointment object
    const dateString = selectedDate.toISOString().split('T')[0];
    const [hours, minutes] = selectedTime.split(':');
    
    const appointment: Appointment = {
      id: `appt-${Date.now()}`,
      title: `Formation: ${formData.topic || ''}`,
      description: formData.message || "Pas de notes additionnelles",
      date: dateString,
      startTime: selectedTime,
      endTime: `${Number(hours) + 1}:${minutes}`,
      location: "En ligne (lien envoyé par email)",
      participant: {
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone
      },
      status: "pending",
      isVirtual: true,
      link: "https://meet.google.com/abc-defg-hij",
      duration: 60,
      participantsCount: 1,
      maxParticipants: 1,
      type: "private"
    };

    onSubmit(appointment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet *</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={onInputChange}
          placeholder="Jean Dupont"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input 
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={onInputChange}
          placeholder="jean.dupont@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone</Label>
        <Input 
          id="phone"
          name="phone"
          value={formData.phone || ''}
          onChange={onInputChange}
          placeholder="+237 6xx xxx xxx"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Sujet de formation *</Label>
        <Select 
          value={formData.topic || APPOINTMENT_TOPICS[0]} 
          onValueChange={onTopicChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un sujet" />
          </SelectTrigger>
          <SelectContent>
            {APPOINTMENT_TOPICS.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Notes ou questions</Label>
        <Textarea 
          id="message"
          name="message"
          value={formData.message || ''}
          onChange={onInputChange}
          placeholder="Questions spécifiques ou points que vous souhaitez aborder..."
          rows={3}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="submit">
          Confirmer la réservation
        </Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
