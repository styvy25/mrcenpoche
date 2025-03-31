
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  QuizResult, 
  BadgeProps, 
  QuizUserStats 
} from '@/components/quiz/types';

// Définition des types de points et récompenses
export enum PointsActionType {
  QUIZ_COMPLETED = 'QUIZ_COMPLETED',
  QUIZ_PERFECT_SCORE = 'QUIZ_PERFECT_SCORE',
  DAILY_CHALLENGE = 'DAILY_CHALLENGE',
  LEARNING_STREAK = 'LEARNING_STREAK',
  MODULE_COMPLETED = 'MODULE_COMPLETED',
  FIRST_LOGIN_OF_DAY = 'FIRST_LOGIN_OF_DAY',
  PROFILE_COMPLETED = 'PROFILE_COMPLETED',
  CONTENT_SHARED = 'CONTENT_SHARED'
}

// Configuration des points pour chaque action
export const POINTS_CONFIG = {
  [PointsActionType.QUIZ_COMPLETED]: 10,
  [PointsActionType.QUIZ_PERFECT_SCORE]: 25,
  [PointsActionType.DAILY_CHALLENGE]: 15,
  [PointsActionType.LEARNING_STREAK]: 5, // Par jour de streak
  [PointsActionType.MODULE_COMPLETED]: 30,
  [PointsActionType.FIRST_LOGIN_OF_DAY]: 3,
  [PointsActionType.PROFILE_COMPLETED]: 20,
  [PointsActionType.CONTENT_SHARED]: 5
};

// Gestion des niveaux
export const LEVELS = [
  { level: 1, pointsRequired: 0, title: "Débutant" },
  { level: 2, pointsRequired: 100, title: "Apprenti" },
  { level: 3, pointsRequired: 300, title: "Initié" },
  { level: 4, pointsRequired: 600, title: "Éclaireur" },
  { level: 5, pointsRequired: 1000, title: "Expert" },
  { level: 6, pointsRequired: 1500, title: "Maître" },
  { level: 7, pointsRequired: 2500, title: "Champion" },
  { level: 8, pointsRequired: 4000, title: "Légende" },
  { level: 9, pointsRequired: 6000, title: "Sage" },
  { level: 10, pointsRequired: 10000, title: "Érudit" }
];

// Sauvegarde des données dans localStorage
export const saveUserPoints = (userId: string, points: number): void => {
  localStorage.setItem(`user_points_${userId}`, points.toString());
};

export const getUserPoints = (userId: string): number => {
  const points = localStorage.getItem(`user_points_${userId}`);
  return points ? parseInt(points) : 0;
};

export const saveUserBadges = (userId: string, badges: BadgeProps[]): void => {
  localStorage.setItem(`user_badges_${userId}`, JSON.stringify(badges));
};

export const getUserBadges = (userId: string): BadgeProps[] => {
  const badges = localStorage.getItem(`user_badges_${userId}`);
  return badges ? JSON.parse(badges) : [];
};

// Sauvegarde des statistiques utilisateur
export const saveUserStats = (userId: string, stats: QuizUserStats): void => {
  localStorage.setItem(`user_stats_${userId}`, JSON.stringify(stats));
};

export const getUserStats = (userId: string): QuizUserStats => {
  const defaultStats: QuizUserStats = {
    completedQuizzes: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    streakDays: 0,
    badges: []
  };
  
  const stats = localStorage.getItem(`user_stats_${userId}`);
  return stats ? JSON.parse(stats) : defaultStats;
};

// Fonctions pour ajouter des points
export const addPoints = (userId: string, actionType: PointsActionType, quantity: number = 1): number => {
  const pointsToAdd = POINTS_CONFIG[actionType] * quantity;
  const currentPoints = getUserPoints(userId);
  const newPoints = currentPoints + pointsToAdd;
  
  saveUserPoints(userId, newPoints);
  return newPoints;
};

// Calcul du niveau actuel
export const calculateUserLevel = (points: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (points >= LEVELS[i].pointsRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

// Hook pour utiliser la gamification
export const useGamification = (userId: string) => {
  const [points, setPoints] = useState(getUserPoints(userId));
  const [level, setLevel] = useState(calculateUserLevel(points));
  const [badges, setBadges] = useState<BadgeProps[]>(getUserBadges(userId));
  const [stats, setStats] = useState<QuizUserStats>(getUserStats(userId));
  const [newAchievements, setNewAchievements] = useState<BadgeProps[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Mise à jour du niveau quand les points changent
    setLevel(calculateUserLevel(points));
  }, [points]);

  const addUserPoints = (actionType: PointsActionType, quantity: number = 1) => {
    const newPoints = addPoints(userId, actionType, quantity);
    const previousLevel = level;
    const newLevel = calculateUserLevel(newPoints);
    
    setPoints(newPoints);
    
    // Vérifier si l'utilisateur a monté de niveau
    if (newLevel.level > previousLevel.level) {
      toast({
        title: "Niveau supérieur atteint !",
        description: `Félicitations ! Vous êtes maintenant ${newLevel.title} (niveau ${newLevel.level})`,
      });
    }
    
    return newPoints;
  };

  const addBadge = (badge: BadgeProps) => {
    // Vérifier si le badge existe déjà
    if (!badges.some(b => b.id === badge.id)) {
      const updatedBadges = [...badges, { ...badge, earnedAt: new Date() }];
      setBadges(updatedBadges);
      setNewAchievements([...newAchievements, badge]);
      saveUserBadges(userId, updatedBadges);
      
      toast({
        title: "Nouveau badge débloqué !",
        description: `Vous avez obtenu le badge : ${badge.name}`,
      });
      
      // Attribuer des points pour le badge
      addUserPoints(PointsActionType.QUIZ_COMPLETED);
    }
  };

  const updateStats = (newStats: Partial<QuizUserStats>) => {
    const updatedStats = { ...stats, ...newStats };
    setStats(updatedStats);
    saveUserStats(userId, updatedStats);
    return updatedStats;
  };

  const handleQuizCompletion = (result: QuizResult) => {
    // Mettre à jour les statistiques
    const updatedStats = updateStats({
      completedQuizzes: stats.completedQuizzes + 1,
      correctAnswers: stats.correctAnswers + result.correctAnswers,
      totalQuestions: stats.totalQuestions + result.totalQuestions
    });
    
    // Ajouter des points pour avoir terminé le quiz
    addUserPoints(PointsActionType.QUIZ_COMPLETED);
    
    // Si score parfait, ajouter des points bonus
    if (result.correctAnswers === result.totalQuestions) {
      addUserPoints(PointsActionType.QUIZ_PERFECT_SCORE);
    }
    
    // Vérifier et attribuer des badges si nécessaire
    if (result.unlockedBadges) {
      result.unlockedBadges.forEach(badge => addBadge(badge));
    }
    
    // Vérifier les badges basés sur les statistiques globales
    checkStatBasedBadges(updatedStats);
  };
  
  const checkStatBasedBadges = (updatedStats: QuizUserStats) => {
    // Exemple de vérification des badges basés sur les statistiques
    if (updatedStats.completedQuizzes >= 10 && !badges.some(b => b.id === 'quiz_master')) {
      addBadge({
        id: 'quiz_master',
        name: 'Maître des quiz',
        description: 'Complétez 10 quiz',
        category: 'achievement'
      });
    }
    
    if (updatedStats.streakDays >= 7 && !badges.some(b => b.id === 'weekly_learner')) {
      addBadge({
        id: 'weekly_learner',
        name: 'Apprenant hebdomadaire',
        description: 'Maintenez une série d\'apprentissage de 7 jours',
        category: 'streak'
      });
    }
  };
  
  return {
    points,
    level,
    badges,
    stats,
    newAchievements,
    addPoints: addUserPoints,
    addBadge,
    updateStats,
    handleQuizCompletion,
    clearNewAchievements: () => setNewAchievements([])
  };
};
