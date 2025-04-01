
import { supabase } from '../integrations/supabase/client';
import { Module, ModuleCategory, ModuleContent, QuizSubmission, TrainingProgressData, Badge } from '../components/training/types';

// Mock data for adaptive module service
const mockModules: Module[] = [
  {
    id: 'mod1',
    title: 'Fondamentaux du MRC',
    description: 'Apprenez les bases et principes fondamentaux du MRC',
    image: '/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png',
    duration: '2h',
    difficulty: 'beginner',
    category: 'history',
    categoryName: 'Histoire',
    type: 'core',
    locked: false,
    progress: 60,
    isNew: true,
  },
  {
    id: 'mod2',
    title: 'Stratégies de mobilisation',
    description: 'Techniques avancées pour mobiliser les communautés',
    image: '/lovable-uploads/2f1f5377-df73-46bc-b7d2-0c3cafeb5dbb.png',
    duration: '3h',
    difficulty: 'intermediate',
    category: 'strategy',
    categoryName: 'Stratégie',
    type: 'advanced',
    locked: false,
    progress: 20,
  },
  {
    id: 'mod3',
    title: 'Leadership et communication',
    description: 'Développez vos compétences en leadership et communication politique',
    image: '/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png',
    duration: '4h',
    difficulty: 'advanced',
    category: 'leadership',
    categoryName: 'Leadership',
    type: 'advanced',
    locked: true,
    progress: 0,
    requiredLevel: 3,
  }
];

const mockCategories: ModuleCategory[] = [
  {
    id: 'history',
    name: 'Histoire',
    color: 'bg-blue-600',
    iconName: 'flag',
  },
  {
    id: 'strategy',
    name: 'Stratégie',
    color: 'bg-green-600',
    iconName: 'shield',
  },
  {
    id: 'leadership',
    name: 'Leadership',
    color: 'bg-yellow-600',
    iconName: 'award',
  },
  {
    id: 'organizing',
    name: 'Organisation',
    color: 'bg-purple-600',
    iconName: 'users',
  }
];

const mockContent: Record<string, ModuleContent> = {
  'mod1': {
    content: `# Fondamentaux du MRC

Le Mouvement pour la Renaissance du Cameroun (MRC) est un parti politique camerounais créé en 2012. Voici les principes fondamentaux du parti:

## Missions principales

- Restauration de la démocratie et de l'État de droit
- Lutte contre la corruption et l'impunité
- Promotion de la justice sociale et de l'égalité des chances

## Valeurs fondamentales

- **Intégrité**: Engagement à des normes élevées d'honnêteté et de comportement éthique
- **Transparence**: Ouverture dans la prise de décision et les actions
- **Inclusivité**: Représentation de tous les Camerounais indépendamment de leur origine

## Objectifs stratégiques

1. Réformer les institutions pour garantir leur indépendance
2. Relancer l'économie pour créer des emplois et réduire la pauvreté
3. Améliorer l'accès à l'éducation et aux soins de santé pour tous
4. Moderniser les infrastructures du pays`,
    videos: [
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Introduction au MRC',
        description: 'Présentation des principes fondamentaux du MRC'
      }
    ],
    quiz: {
      id: 'quiz1',
      title: 'Quiz sur les fondamentaux du MRC',
      description: 'Testez vos connaissances sur les principes de base du MRC',
      questions: [
        {
          id: 'q1',
          text: 'En quelle année le MRC a-t-il été fondé?',
          options: [
            { id: 'a', text: '2008' },
            { id: 'b', text: '2012' },
            { id: 'c', text: '2014' },
            { id: 'd', text: '2016' }
          ],
          correctOptionId: 'b',
          explanation: 'Le MRC a été fondé en 2012 par Maurice Kamto.'
        },
        {
          id: 'q2',
          text: 'Laquelle de ces valeurs n\'est PAS une valeur fondamentale du MRC?',
          options: [
            { id: 'a', text: 'Intégrité' },
            { id: 'b', text: 'Transparence' },
            { id: 'c', text: 'Exclusivité' },
            { id: 'd', text: 'Justice sociale' }
          ],
          correctOptionId: 'c',
          explanation: 'Le MRC promeut l\'inclusivité, pas l\'exclusivité. Il vise à représenter tous les Camerounais.'
        }
      ],
      passingScore: 70
    }
  }
};

// Exported functions to simulate API calls
export const getModules = async (userLevel: number, isPremium: boolean): Promise<{ modules: Module[], featuredModule: Module | null }> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter modules based on user level and premium status
    const availableModules = mockModules.map(module => ({
      ...module,
      locked: module.requiredLevel ? module.requiredLevel > userLevel : (module.locked && !isPremium)
    }));
    
    // Return featured module (could be based on user progress, interests, etc.)
    return {
      modules: availableModules,
      featuredModule: availableModules[0]
    };
  } catch (error) {
    console.error("Error getting modules:", error);
    throw error;
  }
};

export const getCategories = async (): Promise<ModuleCategory[]> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCategories;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const getModuleContent = async (moduleId: string): Promise<ModuleContent> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockContent[moduleId] || { content: undefined };
  } catch (error) {
    console.error("Error getting module content:", error);
    throw error;
  }
};

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

export const getModuleCertificates = async (moduleId: string): Promise<any[]> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock certificates
    return [
      {
        id: 'cert1',
        title: 'Certificat de Réussite',
        description: 'A complété avec succès le module Fondamentaux du MRC',
        moduleId,
        issuedAt: new Date().toISOString(),
        pdfUrl: '#'
      }
    ];
  } catch (error) {
    console.error("Error getting certificates:", error);
    throw error;
  }
};

export const generateModulePDF = async (moduleId: string): Promise<string> => {
  try {
    // Simulate PDF generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Return mock PDF URL
    return `https://example.com/pdf/${moduleId}.pdf`;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

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
