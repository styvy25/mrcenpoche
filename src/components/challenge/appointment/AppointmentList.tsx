
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock } from "lucide-react";
import { Appointment } from "../../quiz/types";
import { useToast } from "@/hooks/use-toast";

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  const { toast } = useToast();

  const handleJoinPublicSession = (appointment: Appointment) => {
    if (appointment.isVirtual && appointment.link) {
      window.open(appointment.link, "_blank");
    } else {
      toast({
        title: "Information de session",
        description: `Cette session se tiendra à ${appointment.location} le ${format(new Date(appointment.date), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}`,
      });
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-sm font-medium">Sessions publiques à venir</h3>
      <div className="space-y-3">
        {appointments.map(appointment => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <CardTitle className="text-base">{appointment.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {format(new Date(appointment.date), "dd MMMM yyyy 'à' HH'h'mm", { locale: fr })}
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
};

export default AppointmentList;
