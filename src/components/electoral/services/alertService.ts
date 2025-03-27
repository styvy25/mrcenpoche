
import { toast } from "@/hooks/use-toast";

export interface AlertData {
  description: string;
  location: string;
  mediaFile?: Blob;
  mediaType?: 'photo' | 'audio';
}

export interface FraudAlert {
  id: string;
  description: string;
  location: string;
  mediaUrl?: string | null;
  mediaType?: 'photo' | 'audio' | null;
  timestamp: string;
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
      description: "Votre signalement a été enregistré et sera examiné rapidement."
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

// Fonction pour s'abonner aux alertes de fraude en temps réel
export const subscribeToFraudAlerts = (callback: (alert: FraudAlert) => void) => {
  // Simulation d'un système d'abonnement en temps réel
  const interval = setInterval(() => {
    // Environ 10% de chance de recevoir une alerte simulée
    if (Math.random() < 0.1) {
      const simulatedAlert: FraudAlert = {
        id: Math.random().toString(36).substring(2, 15),
        description: "Comportement suspect observé lors du vote. Plusieurs personnes semblent voter plusieurs fois.",
        location: "Bureau de vote #" + Math.floor(Math.random() * 100),
        mediaType: Math.random() > 0.5 ? 'photo' : 'audio',
        mediaUrl: Math.random() > 0.5 ? "https://example.com/evidence.jpg" : null,
        timestamp: new Date().toISOString()
      };
      
      callback(simulatedAlert);
    }
  }, 60000); // Vérifier toutes les minutes
  
  // Fonction pour se désabonner
  return () => {
    clearInterval(interval);
  };
};

// Fonction pour mettre à jour un enregistrement
export const updateRecording = async (
  recordingId: string,
  videoUrl: string,
  audioUrl: string,
  durationSeconds: number
): Promise<boolean> => {
  try {
    console.log("Updating recording:", {
      recordingId,
      videoUrl,
      audioUrl,
      durationSeconds
    });
    
    // Simulation d'une requête de mise à jour
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulation de succès
    return true;
  } catch (error) {
    console.error("Error updating recording:", error);
    return false;
  }
};
