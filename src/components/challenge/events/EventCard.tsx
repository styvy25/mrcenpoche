
import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/components/quiz/types";
import { Users, Video, MapPin, ExternalLink } from "lucide-react";

interface EventCardProps {
  event: Appointment;
  onEventAction: (event: Appointment) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onEventAction }) => {
  return (
    <div className="p-3 border rounded-md hover:bg-gray-50 transition-colors">
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
        {format(new Date(event.date), "EEEE d MMMM, HH'h'mm", { locale: fr })}
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
          onClick={() => onEventAction(event)}
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
  );
};

export default EventCard;
