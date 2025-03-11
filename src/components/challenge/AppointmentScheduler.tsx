import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Users, User, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppointmentRequest, Appointment } from "../quiz/types";
import { useToast } from "@/components/ui/use-toast";

const TOPICS = [
  "Histoire du MRC",
  "Stratégies de mobilisation",
  "Communication politique",
  "Organisation de campagne",
  "Enjeux politiques actuels",
  "Autre (préciser)"
];

const UPCOMING_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    title: "Formation sur les techniques de mobilisation",
    description: "Atelier pour apprendre à mobiliser efficacement dans votre localité",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    duration: 120,
    status: "confirmed",
    participantsCount: 12,
    maxParticipants: 25,
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "apt-2",
    title: "Principes fondamentaux du MRC",
    description: "Une introduction complète à l'idéologie et aux valeurs du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    duration: 90,
    status: "confirmed",
    participantsCount: 8,
    maxParticipants: 30,
    isVirtual: false,
    location: "Siège MRC, Yaoundé"
  },
  {
    id: "apt-3",
    title: "Stratégies de communication politique",
    description: "Comment communiquer efficacement les idées du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    startTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    endTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    duration: 60,
    status: "confirmed",
    participantsCount: 15,
    maxParticipants: 20,
    isVirtual: true,
    link: "https://zoom.us/j/123456789"
  }
];

interface AppointmentSchedulerProps {
  onClose: () => void;
}

const AppointmentScheduler = ({ onClose }: AppointmentSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [step, setStep] = useState<"calendar" | "form" | "confirmation">("calendar");
  const [appointmentType, setAppointmentType] = useState<"private" | "public">("private");
  const [formData, setFormData] = useState<Partial<AppointmentRequest>>({
    name: "",
    email: "",
    phone: "",
    preferredDate: new Date(),
    topic: "",
    message: ""
  });
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormData(prev => ({ ...prev, preferredDate: selectedDate }));
      setStep("form");
    }
  };

  const handleAppointmentTypeChange = (value: "private" | "public") => {
    setAppointmentType(value);
    setFormData(prev => ({ ...prev, requestType: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Appointment request:", formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Votre demande de rendez-vous a été enregistrée. Styvy-237 vous contactera bientôt.",
    });
    
    setStep("confirmation");
  };

  const handleJoinPublicSession = (appointment: Appointment) => {
    if (appointment.isVirtual && appointment.link) {
      window.open(appointment.link, "_blank");
    } else {
      toast({
        title: "Information de session",
        description: `Cette session se tiendra à ${appointment.location} le ${format(appointment.date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}`,
      });
    }
  };

  const renderAppointmentList = () => (
    <div className="space-y-4 mt-4">
      <h3 className="text-sm font-medium">Sessions publiques à venir</h3>
      <div className="space-y-3">
        {UPCOMING_APPOINTMENTS.map(appointment => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base">{appointment.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {format(appointment.date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 text-xs bg-mrc-blue/10 text-mrc-blue py-1 px-2 rounded-full">
                  <Users className="h-3 w-3" />
                  <span>{appointment.participantsCount}/{appointment.maxParticipants}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-gray-600 mb-2">{appointment.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.duration} min</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7 bg-mrc-blue/5 hover:bg-mrc-blue/10 text-mrc-blue border-mrc-blue/20"
                  onClick={() => handleJoinPublicSession(appointment)}
                >
                  {appointment.isVirtual ? "Rejoindre" : "Détails"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCalendarStep = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Planifier un rendez-vous</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Fermer
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Sélectionnez une date pour planifier une session de formation avec Styvy-237.
          </p>
          
          <RadioGroup 
            value={appointmentType} 
            onValueChange={(value) => handleAppointmentTypeChange(value as "private" | "public")}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="private" id="private" />
              <Label htmlFor="private" className="flex items-center space-x-1 cursor-pointer">
                <User className="h-4 w-4" />
                <span>Session privée</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="public" id="public" />
              <Label htmlFor="public" className="flex items-center space-x-1 cursor-pointer">
                <Users className="h-4 w-4" />
                <span>Session publique</span>
              </Label>
            </div>
          </RadioGroup>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border shadow p-3"
            disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
          />
        </div>
        
        {renderAppointmentList()}
      </div>
    </div>
  );

  const renderFormStep = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Détails de votre rendez-vous</h2>
        <Button variant="ghost" size="sm" onClick={() => setStep("calendar")}>
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="+237 6XX XXX XXX"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="topic">Sujet de formation</Label>
          <Select
            value={formData.topic}
            onValueChange={handleTopicChange}
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
            onChange={handleInputChange}
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

  const renderConfirmationStep = () => (
    <div className="space-y-6 py-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Votre demande a été envoyée !</h2>
        <p className="text-gray-600">
          Nous avons bien reçu votre demande de rendez-vous pour le{" "}
          {date && format(date, "d MMMM yyyy", { locale: fr })}
        </p>
        <p className="text-gray-600">
          Styvy-237 examinera votre demande et vous contactera à l'adresse{" "}
          <span className="font-medium">{formData.email}</span> pour confirmer les détails.
        </p>
      </div>
      
      <Button
        variant="outline"
        className="mt-4"
        onClick={onClose}
      >
        Fermer
      </Button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="p-6">
        {step === "calendar" && renderCalendarStep()}
        {step === "form" && renderFormStep()}
        {step === "confirmation" && renderConfirmationStep()}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
