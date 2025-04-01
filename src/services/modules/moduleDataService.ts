
import { Module, ModuleCategory } from '@/components/training/types';

// Mock data for modules
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

/**
 * Get available modules based on user level and premium status
 */
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

/**
 * Get available module categories
 */
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
