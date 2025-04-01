
import { TrainingProgressData } from '@/components/training/types';

/**
 * Get training progress data for current user
 */
export const getTrainingProgress = async (): Promise<TrainingProgressData> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      completedModules: 2,
      totalModules: 8,
      achievements: [
        {
          id: 'ach1',
          name: 'Premier Pas',
          description: 'A complété son premier module de formation',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          iconType: 'trophy',
          color: 'text-yellow-500'
        },
        {
          id: 'ach2',
          name: 'Apprenti',
          description: 'A complété 5 heures de formation',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          iconType: 'book',
          color: 'text-blue-500'
        }
      ],
      sessions: [
        {
          id: 'ses1',
          moduleId: 'mod1',
          moduleTitle: 'Fondamentaux du MRC',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          durationMinutes: 45,
          progress: 60
        },
        {
          id: 'ses2',
          moduleId: 'mod2',
          moduleTitle: 'Stratégies de mobilisation',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          durationMinutes: 30,
          progress: 20
        }
      ],
      badges: [
        {
          id: 'badge1',
          name: 'Lion du Cameroun',
          description: 'Démontré un courage et une détermination exemplaires',
          iconType: 'award',
          gradient: 'from-yellow-500 to-red-500',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'badge2',
          name: 'Masque Bamileke',
          description: 'Maîtrise des traditions et de l\'histoire',
          iconType: 'star',
          gradient: 'from-green-500 to-blue-500',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    };
  } catch (error) {
    console.error("Error getting training progress:", error);
    throw error;
  }
};
