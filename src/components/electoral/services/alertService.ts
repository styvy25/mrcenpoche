
import { v4 as uuidv4 } from 'uuid';

export interface FraudAlert {
  id: string;
  description: string;
  location: string;
  timestamp: number;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio' | 'video';
  status: 'pending' | 'reviewing' | 'confirmed' | 'rejected';
  userId?: string;
}

// Stockage local des alertes
let alerts: FraudAlert[] = [];

// Liste des abonnés
let subscribers: ((alert: FraudAlert) => void)[] = [];

// Fonction pour simuler l'envoi d'une alerte
export const submitFraudAlert = async (
  description: string,
  location: string,
  mediaFile?: Blob,
  mediaType?: 'photo' | 'audio'
): Promise<{ success: boolean; alertId?: string; error?: string }> => {
  try {
    // Simulation d'un délai réseau
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    let mediaUrl: string | undefined;
    
    // Si un fichier média est fourni, simuler son téléchargement
    if (mediaFile) {
      // Convertir le blob en URL de données (data URL)
      mediaUrl = await blobToDataURL(mediaFile);
    }
    
    // Créer une nouvelle alerte
    const newAlert: FraudAlert = {
      id: uuidv4(),
      description,
      location,
      timestamp: Date.now(),
      mediaUrl,
      mediaType,
      status: 'pending',
      userId: 'user-123' // ID utilisateur simulé
    };
    
    // Ajouter l'alerte à notre stockage local
    alerts.push(newAlert);
    
    // Notifier tous les abonnés
    subscribers.forEach((callback) => callback(newAlert));
    
    return { success: true, alertId: newAlert.id };
  } catch (error) {
    console.error('Error submitting fraud alert:', error);
    return { success: false, error: 'Une erreur est survenue lors de l\'envoi de l\'alerte' };
  }
};

// Fonction pour s'abonner aux alertes de fraude
export const subscribeToFraudAlerts = (callback: (alert: FraudAlert) => void) => {
  subscribers.push(callback);
  
  // Retourner une fonction de désabonnement
  return () => {
    subscribers = subscribers.filter((sub) => sub !== callback);
  };
};

// Fonction auxiliaire pour convertir un Blob en data URL
const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to convert blob to data URL'));
    reader.readAsDataURL(blob);
  });
};

// Fonction pour récupérer une alerte par ID
export const getFraudAlertById = (id: string): FraudAlert | undefined => {
  return alerts.find((alert) => alert.id === id);
};

// Fonction pour récupérer toutes les alertes (avec pagination et filtrage basique)
export const getFraudAlerts = (
  page = 1,
  limit = 10,
  status?: 'pending' | 'reviewing' | 'confirmed' | 'rejected'
): { alerts: FraudAlert[]; total: number } => {
  let filteredAlerts = [...alerts];
  
  // Filtrer par statut si spécifié
  if (status) {
    filteredAlerts = filteredAlerts.filter((alert) => alert.status === status);
  }
  
  // Trier par timestamp (plus récent d'abord)
  filteredAlerts.sort((a, b) => b.timestamp - a.timestamp);
  
  // Calculer les indices pour la pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // Extraire les alertes pour la page demandée
  const paginatedAlerts = filteredAlerts.slice(startIndex, endIndex);
  
  return {
    alerts: paginatedAlerts,
    total: filteredAlerts.length
  };
};

// Simuler quelques alertes initiales
const initializeMockAlerts = () => {
  const mockAlerts: FraudAlert[] = [
    {
      id: uuidv4(),
      description: 'Observation de bulletins pré-remplis dans un bureau de vote à Yaoundé.',
      location: 'Yaoundé, Centre',
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 heures avant
      status: 'confirmed'
    },
    {
      id: uuidv4(),
      description: 'Urne non scellée observée dans un bureau de vote à Douala.',
      location: 'Douala, Littoral',
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 heures avant
      status: 'reviewing'
    },
    {
      id: uuidv4(),
      description: 'Personnes non inscrites autorisées à voter à Bamenda.',
      location: 'Bamenda, Nord-Ouest',
      timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 heures avant
      status: 'pending'
    }
  ];
  
  alerts = [...mockAlerts];
};

// Initialiser des alertes fictives
initializeMockAlerts();
