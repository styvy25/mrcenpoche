
import { supabase } from "@/integrations/supabase/client";
import { Category, QuizQuestion, QuizResult, QuizUserStats } from '@/components/quiz/types';

// Function to fetch quiz categories with questions
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data: categories, error: categoriesError } = await supabase
      .from('quiz_categories')
      .select('*');

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError);
      return [];
    }

    // Now fetch questions for each category
    const categoriesWithQuestions = await Promise.all(
      categories.map(async (category) => {
        const { data: questions, error: questionsError } = await supabase
          .from('quiz_questions')
          .select('*')
          .eq('category_id', category.id);

        if (questionsError) {
          console.error(`Error fetching questions for category ${category.id}:`, questionsError);
          return {
            ...category,
            questions: []
          };
        }

        // Transform questions to match our frontend format
        const formattedQuestions: QuizQuestion[] = questions.map(q => ({
          id: q.id,
          question: q.question_text,
          options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
          correctAnswer: q.correct_answer,
          explanation: q.explanation,
          difficulty: q.difficulty_level
        }));

        return {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          label: category.name,
          questions: formattedQuestions
        };
      })
    );

    return categoriesWithQuestions;
  } catch (error) {
    console.error('Error in fetchCategories:', error);
    return [];
  }
};

// Save quiz attempt
export const saveQuizAttempt = async (
  userId: string | undefined, 
  categoryId: string,
  score: number,
  totalQuestions: number,
  answersData: { questionId: string, answer: string, isCorrect: boolean }[]
): Promise<string | null> => {
  try {
    if (!userId) return null;

    // Insert the attempt
    const { data: attemptData, error: attemptError } = await supabase
      .from('quiz_attempts')
      .insert({
        user_id: userId,
        category_id: categoryId,
        score: score,
        total_questions: totalQuestions,
        correct_answers: score,
        completed_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (attemptError) {
      console.error('Error saving quiz attempt:', attemptError);
      return null;
    }

    const attemptId = attemptData.id;

    // Insert the responses
    const responsesData = answersData.map(answer => ({
      attempt_id: attemptId,
      question_id: answer.questionId,
      user_answer: answer.answer,
      is_correct: answer.isCorrect
    }));

    const { error: responsesError } = await supabase
      .from('quiz_responses')
      .insert(responsesData);

    if (responsesError) {
      console.error('Error saving quiz responses:', responsesError);
    }

    // Update the leaderboard
    await updateLeaderboard(userId, categoryId, score, totalQuestions);

    return attemptId;
  } catch (error) {
    console.error('Error in saveQuizAttempt:', error);
    return null;
  }
};

// Update the user's leaderboard entry
const updateLeaderboard = async (
  userId: string,
  categoryId: string,
  score: number,
  totalQuestions: number
): Promise<void> => {
  try {
    // Check if user already has a leaderboard entry
    const { data: existingEntry, error: fetchError } = await supabase
      .from('quiz_leaderboard')
      .select('*')
      .eq('user_id', userId)
      .eq('category_id', categoryId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching leaderboard entry:', fetchError);
      return;
    }

    const now = new Date().toISOString();

    if (existingEntry) {
      // Update existing entry
      const { error: updateError } = await supabase
        .from('quiz_leaderboard')
        .update({
          total_score: existingEntry.total_score + score,
          quizzes_completed: existingEntry.quizzes_completed + 1,
          average_score: (existingEntry.total_score + score) / (existingEntry.quizzes_completed + 1),
          last_quiz_date: now
        })
        .eq('id', existingEntry.id);

      if (updateError) {
        console.error('Error updating leaderboard:', updateError);
      }
    } else {
      // Create new entry
      const { error: insertError } = await supabase
        .from('quiz_leaderboard')
        .insert({
          user_id: userId,
          category_id: categoryId,
          total_score: score,
          quizzes_completed: 1,
          average_score: score / totalQuestions * 100,
          last_quiz_date: now
        });

      if (insertError) {
        console.error('Error creating leaderboard entry:', insertError);
      }
    }
  } catch (error) {
    console.error('Error in updateLeaderboard:', error);
  }
};

// Types pour le stockage local des quiz
interface StoredQuiz {
  id: string;
  title: string;
  category: string;
  questions: QuizQuestion[];
  lastUpdated: Date;
}

// Get user statistics
export const getUserStats = async (userId: string): Promise<QuizUserStats> => {
  try {
    if (!userId) {
      return {
        completedQuizzes: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        streakDays: 0,
        badges: []
      };
    }

    const { data, error } = await supabase
      .from('quiz_leaderboard')
      .select('quizzes_completed, total_score, average_score')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user stats:', error);
      return {
        completedQuizzes: 0,
        correctAnswers: 0,
        totalQuestions: 0,
        streakDays: 0,
        badges: []
      };
    }

    // Calculate overall stats across all categories
    const stats = data.reduce((acc, entry) => {
      return {
        completedQuizzes: acc.completedQuizzes + entry.quizzes_completed,
        correctAnswers: acc.correctAnswers + entry.total_score,
        totalQuestions: acc.totalQuestions + (entry.quizzes_completed * 10), // Assuming 10 questions per quiz
        streakDays: acc.streakDays, // This would need additional logic to track daily activity
        badges: acc.badges
      };
    }, {
      completedQuizzes: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      streakDays: 0,
      badges: []
    });

    return stats;
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return {
      completedQuizzes: 0,
      correctAnswers: 0,
      totalQuestions: 0,
      streakDays: 0,
      badges: []
    };
  }
};

export interface QuizUserStats {
  completedQuizzes: number;
  correctAnswers: number;
  totalQuestions: number;
  streakDays: number;
  badges: BadgeProps[];
  lastQuizDate?: Date;
}

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
