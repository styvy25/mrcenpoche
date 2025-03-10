
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Video, MapPin, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AppointmentScheduler from "./AppointmentScheduler";
import { Appointment } from "../quiz/types";
import { useToast } from "@/components/ui/use-toast";

// Example upcoming events data
const UPCOMING_EVENTS: Appointment[] = [
  {
    id: "evt-1",
    title: "Formation sur les techniques de mobilisation",
    description: "Atelier pour apprendre à mobiliser efficacement dans votre localité",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    duration: 120,
    status: "confirmed",
    participantsCount: 12,
    maxParticipants: 25,
    isVirtual: true,
    link: "https://meet.google.com/abc-defg-hij"
  },
  {
    id: "evt-2",
    title: "Principes fondamentaux du MRC",
    description: "Une introduction complète à l'idéologie et aux valeurs du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    duration: 90,
    status: "confirmed",
    participantsCount: 8,
    maxParticipants: 30,
    isVirtual: false,
    location: "Siège MRC, Yaoundé"
  },
  {
    id: "evt-3",
    title: "Stratégies de communication politique",
    description: "Comment communiquer efficacement les idées du MRC",
    type: "public",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    duration: 60,
    status: "confirmed",
    participantsCount: 15,
    maxParticipants: 20,
    isVirtual: true,
    link: "https://zoom.us/j/123456789"
  }
];

const UpcomingEventsWidget = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const { toast } = useToast();

  const handleJoinEvent = (event: Appointment) => {
    if (event.isVirtual && event.link) {
      window.open(event.link, "_blank");
    } else {
      toast({
        title: "Information sur l'événement",
        description: `Cet événement se tiendra à ${event.location} le ${format(event.date, "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}`,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-mrc-blue" />
          Formations à venir
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {UPCOMING_EVENTS.map((event) => (
            <div 
              key={event.id} 
              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-sm">{event.title}</h3>
                <Badge 
                  variant={event.isVirtual ? "outline" : "secondary"}
                  className="text-[10px] px-1 h-5"
                >
                  {event.isVirtual ? (
                    <span className="flex items-center gap-1">
                      <Video className="h-3 w-3" />
                      En ligne
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Présentiel
                    </span>
                  )}
                </Badge>
              </div>
              <div className="mt-1 text-xs text-gray-500">
                {format(event.date, "EEEE d MMMM, HH'h'mm", { locale: fr })}
                <span className="mx-1">•</span>
                {event.duration} min
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-xs text-gray-600">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{event.participantsCount}/{event.maxParticipants} participants</span>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-6 text-xs px-2 text-mrc-blue hover:text-mrc-blue/80 hover:bg-mrc-blue/10"
                  onClick={() => handleJoinEvent(event)}
                >
                  {event.isVirtual ? (
                    <span className="flex items-center">
                      Rejoindre <ExternalLink className="h-3 w-3 ml-1" />
                    </span>
                  ) : (
                    "Détails"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <Dialog open={showScheduler} onOpenChange={setShowScheduler}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full mt-4 text-mrc-blue border-mrc-blue/30 hover:bg-mrc-blue/5"
            >
              Réserver une formation privée
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] p-0">
            <AppointmentScheduler onClose={() => setShowScheduler(false)} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsWidget;
