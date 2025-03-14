
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { useAuth } from '@/components/auth/AuthContext';

interface TourContextType {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  openTour: () => void;
  closeTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  skipTour: () => void;
  resetTour: () => void;
}

const TourContext = createContext<TourContextType>({
  isOpen: false,
  currentStep: 0,
  totalSteps: 0,
  openTour: () => {},
  closeTour: () => {},
  nextStep: () => {},
  prevStep: () => {},
  skipTour: () => {},
  resetTour: () => {},
});

export const useTour = () => useContext(TourContext);

interface TourStep {
  path: string;
  title: string;
  description: string;
}

// Tour configuration based on path
const tourSteps: TourStep[] = [
  {
    path: '/',
    title: 'Bienvenue sur MRC en Poche',
    description: 'Découvrez toutes les fonctionnalités de l\'application et commencez votre apprentissage.'
  },
  {
    path: '/modules',
    title: 'Modules de formation',
    description: 'Accédez aux modules de formation pour en apprendre davantage sur le MRC.'
  },
  {
    path: '/quiz',
    title: 'Quiz interactifs',
    description: 'Testez vos connaissances avec nos quiz interactifs.'
  },
  {
    path: '/chat',
    title: 'Assistant virtuel',
    description: 'Posez vos questions à notre assistant virtuel et obtenez des réponses personnalisées.'
  },
  {
    path: '/news',
    title: 'Actualités',
    description: 'Restez informé(e) des dernières actualités du MRC et de l\'environnement politique.'
  }
];

interface TourProviderProps {
  children: React.ReactNode;
}

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Get available steps for current path
  const getCurrentPathSteps = (): TourStep[] => {
    const currentPath = location.pathname;
    return tourSteps.filter(step => step.path === currentPath);
  };
  
  const totalSteps = getCurrentPathSteps().length;
  
  useEffect(() => {
    // Check if tour should be shown on this page
    if (!tourCompleted && user) {
      try {
        const userData = localStorage.getItem(`tour_data_${user.id}`);
        if (userData) {
          const data = JSON.parse(userData);
          // Use correct property access
          if (typeof data === 'object' && data !== null) {
            setTourCompleted(data.tour_completed || false);
            
            // If we have a saved state for the current page, restore it
            if (data.tour_current_page === location.pathname) {
              setCurrentStep(data.tour_step_index || 0);
            } else {
              setCurrentStep(0);
            }
          }
        }

        // Auto-show tour for first-time users if we have steps for this page
        const pathSteps = getCurrentPathSteps();
        if (pathSteps.length > 0 && !tourCompleted) {
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error loading tour data:", error);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user]);
  
  // Save tour state when it changes
  useEffect(() => {
    if (user) {
      try {
        const tourData = {
          tour_completed: tourCompleted,
          tour_current_page: location.pathname,
          tour_step_index: currentStep
        };
        localStorage.setItem(`tour_data_${user.id}`, JSON.stringify(tourData));
      } catch (error) {
        console.error("Error saving tour data:", error);
      }
    }
  }, [tourCompleted, currentStep, location.pathname, user]);
  
  const openTour = () => {
    if (getCurrentPathSteps().length > 0) {
      setIsOpen(true);
    } else {
      toast({
        title: "Visite guidée non disponible",
        description: "Aucune visite guidée n'est disponible pour cette page."
      });
    }
  };
  
  const closeTour = () => {
    setIsOpen(false);
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete tour for this page
      closeTour();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const skipTour = () => {
    setTourCompleted(true);
    closeTour();
    toast({
      title: "Visite guidée désactivée",
      description: "Vous pouvez la réactiver depuis les paramètres."
    });
  };
  
  const resetTour = () => {
    setTourCompleted(false);
    setCurrentStep(0);
    toast({
      title: "Visite guidée réinitialisée",
      description: "La visite guidée s'affichera lors de votre prochaine navigation."
    });
  };
  
  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        totalSteps,
        openTour,
        closeTour,
        nextStep,
        prevStep,
        skipTour,
        resetTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};
