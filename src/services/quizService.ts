
import { QuizQuestion, QuizResult, QuizUserStats } from '@/components/quiz/types';

// Types pour le stockage des quiz
interface StoredQuiz {
  id: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
  lastUpdated: Date;
}

interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  date: Date;
  answers: string[];
  timeSpent: number; // en secondes
}

// Fonctions pour gérer les quiz
export const saveQuiz = (quiz: StoredQuiz): void => {
  const quizzes = getQuizzes();
  const existingIndex = quizzes.findIndex(q => q.id === quiz.id);
  
  if (existingIndex >= 0) {
    quizzes[existingIndex] = { ...quiz, lastUpdated: new Date() };
  } else {
    quizzes.push({ ...quiz, lastUpdated: new Date() });
  }
  
  localStorage.setItem('mrc_quizzes', JSON.stringify(quizzes));
};

export const getQuizzes = (): StoredQuiz[] => {
  const quizzes = localStorage.getItem('mrc_quizzes');
  return quizzes ? JSON.parse(quizzes) : [];
};

export const getQuizById = (quizId: string): StoredQuiz | undefined => {
  const quizzes = getQuizzes();
  return quizzes.find(q => q.id === quizId);
};

export const deleteQuiz = (quizId: string): void => {
  const quizzes = getQuizzes();
  const filteredQuizzes = quizzes.filter(q => q.id !== quizId);
  localStorage.setItem('mrc_quizzes', JSON.stringify(filteredQuizzes));
};

// Fonctions pour gérer les tentatives de quiz
export const saveQuizAttempt = (attempt: QuizAttempt): void => {
  const attempts = getQuizAttempts();
  attempts.push(attempt);
  localStorage.setItem('mrc_quiz_attempts', JSON.stringify(attempts));
  
  // Mettre à jour les statistiques de l'utilisateur
  updateUserStats(attempt);
};

export const getQuizAttempts = (): QuizAttempt[] => {
  const attempts = localStorage.getItem('mrc_quiz_attempts');
  return attempts ? JSON.parse(attempts) : [];
};

export const getUserQuizAttempts = (userId: string): QuizAttempt[] => {
  const attempts = getQuizAttempts();
  return attempts.filter(a => a.userId === userId);
};

// Fonctions pour gérer les statistiques
const updateUserStats = (attempt: QuizAttempt): void => {
  const statsKey = `mrc_quiz_stats_${attempt.userId}`;
  const existingStatsJson = localStorage.getItem(statsKey);
  const existingStats: QuizUserStats = existingStatsJson 
    ? JSON.parse(existingStatsJson) 
    : {
        completedQuizzes: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        streakDays: 0,
        badges: []
      };
  
  // Mettre à jour les statistiques
  const updatedStats: QuizUserStats = {
    ...existingStats,
    completedQuizzes: existingStats.completedQuizzes + 1,
    correctAnswers: existingStats.correctAnswers + attempt.score,
    totalQuestions: existingStats.totalQuestions + attempt.totalQuestions,
    lastQuizDate: new Date()
  };
  
  // Vérifier et mettre à jour le streak
  const lastQuizDate = existingStats.lastQuizDate ? new Date(existingStats.lastQuizDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (lastQuizDate) {
    const lastDate = new Date(lastQuizDate);
    lastDate.setHours(0, 0, 0, 0);
    
    if (lastDate.getTime() === yesterday.getTime()) {
      // Si la dernière tentative était hier, augmenter le streak
      updatedStats.streakDays = existingStats.streakDays + 1;
    } else if (lastDate.getTime() < yesterday.getTime()) {
      // Si la dernière tentative était avant hier, réinitialiser le streak
      updatedStats.streakDays = 1;
    }
    // Si c'est le même jour, le streak reste identique
  } else {
    // Premier quiz
    updatedStats.streakDays = 1;
  }
  
  localStorage.setItem(statsKey, JSON.stringify(updatedStats));
};

export const getUserStats = (userId: string): QuizUserStats => {
  const statsKey = `mrc_quiz_stats_${userId}`;
  const stats = localStorage.getItem(statsKey);
  
  if (!stats) {
    return {
      completedQuizzes: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      streakDays: 0,
      badges: []
    };
  }
  
  return JSON.parse(stats);
};

// Fonction pour générer un ID unique
export const generateUniqueId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Fonction pour déterminer le niveau de difficulté en fonction du score
export const determineDifficulty = (correctPercentage: number): string => {
  if (correctPercentage >= 90) return "facile";
  if (correctPercentage >= 70) return "moyen";
  return "difficile";
};

// Fonction pour recommander des quiz en fonction des performances passées
export const getRecommendedQuizzes = (userId: string): StoredQuiz[] => {
  const attempts = getUserQuizAttempts(userId);
  const quizzes = getQuizzes();
  const stats = getUserStats(userId);
  
  if (attempts.length === 0 || quizzes.length === 0) {
    // S'il n'y a pas d'historique, retourner les quiz de niveau débutant
    return quizzes.filter(quiz => {
      const avgDifficulty = determineQuizDifficulty(quiz.questions);
      return avgDifficulty === "facile";
    });
  }
  
  // Calculer la performance moyenne
  const avgPerformance = stats.correctAnswers / stats.totalQuestions;
  
  // Recommander des quiz en fonction de la performance
  if (avgPerformance >= 0.8) {
    // Bonne performance, recommander des quiz difficiles et moyens
    return quizzes.filter(quiz => {
      const avgDifficulty = determineQuizDifficulty(quiz.questions);
      return avgDifficulty === "difficile" || avgDifficulty === "moyen";
    });
  } else if (avgPerformance >= 0.6) {
    // Performance moyenne, recommander des quiz moyens
    return quizzes.filter(quiz => {
      const avgDifficulty = determineQuizDifficulty(quiz.questions);
      return avgDifficulty === "moyen";
    });
  } else {
    // Performance faible, recommander des quiz faciles
    return quizzes.filter(quiz => {
      const avgDifficulty = determineQuizDifficulty(quiz.questions);
      return avgDifficulty === "facile";
    });
  }
};

// Fonction utilitaire pour déterminer la difficulté moyenne d'un quiz
const determineQuizDifficulty = (questions: QuizQuestion[]): string => {
  if (!questions || questions.length === 0) return "facile";
  
  const difficultyMap: Record<string, number> = {
    "facile": 0,
    "moyen": 0,
    "difficile": 0
  };
  
  questions.forEach(q => {
    if (q.difficulty) {
      difficultyMap[q.difficulty] = (difficultyMap[q.difficulty] || 0) + 1;
    } else {
      difficultyMap["moyen"] = (difficultyMap["moyen"] || 0) + 1;
    }
  });
  
  // Déterminer la difficulté dominante
  let maxCount = 0;
  let dominantDifficulty = "moyen";
  
  for (const [difficulty, count] of Object.entries(difficultyMap)) {
    if (count > maxCount) {
      maxCount = count;
      dominantDifficulty = difficulty;
    }
  }
  
  return dominantDifficulty;
};
