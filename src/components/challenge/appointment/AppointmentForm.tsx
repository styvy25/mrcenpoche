
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppointmentRequest } from "../../quiz/types";
import { TOPICS } from "./appointmentData";

interface AppointmentFormProps {
  date: Date | undefined;
  formData: Partial<AppointmentRequest>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTopicChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

const AppointmentForm = ({
  date,
  formData,
  onInputChange,
  onTopicChange,
  onSubmit,
  onBack
}: AppointmentFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Détails de votre rendez-vous</h2>
        <Button variant="ghost" size="sm" onClick={onBack}>
          Retour
        </Button>
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-1">Date sélectionnée:</p>
        <div className="flex items-center space-x-2 p-2 bg-mrc-blue/5 rounded-md">
          <CalendarIcon className="h-5 w-5 text-mrc-blue" />
          <span>{date && format(date, "EEEE dd MMMM yyyy", { locale: fr })}</span>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              placeholder="Votre nom complet"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onInputChange}
              required
              placeholder="votre@email.com"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone (optionnel)</Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            placeholder="+237 6XX XXX XXX"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic">Sujet de formation</Label>
          <Select
            value={formData.topic}
            onValueChange={onTopicChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un sujet" />
            </SelectTrigger>
            <SelectContent>
              {TOPICS.map(topic => (
                <SelectItem key={topic} value={topic}>{topic}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message (optionnel)</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onInputChange}
            placeholder="Précisez vos attentes pour cette formation..."
            rows={4}
          />
        </div>
        
        <Button type="submit" className="w-full bg-mrc-blue hover:bg-mrc-blue/90">
          Envoyer la demande
        </Button>
      </form>
    </div>
  );
};

export default AppointmentForm;
