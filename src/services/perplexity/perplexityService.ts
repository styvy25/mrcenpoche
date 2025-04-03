
import { supabase } from '@/integrations/supabase/client';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

/**
 * Generate a political quiz using Perplexity AI
 */
export const generatePoliticalQuiz = async (category: string = "actualité politique"): Promise<Quiz | null> => {
  try {
    const { data, error } = await supabase.functions.invoke('perplexity-service', {
      body: {
        action: 'generateQuiz',
        category
      }
    });
    
    if (error) {
      console.error("Error generating quiz:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

/**
 * Generate personalized political training content based on quiz results
 */
export const generateTrainingContent = async (
  quizResults: { score: number, weakCategories: string[] }
): Promise<{ title: string, content: string, exercises: string[] } | null> => {
  try {
    const prompt = `
      Basé sur ces résultats de quiz: score de ${quizResults.score}%, 
      avec des faiblesses dans les catégories suivantes: ${quizResults.weakCategories.join(', ')},
      génère un module de formation personnalisé pour un militant du MRC.
      
      Inclus:
      1. Un titre engageant
      2. Un contenu détaillé (environ 300 mots) sur les sujets où l'utilisateur a des faiblesses
      3. Trois exercices pratiques pour renforcer sa compréhension
      
      Formate la réponse en JSON avec ce format:
      {
        "title": "Titre du module",
        "content": "Contenu détaillé...",
        "exercises": ["Exercice 1", "Exercice 2", "Exercice 3"]
      }
    `;
    
    const { data, error } = await supabase.functions.invoke('perplexity-service', {
      body: {
        action: 'analyzeResponse',
        prompt
      }
    });
    
    if (error) {
      console.error("Error generating training content:", error);
      return null;
    }
    
    return data.response;
  } catch (error) {
    console.error("Error generating training content:", error);
    return null;
  }
};

/**
 * Analyze current political trends and compare MRC promises to government actions
 */
export const analyzeCurrentPolitics = async (): Promise<string> => {
  try {
    const prompt = `
      Analyse l'actualité politique camerounaise récente et compare les promesses du MRC 
      (Mouvement pour la Renaissance du Cameroun) avec les actions du gouvernement actuel.
      
      Concentre-toi sur:
      1. Les initiatives de décentralisation
      2. Les mesures de transparence
      3. Les propositions économiques
      
      Présente ton analyse de façon factuelle et équilibrée.
    `;
    
    const { data, error } = await supabase.functions.invoke('perplexity-service', {
      body: {
        action: 'analyzeResponse',
        prompt
      }
    });
    
    if (error) {
      console.error("Error analyzing politics:", error);
      return "Analyse indisponible. Veuillez réessayer plus tard.";
    }
    
    return data.response;
  } catch (error) {
    console.error("Error analyzing politics:", error);
    return "Analyse indisponible. Veuillez réessayer plus tard.";
  }
};
