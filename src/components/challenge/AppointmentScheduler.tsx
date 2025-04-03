
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Appointment, AppointmentRequest, AppointmentType } from "../quiz/types";
import CalendarStep from "./appointment/CalendarStep";
import AppointmentForm from "./appointment/AppointmentForm";
import ConfirmationStep from "./appointment/ConfirmationStep";

interface AppointmentSchedulerProps {
  onClose: () => void;
}

const AppointmentScheduler = ({ onClose }: AppointmentSchedulerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("10:00");
  const [step, setStep] = useState<"calendar" | "form" | "confirmation">("calendar");
  const [appointmentType, setAppointmentType] = useState<"private" | "public">("private");
  const [formData, setFormData] = useState<Partial<AppointmentRequest>>({
    topic: "",
    message: "",
    name: "",
    email: "",
    phone: "",
    type: "formation" // Using a valid AppointmentType value
  });
  const { toast } = useToast();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormData(prev => ({ ...prev, preferredDate: selectedDate }));
      setStep("form");
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleAppointmentTypeChange = (value: "private" | "public") => {
    setAppointmentType(value);
    // Convert to a valid AppointmentType value
    const appointmentTypeValue: AppointmentType = value === "private" ? "formation" : "reunion";
    setFormData(prev => ({ ...prev, type: appointmentTypeValue }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTopicChange = (value: string) => {
    setFormData(prev => ({ ...prev, topic: value }));
  };

  const handleSubmitAppointment = (appointment: Appointment) => {
    console.log("Appointment created:", appointment);
    
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
            selectedDate={date || new Date()}
            selectedTime={selectedTime}
            formData={formData}
            onInputChange={handleInputChange}
            onTopicChange={handleTopicChange}
            onSubmit={handleSubmitAppointment}
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
