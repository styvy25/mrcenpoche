
import { useToast } from "@/hooks/use-toast";

export interface AlertData {
  description: string;
  location: string;
  mediaFile?: Blob;
  mediaType?: 'photo' | 'audio' | null;
}

export interface FraudAlert {
  id: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'new' | 'pending' | 'resolved';
  mediaUrl?: string;
}

export const submitAlert = async (alertData: AlertData): Promise<boolean> => {
  try {
    // Ici, vous pourriez implémenter l'envoi réel à une API
    console.log("Sending alert data:", alertData);
    
    // Simuler une requête réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simuler une réponse réussie
    return true;
  } catch (error) {
    console.error("Error submitting alert:", error);
    return false;
  }
};

export const updateRecording = async (recordingId: string, data: any): Promise<boolean> => {
  try {
    console.log(`Updating recording ${recordingId} with data:`, data);
    
    // Simuler une requête réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error("Error updating recording:", error);
    return false;
  }
};

export const subscribeToFraudAlerts = (callback: (alerts: FraudAlert[]) => void): () => void => {
  // Simuler des alertes en direct
  const interval = setInterval(() => {
    // Générer une alerte aléatoire de manière occasionnelle (1 chance sur 10)
    if (Math.random() > 0.9) {
      const mockAlert: FraudAlert = {
        id: `alert-${Date.now()}`,
        description: "Suspicion de bourrage d'urnes",
        location: "Douala, Cameroun",
        timestamp: new Date(),
        status: 'new'
      };
      
      callback([mockAlert]);
    }
  }, 30000); // Vérifier toutes les 30 secondes
  
  // Retourner une fonction pour se désabonner
  return () => clearInterval(interval);
};

export const useAlertService = () => {
  const { toast } = useToast();
  
  const sendAlert = async (alertData: AlertData) => {
    try {
      const success = await submitAlert(alertData);
      
      if (success) {
        toast({
          title: "Alerte envoyée",
          description: "Votre alerte a été transmise avec succès.",
        });
        return true;
      } else {
        toast({
          title: "Échec d'envoi",
          description: "L'alerte n'a pas pu être envoyée. Veuillez réessayer.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de l'alerte.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return { sendAlert };
};
