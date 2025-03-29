
import { TourData } from './types';

// Mock tours data for demonstration
export const availableTours: TourData[] = [
  {
    id: 'intro-tour',
    name: 'Introduction Tour',
    steps: [
      {
        id: 'welcome',
        title: 'Bienvenue sur MRC en Poche!',
        content: 'Découvrez toutes les fonctionnalités de notre application pour vous aider dans votre parcours politique.',
        placement: 'bottom',
      },
      {
        id: 'assistant',
        title: 'Assistant IA',
        content: 'Posez toutes vos questions à notre assistant IA spécialisé dans les questions politiques.',
        target: '.assistant-link',
        placement: 'right',
      },
      {
        id: 'documents',
        title: 'Documents et PDFs',
        content: 'Accédez à tous les documents et créez des PDF personnalisés pour votre formation.',
        target: '.documents-link',
        placement: 'right',
      },
      {
        id: 'quiz',
        title: 'Quiz et Tests',
        content: 'Testez vos connaissances avec nos quiz interactifs sur divers sujets politiques.',
        target: '.quiz-link',
        placement: 'right',
      },
    ],
  },
  {
    id: 'assistant-tour',
    name: 'Assistant Tour',
    steps: [
      {
        id: 'assistant-intro',
        title: 'Votre Assistant IA',
        content: 'Cet assistant spécialisé est là pour répondre à toutes vos questions sur le MRC et la politique.',
        placement: 'top',
      },
      {
        id: 'assistant-input',
        title: 'Posez vos Questions',
        content: 'Tapez votre question ici et notre IA vous répondra avec des informations précises.',
        target: '.assistant-input',
        placement: 'top',
      },
      {
        id: 'assistant-features',
        title: 'Fonctionnalités Spéciales',
        content: 'Vous pouvez rechercher des vidéos, générer des documents et obtenir des informations à jour.',
        target: '.assistant-features',
        placement: 'left',
      },
    ],
  },
];
