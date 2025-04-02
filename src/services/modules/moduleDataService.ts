
import { Module, ModuleCategory } from '@/components/training/types';

// Mock data for development
const mockModules: Module[] = [
  {
    id: 'mod1',
    title: 'Fondamentaux du MRC',
    description: 'Découvrez les principes fondateurs et les valeurs du Mouvement pour la Renaissance du Cameroun.',
    icon: '📜',
    category: 'fondamentaux',
    duration: '45 min',
    level: 'Débutant',
    progress: 0,
    locked: false,
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80'
  },
  {
    id: 'mod2',
    title: 'Stratégies de communication politique',
    description: 'Apprenez à communiquer efficacement les idées et valeurs du MRC aux électeurs potentiels.',
    icon: '📢',
    category: 'communication',
    duration: '60 min',
    level: 'Intermédiaire',
    progress: 25,
    locked: false,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'mod3',
    title: 'Organisation d\'événements politiques',
    description: 'Guide pratique pour organiser des meetings, des conférences et des événements communautaires.',
    icon: '🎪',
    category: 'organisation',
    duration: '75 min',
    level: 'Intermédiaire',
    progress: 0,
    locked: false,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'mod4',
    title: 'Mobilisation des électeurs',
    description: 'Techniques efficaces pour mobiliser les électeurs et les encourager à voter pour le MRC.',
    icon: '👥',
    category: 'mobilisation',
    duration: '90 min',
    level: 'Avancé',
    progress: 0,
    locked: true,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80'
  },
  {
    id: 'mod5',
    title: 'Droit électoral camerounais',
    description: 'Comprendre le cadre juridique des élections au Cameroun et les droits des candidats et électeurs.',
    icon: '⚖️',
    category: 'juridique',
    duration: '120 min',
    level: 'Avancé',
    progress: 0,
    locked: true,
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1589994965851-a7f82d10639a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

const mockCategories: ModuleCategory[] = [
  { id: 'all', label: 'Tous', icon: '🔍' },
  { id: 'fondamentaux', label: 'Fondamentaux', icon: '📜' },
  { id: 'communication', label: 'Communication', icon: '📢' },
  { id: 'organisation', label: 'Organisation', icon: '🎪' },
  { id: 'mobilisation', label: 'Mobilisation', icon: '👥' },
  { id: 'juridique', label: 'Juridique', icon: '⚖️' }
];

/**
 * Get all modules with filtering based on user level and subscription status
 */
export const getModules = async (userLevel = 1, isPremium = false): Promise<{modules: Module[], featuredModule: Module | null}> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Apply filters based on user level and subscription
    let filteredModules = [...mockModules];
    
    // If not premium, lock premium modules
    if (!isPremium) {
      filteredModules = filteredModules.map(module => {
        if (module.id === 'mod4' || module.id === 'mod5') {
          return { ...module, locked: true };
        }
        return module;
      });
    }
    
    // Find featured module
    const featuredModule = filteredModules.find(m => m.featured) || null;
    
    return {
      modules: filteredModules,
      featuredModule
    };
  } catch (error) {
    console.error("Error getting modules:", error);
    throw error;
  }
};

/**
 * Get all module categories
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

/**
 * Get details for a specific module
 */
export const getModuleDetails = async (moduleId: string): Promise<Module | null> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const module = mockModules.find(m => m.id === moduleId) || null;
    return module;
  } catch (error) {
    console.error("Error getting module details:", error);
    throw error;
  }
};
