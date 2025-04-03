
import { Module } from "@/components/modules/types";
import { QuizSubmission } from "@/components/modules/types";
import { modules } from "@/components/modules/data/modules";

// User skill assessment based on quiz results
interface SkillAssessment {
  history: number;
  mobilization: number;
  communication: number;
  strategy: number;
  politics: number;
  overall: number;
}

// Analyze quiz submissions to determine user strengths and weaknesses
export const analyzeUserSkills = (submissions: QuizSubmission[]): SkillAssessment => {
  // Default assessment if no submissions
  if (!submissions || submissions.length === 0) {
    return {
      history: 0.5,
      mobilization: 0.5,
      communication: 0.5, 
      strategy: 0.5,
      politics: 0.5,
      overall: 0.5
    };
  }

  // Calculate scores for different skills based on submissions
  let historyScore = 0;
  let mobilizationScore = 0;
  let communicationScore = 0;
  let strategyScore = 0;
  let politicsScore = 0;
  let totalQuestions = 0;
  let correctAnswers = 0;

  submissions.forEach(submission => {
    const moduleId = submission.moduleId;
    const score = submission.score;
    
    // Increment overall score
    totalQuestions += submission.totalQuestions;
    correctAnswers += Math.round(submission.score * submission.totalQuestions / 100);
    
    // Increment specific skill based on module
    switch(moduleId) {
      case "histoire":
        historyScore = score / 100;
        break;
      case "mobilisation":
        mobilizationScore = score / 100;
        break;
      case "communication":
        communicationScore = score / 100;
        break;
      case "campagne":
        strategyScore = score / 100;
        break;
      case "enjeux":
        politicsScore = score / 100;
        break;
      default:
        // For unknown modules, distribute evenly
        historyScore += score / 500;
        mobilizationScore += score / 500;
        communicationScore += score / 500;
        strategyScore += score / 500;
        politicsScore += score / 500;
    }
  });
  
  // Fill in missing scores with average
  const submittedSkills = [
    historyScore > 0, 
    mobilizationScore > 0, 
    communicationScore > 0,
    strategyScore > 0,
    politicsScore > 0
  ].filter(Boolean).length;
  
  const overallScore = totalQuestions > 0 ? correctAnswers / totalQuestions : 0.5;
  
  // If no data for a skill, use overall score
  if (historyScore === 0) historyScore = overallScore;
  if (mobilizationScore === 0) mobilizationScore = overallScore;
  if (communicationScore === 0) communicationScore = overallScore;
  if (strategyScore === 0) strategyScore = overallScore;
  if (politicsScore === 0) politicsScore = overallScore;

  return {
    history: historyScore,
    mobilization: mobilizationScore,
    communication: communicationScore,
    strategy: strategyScore,
    politics: politicsScore,
    overall: overallScore
  };
};

// Get personalized module recommendations based on user skills
export const getPersonalizedRecommendations = (
  skills: SkillAssessment,
  completedModuleIds: string[] = []
): Module[] => {
  const recommendations: Module[] = [];
  
  // Find lowest skill to prioritize
  const skillsArray = [
    { name: "history", value: skills.history },
    { name: "mobilization", value: skills.mobilization },
    { name: "communication", value: skills.communication },
    { name: "strategy", value: skills.strategy },
    { name: "politics", value: skills.politics }
  ];
  
  // Sort skills from lowest to highest
  skillsArray.sort((a, b) => a.value - b.value);
  
  // Get modules that haven't been completed
  const availableModules = modules.filter(module => 
    !completedModuleIds.includes(module.id)
  );
  
  // Recommendation based on weakest skill
  if (skillsArray[0].value < 0.6) {
    const weakestSkill = skillsArray[0].name;
    let recommendedModule;
    
    switch (weakestSkill) {
      case "history":
        recommendedModule = availableModules.find(m => m.id === "histoire");
        break;
      case "mobilization":
        recommendedModule = availableModules.find(m => m.id === "mobilisation");
        break;
      case "communication":
        recommendedModule = availableModules.find(m => m.id === "communication");
        break;
      case "strategy":
        recommendedModule = availableModules.find(m => m.id === "campagne");
        break;
      case "politics":
        recommendedModule = availableModules.find(m => m.id === "enjeux");
        break;
    }
    
    if (recommendedModule) {
      const moduleWithReason = {
        ...recommendedModule,
        priority: "high" as const,
        reason: `Ce module renforcera vos connaissances en ${getSkillName(weakestSkill)}, votre point le plus faible.`
      };
      recommendations.push(moduleWithReason);
    }
  }
  
  // Add a module for intermediate skill
  if (skillsArray[2].value >= 0.4 && skillsArray[2].value <= 0.7) {
    const intermediateSkill = skillsArray[2].name;
    let intermediateModule;
    
    switch (intermediateSkill) {
      case "history":
        intermediateModule = availableModules.find(m => m.id === "histoire" && !recommendations.some(r => r.id === "histoire"));
        break;
      case "mobilization":
        intermediateModule = availableModules.find(m => m.id === "mobilisation" && !recommendations.some(r => r.id === "mobilisation"));
        break;
      case "communication":
        intermediateModule = availableModules.find(m => m.id === "communication" && !recommendations.some(r => r.id === "communication"));
        break;
      case "strategy":
        intermediateModule = availableModules.find(m => m.id === "campagne" && !recommendations.some(r => r.id === "campagne"));
        break;
      case "politics":
        intermediateModule = availableModules.find(m => m.id === "enjeux" && !recommendations.some(r => r.id === "enjeux"));
        break;
    }
    
    if (intermediateModule) {
      const moduleWithReason = {
        ...intermediateModule,
        priority: "medium" as const,
        reason: `Ce module vous aidera à améliorer vos compétences intermédiaires en ${getSkillName(intermediateSkill)}.`
      };
      recommendations.push(moduleWithReason);
    }
  }
  
  // Add a module for strongest skill to leverage strength
  if (skillsArray[4].value > 0.7) {
    const strongestSkill = skillsArray[4].name;
    let advancedModule;
    
    switch (strongestSkill) {
      case "history":
        advancedModule = availableModules.find(m => m.id === "histoire" && !recommendations.some(r => r.id === "histoire"));
        break;
      case "mobilization":
        advancedModule = availableModules.find(m => m.id === "mobilisation" && !recommendations.some(r => r.id === "mobilisation"));
        break;
      case "communication":
        advancedModule = availableModules.find(m => m.id === "communication" && !recommendations.some(r => r.id === "communication"));
        break;
      case "strategy":
        advancedModule = availableModules.find(m => m.id === "campagne" && !recommendations.some(r => r.id === "campagne"));
        break;
      case "politics":
        advancedModule = availableModules.find(m => m.id === "enjeux" && !recommendations.some(r => r.id === "enjeux"));
        break;
    }
    
    if (advancedModule) {
      const moduleWithReason = {
        ...advancedModule,
        priority: "low" as const,
        reason: `Ce module avancé vous permettra d'utiliser votre excellente maîtrise en ${getSkillName(strongestSkill)}.`
      };
      recommendations.push(moduleWithReason);
    }
  }
  
  // Add remaining modules if we don't have 3 recommendations yet
  if (recommendations.length < 3) {
    const remainingModules = availableModules.filter(
      module => !recommendations.some(rec => rec.id === module.id)
    );
    
    remainingModules.slice(0, 3 - recommendations.length).forEach(module => {
      const moduleWithReason = {
        ...module,
        priority: "low" as const,
        reason: "Ce module complètera bien votre formation générale."
      };
      recommendations.push(moduleWithReason);
    });
  }
  
  // If we still don't have recommendations, provide a default one
  if (recommendations.length === 0) {
    const defaultModule = modules.find(m => m.id === "histoire") || modules[0];
    const moduleWithReason = {
      ...defaultModule,
      priority: "medium" as const,
      reason: "Ce module fondamental est recommandé pour tous les membres du MRC."
    };
    recommendations.push(moduleWithReason);
  }
  
  return recommendations;
};

// Helper to get human-readable skill names
const getSkillName = (skill: string): string => {
  switch (skill) {
    case "history": return "histoire du MRC";
    case "mobilization": return "techniques de mobilisation";
    case "communication": return "communication politique";
    case "strategy": return "stratégie de campagne";
    case "politics": return "enjeux politiques";
    default: return skill;
  }
};
