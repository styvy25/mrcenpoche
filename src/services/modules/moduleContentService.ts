
import { ModuleContent } from '@/components/training/types';

// Mock content data for modules
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

/**
 * Get content for a specific module
 */
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

/**
 * Generate a PDF for a module
 */
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
