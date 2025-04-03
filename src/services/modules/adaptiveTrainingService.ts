
import { supabase } from "@/integrations/supabase/client";
import { Module, QuizSubmission } from "@/components/modules/types";

/**
 * Service for handling adaptive training recommendations based on quiz results
 */

// Domain categories for training
export enum TrainingDomain {
  HISTORY = 'histoire',
  ECONOMY = 'economie',
  COMMUNICATION = 'communication',
  MOBILIZATION = 'mobilisation',
  IDEOLOGY = 'ideologie',
  STRATEGY = 'strategie',
  LEADERSHIP = 'leadership'
}

// Interface for a training recommendation
export interface TrainingRecommendation {
  domain: TrainingDomain;
  moduleIds: string[];
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

// Map quiz categories to training domains
const quizToTrainingDomainMap: Record<string, TrainingDomain> = {
  'histoire': TrainingDomain.HISTORY,
  'culture': TrainingDomain.HISTORY,
  'politique': TrainingDomain.IDEOLOGY,
  'economie': TrainingDomain.ECONOMY,
  'communication': TrainingDomain.COMMUNICATION,
  'mobilisation': TrainingDomain.MOBILIZATION,
  'strategie': TrainingDomain.STRATEGY,
  'leadership': TrainingDomain.LEADERSHIP
};

// Get domain from quiz category
const getDomainFromQuizCategory = (category: string): TrainingDomain => {
  const lowerCategory = category.toLowerCase();
  for (const [key, domain] of Object.entries(quizToTrainingDomainMap)) {
    if (lowerCategory.includes(key)) {
      return domain;
    }
  }
  return TrainingDomain.IDEOLOGY; // Default domain
};

/**
 * Generate training recommendations based on quiz results
 */
export const generateTrainingRecommendations = async (
  quizSubmissions: QuizSubmission[],
  availableModules: Module[]
): Promise<TrainingRecommendation[]> => {
  const recommendations: TrainingRecommendation[] = [];
  
  // Group submissions by moduleId for analysis
  const submissionsByModule: Record<string, QuizSubmission[]> = {};
  
  quizSubmissions.forEach(submission => {
    if (!submissionsByModule[submission.moduleId]) {
      submissionsByModule[submission.moduleId] = [];
    }
    submissionsByModule[submission.moduleId].push(submission);
  });
  
  // Analyze each module's submissions
  for (const [moduleId, submissions] of Object.entries(submissionsByModule)) {
    const module = availableModules.find(m => m.id === moduleId);
    if (!module) continue;
    
    const domain = getDomainFromQuizCategory(module.category);
    const averageScore = submissions.reduce((sum, s) => sum + s.score, 0) / submissions.length;
    
    // Find relevant modules for recommendation
    const relatedModules = availableModules.filter(m => {
      const moduleDomain = getDomainFromQuizCategory(m.category);
      return moduleDomain === domain && m.id !== moduleId;
    });
    
    const relatedModuleIds = relatedModules.map(m => m.id);
    
    // Determine priority based on average score
    let priority: 'high' | 'medium' | 'low' = 'medium';
    let reason = '';
    
    if (averageScore < 0.5) {
      priority = 'high';
      reason = `Vos scores dans le domaine ${domain} sont insuffisants et nécessitent une attention particulière`;
    } else if (averageScore < 0.7) {
      priority = 'medium';
      reason = `Des améliorations sont nécessaires dans le domaine ${domain}`;
    } else {
      priority = 'low';
      reason = `Vous avez de bonnes bases dans le domaine ${domain}, mais pouvez encore vous perfectionner`;
    }
    
    recommendations.push({
      domain,
      moduleIds: relatedModuleIds,
      priority,
      reason
    });
  }
  
  // Sort recommendations by priority
  return recommendations.sort((a, b) => {
    const priorityValues = { high: 3, medium: 2, low: 1 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });
};

/**
 * Save training recommendation to user profile
 * Note: This function is currently using a mock implementation
 * as the Supabase schema may not have a training_recommendations table
 */
export const saveTrainingRecommendations = async (
  recommendations: TrainingRecommendation[]
): Promise<boolean> => {
  try {
    console.log("Saving training recommendations:", recommendations);
    
    // In a real implementation, you would save to Supabase
    // For now, just log and return success
    return true;
  } catch (err) {
    console.error("Failed to save training recommendations:", err);
    return false;
  }
};

/**
 * Get personalized training path for user based on quiz results
 */
export const getPersonalizedTrainingPath = async (
  userId: string | undefined,
  quizResults: QuizSubmission[]
): Promise<Module[]> => {
  try {
    if (!userId) return [];
    
    // Mock implementation - in production this would fetch from Supabase
    const modules: Module[] = [
      {
        id: "histoire-101",
        title: "Histoire du MRC approfondie",
        description: "Comprendre les racines et l'évolution du mouvement",
        category: "histoire",
        duration: "2h 30min",
        level: "Intermédiaire",
        progress: 0,
        locked: false,
        priority: "high",
        reason: "Vos scores dans le domaine histoire sont insuffisants et nécessitent une attention particulière"
      },
      {
        id: "communication-202",
        title: "Communication politique avancée",
        description: "Maîtrisez l'art de la rhétorique et de la persuasion",
        category: "communication",
        duration: "3h 15min",
        level: "Avancé",
        progress: 0,
        locked: false,
        priority: "medium",
        reason: "Des améliorations sont nécessaires dans le domaine communication"
      },
      {
        id: "strategie-303",
        title: "Stratégies électorales",
        description: "Développez des stratégies gagnantes pour les élections",
        category: "strategie",
        duration: "4h 00min",
        level: "Expert",
        progress: 0,
        locked: false,
        priority: "low",
        reason: "Vous avez de bonnes bases dans ce domaine, mais pouvez encore vous perfectionner"
      }
    ];
    
    // Generate recommendations based on quiz results
    const recommendations = await generateTrainingRecommendations(quizResults, modules);
    
    // Save recommendations for later use
    await saveTrainingRecommendations(recommendations);
    
    // Return the modules with priority and reason info
    return modules;
  } catch (error) {
    console.error("Error generating personalized training path:", error);
    return [];
  }
};
