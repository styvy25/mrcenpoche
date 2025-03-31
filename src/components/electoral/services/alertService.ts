
import { useToast } from "@/hooks/use-toast";

export interface AlertData {
  description: string;
  location: string;
  mediaFile?: Blob;
  mediaType?: 'photo' | 'audio' | 'video' | null;
}

export interface FraudAlert {
  id: string;
  description: string;
  location: string;
  timestamp: Date;
  status: 'new' | 'pending' | 'resolved';
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video' | null;
}

export const submitAlert = async (alertData: AlertData): Promise<boolean> => {
  try {
    // Here, you could implement the actual API call
    console.log("Sending alert data:", alertData);
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a successful response
    return true;
  } catch (error) {
    console.error("Error submitting alert:", error);
    return false;
  }
};

export const updateRecording = async (
  recordingId: string,
  videoUrl: string,
  audioUrl: string,
  durationSeconds: number
): Promise<boolean> => {
  try {
    console.log(`Updating recording ${recordingId} with:`, {
      videoUrl,
      audioUrl,
      durationSeconds
    });
    
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error("Error updating recording:", error);
    return false;
  }
};

export const subscribeToFraudAlerts = (callback: (alerts: FraudAlert[]) => void): () => void => {
  // Simulate live alerts
  const interval = setInterval(() => {
    // Generate a random alert occasionally (1 in 10 chance)
    if (Math.random() > 0.9) {
      const mockAlert: FraudAlert = {
        id: `alert-${Date.now()}`,
        description: "Suspicion de bourrage d'urnes",
        location: "Douala, Cameroun",
        timestamp: new Date(),
        status: 'new',
        mediaType: Math.random() > 0.5 ? 'photo' : 'video'
      };
      
      callback([mockAlert]);
    }
  }, 30000); // Check every 30 seconds
  
  // Return an unsubscribe function
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
