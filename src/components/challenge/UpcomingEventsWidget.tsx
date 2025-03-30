
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { UPCOMING_APPOINTMENTS } from "./appointment/appointmentData";
import EventsList from "./events/EventsList";
import SchedulerDialog from "./events/SchedulerDialog";
import { Appointment } from "../quiz/types";

const UpcomingEventsWidget = () => {
  const [showScheduler, setShowScheduler] = useState(false);
  const { toast } = useToast();

  const handleEventAction = (event: Appointment) => {
    if (event.isVirtual && event.link) {
      window.open(event.link, "_blank");
    } else {
      toast({
        title: "Information sur l'événement",
        description: `Cet événement se tiendra à ${event.location} le ${format(new Date(event.date), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}`,
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
        <EventsList 
          events={UPCOMING_APPOINTMENTS} 
          onEventAction={handleEventAction} 
        />
        
        <SchedulerDialog 
          isOpen={showScheduler} 
          onOpenChange={setShowScheduler} 
          onClose={() => setShowScheduler(false)} 
        />
      </CardContent>
    </Card>
  );
};

export default UpcomingEventsWidget;
