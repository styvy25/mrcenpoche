
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';

type TourStep = {
  id: string;
  title: string;
  content: string;
  target?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  nextLabel?: string;
  backLabel?: string;
};

type TourData = {
  id: string;
  name: string;
  steps: TourStep[];
};

interface TourContextType {
  isOpen: boolean;
  currentStep: number;
  steps: TourStep[];
  currentTour: TourData | null;
  showTour: boolean;
  setShowTour: (show: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeTour: () => void;
  resetTour: () => void;
}

const defaultTourContext: TourContextType = {
  isOpen: false,
  currentStep: 0,
  steps: [],
  currentTour: null,
  showTour: false,
  setShowTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  completeTour: () => {},
  resetTour: () => {}
};

const TourContext = createContext<TourContextType>(defaultTourContext);

export const useTour = () => useContext(TourContext);

interface TourProviderProps {
  children: ReactNode;
}

// Mock tours data for demonstration
const availableTours: TourData[] = [
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

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [activeTour, setActiveTour] = useState<TourData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const { user } = useAuth();

  // Check for completed tours in localStorage
  const checkCompletedTours = () => {
    const completedTours = localStorage.getItem('completed_tours');
    return completedTours ? JSON.parse(completedTours) : [];
  };

  const markTourAsCompleted = (tourId: string) => {
    const completedTours = checkCompletedTours();
    if (!completedTours.includes(tourId)) {
      localStorage.setItem('completed_tours', JSON.stringify([...completedTours, tourId]));
    }
  };

  // Show appropriate tour based on the current page
  useEffect(() => {
    const pathToTour: Record<string, string> = {
      '/': 'intro-tour',
      '/assistant': 'assistant-tour',
    };

    const path = location.pathname;
    
    if (pathToTour[path]) {
      const completedTours = checkCompletedTours();
      const tourId = pathToTour[path];
      
      // Only show tour if it hasn't been completed
      if (!completedTours.includes(tourId)) {
        const tour = availableTours.find(t => t.id === tourId);
        if (tour) {
          setActiveTour(tour);
          setShowTour(true);
          setCurrentStep(0);
        }
      }
    }
  }, [location.pathname]);

  const nextStep = () => {
    if (activeTour && currentStep < activeTour.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (activeTour && step >= 0 && step < activeTour.steps.length) {
      setCurrentStep(step);
    }
  };

  const completeTour = () => {
    if (activeTour) {
      markTourAsCompleted(activeTour.id);
      setShowTour(false);
    }
  };

  const resetTour = () => {
    const pathToTour: Record<string, string> = {
      '/': 'intro-tour',
      '/assistant': 'assistant-tour',
    };
    
    const path = location.pathname;
    if (pathToTour[path]) {
      const tourId = pathToTour[path];
      // Remove from completed tours
      const completedTours = checkCompletedTours();
      const updatedTours = completedTours.filter((id: string) => id !== tourId);
      localStorage.setItem('completed_tours', JSON.stringify(updatedTours));
      
      // Show the tour
      const tour = availableTours.find(t => t.id === tourId);
      if (tour) {
        setActiveTour(tour);
        setShowTour(true);
        setCurrentStep(0);
      }
    }
  };

  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        steps: activeTour?.steps || [],
        currentTour: activeTour,
        showTour,
        setShowTour,
        nextStep,
        prevStep,
        goToStep,
        completeTour,
        resetTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
