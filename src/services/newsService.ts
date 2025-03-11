
import { getPerplexityResponse } from "@/components/assistant/services/perplexityService";

// Types for news articles
export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  timestamp: Date;
  source?: string;
  imageUrl?: string;
  tags?: string[];
}

// Get API key from localStorage
const getPerplexityApiKey = (): string | null => {
  try {
    const apiKeys = localStorage.getItem("api_keys");
    if (apiKeys) {
      const keys = JSON.parse(apiKeys);
      return keys.perplexity || null;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving Perplexity API key:", error);
    return null;
  }
};

// Generate editorial content from recent events
export const generateEditorial = async (topic: string): Promise<string | null> => {
  const apiKey = getPerplexityApiKey();
  
  if (!apiKey) {
    console.error("Perplexity API key not found");
    return null;
  }

  try {
    const prompt = `Rédige un éditorial journalistique sur ce sujet: "${topic}". 
    L'éditorial doit faire environ 500 mots, adopter un ton professionnel et journalistique,
    inclure une introduction engageante, un développement avec des points clés et une conclusion.
    L'éditorial doit être objectif tout en présentant une analyse approfondie.
    Écris en français dans un style approprié pour le journal du MRC (Mouvement pour la Renaissance du Cameroun).`;

    const response = await getPerplexityResponse(apiKey, prompt);
    return response;
  } catch (error) {
    console.error("Error generating editorial:", error);
    return null;
  }
};

// Mock data for recent news articles
const mockNewsData: NewsArticle[] = [
  {
    id: "1",
    title: "Réunion des membres du MRC à Yaoundé",
    content: "Une importante réunion des membres du MRC s'est tenue hier à Yaoundé pour discuter des stratégies à adopter en vue des prochaines échéances électorales...",
    summary: "Compte-rendu de la réunion stratégique du MRC à Yaoundé",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    source: "Bureau politique du MRC",
    tags: ["Réunion", "Stratégie", "Yaoundé"]
  },
  {
    id: "2",
    title: "Campagne de sensibilisation dans la région de l'Ouest",
    content: "Le MRC a lancé une campagne de sensibilisation dans plusieurs villes de la région de l'Ouest pour informer les citoyens de leurs droits et du programme du parti...",
    summary: "Le MRC sensibilise les citoyens dans la région de l'Ouest",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    source: "Coordination régionale MRC-Ouest",
    tags: ["Campagne", "Sensibilisation", "Région Ouest"]
  },
  {
    id: "3",
    title: "Déclaration sur la situation économique nationale",
    content: "Dans un communiqué publié ce matin, le MRC a exprimé ses préoccupations concernant la situation économique du pays et a proposé des mesures alternatives...",
    summary: "Le MRC commente la situation économique et propose des solutions",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    source: "Porte-parole du MRC",
    tags: ["Économie", "Communiqué", "Politique"]
  },
];

// Get all news articles (mock data for now)
export const getNewsArticles = (): NewsArticle[] => {
  return mockNewsData;
};

// Get the latest editorial
export const getLatestEditorial = async (): Promise<NewsArticle | null> => {
  // Check if 5 hours have passed since the last editorial
  const lastEditorialTime = localStorage.getItem("lastEditorialTime");
  const currentTime = new Date().getTime();
  
  if (lastEditorialTime && currentTime - parseInt(lastEditorialTime) < 5 * 60 * 60 * 1000) {
    // Less than 5 hours, return the stored editorial if available
    const storedEditorial = localStorage.getItem("latestEditorial");
    if (storedEditorial) {
      return JSON.parse(storedEditorial);
    }
  }
  
  // Generate a new editorial
  try {
    const topic = "Actualités politiques au Cameroun et actions du MRC";
    const content = await generateEditorial(topic);
    
    if (!content) return null;
    
    const editorial: NewsArticle = {
      id: `editorial-${Date.now()}`,
      title: "Éditorial: Regard sur l'actualité politique au Cameroun",
      content: content,
      summary: "Analyse de la situation politique actuelle et perspectives pour le MRC",
      timestamp: new Date(),
      source: "IA Styvy237",
      tags: ["Éditorial", "Analyse", "Politique"]
    };
    
    // Store the new editorial and its timestamp
    localStorage.setItem("latestEditorial", JSON.stringify(editorial));
    localStorage.setItem("lastEditorialTime", currentTime.toString());
    
    return editorial;
  } catch (error) {
    console.error("Error in getLatestEditorial:", error);
    return null;
  }
};
