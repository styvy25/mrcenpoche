
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/components/quiz/types";
import { format } from "date-fns";

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
  date?: Date;
  formData: any;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  date,
  formData,
  onInputChange,
  onTopicChange,
  onSubmit,
  onBack
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom complet *</Label>
        <Input 
          id="name"
          name="name"
          value={formData.name}
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
          value={formData.email}
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
          value={formData.phone}
          onChange={onInputChange}
          placeholder="+237 6xx xxx xxx"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Sujet de formation *</Label>
        <Select 
          value={formData.topic} 
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
          value={formData.message}
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
