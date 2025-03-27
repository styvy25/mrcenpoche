
import { toast } from "@/hooks/use-toast";

export interface AlertData {
  description: string;
  location: string;
  mediaFile?: Blob;
  mediaType?: 'photo' | 'audio';
}

export const submitAlert = async (data: AlertData): Promise<boolean> => {
  try {
    // Simulation de l'envoi d'alerte à un backend
    console.log("Submitting alert data:", data);
    
    // Attendre pour simuler une requête réseau
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulation de succès
    toast({
      title: "Alerte soumise avec succès",
      description: "Votre signalement a été enregistré et sera examiné rapidement.",
      variant: "default"
    });
    
    return true;
  } catch (error) {
    console.error("Error submitting alert:", error);
    
    toast({
      title: "Erreur lors de l'envoi",
      description: "Une erreur s'est produite lors de l'envoi de votre alerte. Veuillez réessayer plus tard.",
      variant: "destructive"
    });
    
    return false;
  }
};
