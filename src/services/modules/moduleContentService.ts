
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
  },
  'mod2': {
    content: `# Stratégies de communication politique

La communication politique est essentielle pour mobiliser les électeurs et diffuser efficacement les idées du MRC. Ce module explore les méthodes de communication les plus efficaces.

## Communication numérique

- **Réseaux sociaux**: Utilisation stratégique de Facebook, Twitter et WhatsApp
- **Contenu vidéo**: Création de vidéos explicatives et de discours
- **Site web**: Maintien d'une présence en ligne informative et actualisée

## Communication sur le terrain

- Réunions publiques et assemblées communautaires
- Distribution de tracts et de brochures
- Porte-à-porte et conversations directes avec les électeurs

## Message politique

- Développement d'un message clair et cohérent
- Adaptation du message aux différents publics
- Réponse efficace aux critiques et aux attaques politiques`,
    videos: [
      {
        videoId: 'dQw4w9WgXcQ',
        title: 'Techniques de communication politique',
        description: 'Comment communiquer efficacement les idées du MRC'
      }
    ],
    quiz: null
  },
  'mod3': {
    content: `# Organisation d'événements politiques

Les événements politiques sont essentiels pour renforcer la visibilité du MRC et mobiliser les militants. Ce module vous apprend à organiser des événements réussis.

## Types d'événements

- **Meetings politiques**: Rassemblements à grande échelle
- **Conférences thématiques**: Focus sur des sujets spécifiques
- **Événements communautaires**: Activités au niveau local

## Planification d'événements

1. Définir les objectifs clairs de l'événement
2. Choisir un lieu et une date appropriés
3. Préparer la logistique (son, éclairage, sièges)
4. Assurer la sécurité et le respect des autorisations

## Promotion des événements

- Création et distribution de matériel promotionnel
- Utilisation des médias sociaux pour créer un buzz
- Engagement des relais communautaires locaux`,
    videos: null,
    quiz: null
  }
};

/**
 * Get content for a specific module
 */
export const getModuleContent = async (moduleId: string): Promise<ModuleContent> => {
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // On renvoie le contenu du module ou un contenu d'exemple si le module n'existe pas
    return mockContent[moduleId] || { 
      content: `# Module d'exemple\n\nCeci est un contenu d'exemple pour le module ${moduleId}.\n\n## Section 1\n\nLe contenu réel de ce module sera disponible prochainement.\n\n## Section 2\n\nMerci pour votre patience.` 
    };
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
