
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppointmentRequest } from "../quiz/types";
import CalendarStep from "./appointment/CalendarStep";
import AppointmentForm from "./appointment/AppointmentForm";
import ConfirmationStep from "./appointment/ConfirmationStep";

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
    setFormData(prev => ({ ...prev, type: value }));
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

  return (
    <div className="bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
      <div className="p-6">
        {step === "calendar" && (
          <CalendarStep
            date={date}
            appointmentType={appointmentType}
            onDateSelect={handleDateSelect}
            onAppointmentTypeChange={handleAppointmentTypeChange}
            onClose={onClose}
          />
        )}
        
        {step === "form" && (
          <AppointmentForm
            date={date}
            formData={formData}
            onInputChange={handleInputChange}
            onTopicChange={handleTopicChange}
            onSubmit={handleSubmit}
            onBack={() => setStep("calendar")}
          />
        )}
        
        {step === "confirmation" && (
          <ConfirmationStep
            date={date}
            formData={formData}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentScheduler;
