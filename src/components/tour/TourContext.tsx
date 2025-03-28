
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';

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
  showTour: (tourId: string) => void;
  closeTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeTour: () => void;
}

const defaultTourContext: TourContextType = {
  isOpen: false,
  currentStep: 0,
  steps: [],
  showTour: () => {},
  closeTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  goToStep: () => {},
  completeTour: () => {},
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
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const { user } = useAuth();

  // Check for completed tours in localStorage or a database
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

  // Save tour progress to the database
  const saveTourProgress = async (tourId: string) => {
    if (!user) return;
    
    try {
      const userId = user.uid || user.id;
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('user_tours')
        .upsert({
          user_id: userId,
          tour_id: tourId,
          completed: true,
          completed_at: new Date().toISOString()
        });
        
      if (error) throw error;
    } catch (error) {
      console.error('Error saving tour progress:', error);
    }
  };

  // Load user's tour progress from the database
  const loadTourProgress = async () => {
    if (!user) return;
    
    try {
      const userId = user.uid || user.id;
      if (!userId) return;
      
      const { data, error } = await supabase
        .from('user_tours')
        .select('*')
        .eq('user_id', userId);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Convert database tour progress to the format used by localStorage
        const completedTours = data
          .filter(tour => tour.completed)
          .map(tour => tour.tour_id);
        
        // Update localStorage for offline access
        localStorage.setItem('completed_tours', JSON.stringify(completedTours));
      }
    } catch (error) {
      console.error('Error loading tour progress:', error);
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
          setIsOpen(true);
          setCurrentStep(0);
        }
      }
    }
  }, [location.pathname]);
  
  // Load tour progress when user info changes
  useEffect(() => {
    if (user) {
      loadTourProgress();
    }
  }, [user]);

  const showTour = (tourId: string) => {
    const tour = availableTours.find(t => t.id === tourId);
    if (tour) {
      setActiveTour(tour);
      setIsOpen(true);
      setCurrentStep(0);
    }
  };

  const closeTour = () => {
    setIsOpen(false);
  };

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
      
      // Save to database if user is authenticated
      if (user) {
        saveTourProgress(activeTour.id);
      }
      
      setIsOpen(false);
    }
  };

  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        steps: activeTour?.steps || [],
        showTour,
        closeTour,
        nextStep,
        prevStep,
        goToStep,
        completeTour,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
