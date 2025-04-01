
import { QuizSubmission, Badge } from '@/components/training/types';

/**
 * Submit quiz results for a module
 */
export const submitQuizResult = async (submission: QuizSubmission): Promise<{ success: boolean, badges: Badge[] }> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate earning badges based on score
    const badges: Badge[] = [];
    
    if (submission.passed) {
      badges.push({
        id: 'badge1',
        name: 'Premier Quiz Réussi',
        description: 'Vous avez complété votre premier quiz avec succès',
        iconType: 'award',
        date: new Date().toISOString()
      });
      
      if (submission.score >= 90) {
        badges.push({
          id: 'badge2',
          name: 'Excellence Académique',
          description: 'Vous avez obtenu plus de 90% à un quiz',
          iconType: 'star',
          gradient: 'from-yellow-500 to-orange-500',
          date: new Date().toISOString()
        });
      }
    }
    
    return { 
      success: true,
      badges
    };
  } catch (error) {
    console.error("Error submitting quiz results:", error);
    throw error;
  }
};
