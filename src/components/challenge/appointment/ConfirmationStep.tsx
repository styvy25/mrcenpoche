
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { AppointmentRequest } from "../../quiz/types";

interface ConfirmationStepProps {
  date: Date | undefined;
  formData: Partial<AppointmentRequest>;
  onClose: () => void;
}

const ConfirmationStep = ({ date, formData, onClose }: ConfirmationStepProps) => {
  return (
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
};

export default ConfirmationStep;
