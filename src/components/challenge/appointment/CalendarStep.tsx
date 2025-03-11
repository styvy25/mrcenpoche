
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { User, Users } from "lucide-react";
import AppointmentList from "./AppointmentList";
import { UPCOMING_APPOINTMENTS } from "./appointmentData";

interface CalendarStepProps {
  date: Date | undefined;
  appointmentType: "private" | "public";
  onDateSelect: (date: Date | undefined) => void;
  onAppointmentTypeChange: (value: "private" | "public") => void;
  onClose: () => void;
}

const CalendarStep = ({
  date,
  appointmentType,
  onDateSelect,
  onAppointmentTypeChange,
  onClose
}: CalendarStepProps) => {
  return (
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
            onValueChange={(value) => onAppointmentTypeChange(value as "private" | "public")}
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
            onSelect={onDateSelect}
            className="rounded-md border shadow p-3"
            disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
          />
        </div>
        
        <AppointmentList appointments={UPCOMING_APPOINTMENTS} />
      </div>
    </div>
  );
};

export default CalendarStep;
