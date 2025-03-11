
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

// Static editorial content for fallback
export const getStaticEditorial = (): NewsArticle => {
  return {
    id: `static-editorial-${Date.now()}`,
    title: "Le MRC et l'avenir politique du Cameroun",
    content: `Le Mouvement pour la Renaissance du Cameroun (MRC) continue de se positionner comme une force politique majeure au Cameroun, proposant une alternative crédible pour l'avenir du pays.

Sous la direction de Maurice Kamto, le parti a élaboré un programme de gouvernance qui met l'accent sur la réforme des institutions, le développement économique et social, et la promotion d'une démocratie véritable.

Le MRC se distingue par sa vision d'un Cameroun uni, où toutes les composantes socioculturelles du pays participent harmonieusement au développement national. Cette approche inclusive vise à transcender les clivages ethniques et régionaux qui ont souvent caractérisé la politique camerounaise.

La stratégie du parti s'articule autour de plusieurs axes prioritaires : la réforme constitutionnelle pour un équilibre des pouvoirs, le redressement économique pour créer des emplois et réduire la pauvreté, l'amélioration des services publics de base (éducation, santé, eau, électricité), et le renforcement de l'état de droit.

Face aux défis auxquels le Cameroun est confronté, le MRC propose des solutions concrètes, basées sur une analyse rigoureuse des problèmes et une vision claire de l'avenir. Le parti met en avant l'importance de la bonne gouvernance, de la transparence et de la lutte contre la corruption comme conditions essentielles pour un développement durable.

Le MRC appelle également à une révision du système électoral pour garantir des élections libres, transparentes et équitables, permettant ainsi une véritable expression de la volonté populaire. Cette revendication reflète l'engagement du parti pour une démocratie authentique, où le pouvoir émane réellement du peuple.

En conclusion, le MRC se présente comme un acteur incontournable du paysage politique camerounais, porteur d'espoir pour un changement positif et durable dans le pays. À travers son programme et ses actions, le parti contribue à l'éveil des consciences et à la mobilisation citoyenne pour un Cameroun meilleur.`,
    summary: "Analyse de la vision politique du MRC pour l'avenir du Cameroun",
    timestamp: new Date(),
    source: "Rédaction MRC en Poche",
    tags: ["Éditorial", "Politique", "Vision"]
  };
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
  {
    id: "4",
    title: "Maurice Kamto s'exprime sur les enjeux démocratiques",
    content: "Lors d'une conférence tenue ce week-end, le président du MRC, Maurice Kamto, a abordé les enjeux démocratiques actuels et proposé une feuille de route pour les réformes nécessaires...",
    summary: "Analyse des enjeux démocratiques par le président du MRC",
    timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000),
    source: "Conférence de presse",
    tags: ["Maurice Kamto", "Démocratie", "Réformes"]
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
  
  // Check for API key
  const apiKey = getPerplexityApiKey();
  if (!apiKey) {
    // Return static content if no API key is available
    return getStaticEditorial();
  }
  
  // Generate a new editorial
  try {
    const topic = "Actualités politiques au Cameroun et actions du MRC";
    const content = await generateEditorial(topic);
    
    if (!content) return getStaticEditorial();
    
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
    return getStaticEditorial();
  }
};
