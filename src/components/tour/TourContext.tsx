
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";

type TourStep = {
  element: string;
  title: string;
  content: string;
  position: 'top' | 'right' | 'bottom' | 'left';
};

type PageTour = {
  [key: string]: TourStep[];
};

interface TourContextType {
  isOpen: boolean;
  currentStep: number;
  steps: TourStep[];
  openTour: () => void;
  closeTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  resetTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const pageTours: PageTour = {
  '/': [
    { element: '#hero-section', title: 'Bienvenue sur LearnScape237', content: 'Votre plateforme d\'apprentissage personnalisée.', position: 'bottom' },
    { element: 'nav', title: 'Navigation', content: 'Utilisez cette barre pour accéder aux différentes sections.', position: 'bottom' },
  ],
  '/modules': [
    { element: '.module-grid', title: 'Modules de formation', content: 'Parcourez les différents modules disponibles.', position: 'bottom' },
    { element: '.module-card', title: 'Module', content: 'Cliquez sur un module pour commencer à apprendre.', position: 'right' },
  ],
  '/quiz': [
    { element: '.quiz-container', title: 'Testez vos connaissances', content: 'Répondez aux questions pour évaluer votre compréhension.', position: 'top' },
  ],
  '/chat': [
    { element: '.chat-input', title: 'Assistant IA', content: 'Posez vos questions ici pour obtenir de l\'aide.', position: 'top' },
  ],
  '/documents': [
    { element: '.pdf-generator', title: 'Générateur de documents', content: 'Créez et téléchargez des supports de formation.', position: 'right' },
  ],
  '/settings': [
    { element: '.tabs-list', title: 'Paramètres', content: 'Configurez vos préférences et vos clés API.', position: 'bottom' },
    { element: '#api-keys', title: 'Clés API', content: 'Entrez vos clés API pour débloquer toutes les fonctionnalités.', position: 'right' },
  ],
};

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [hasSeenTour, setHasSeenTour] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Get tour steps for current page
    const currentPathSteps = pageTours[location.pathname] || [];
    setSteps(currentPathSteps);
    setCurrentStep(0);

    // Check if user has seen the tour for this page
    const checkTourStatus = async () => {
      if (isAuthenticated && user) {
        try {
          const { data } = await supabase
            .from('user_preferences')
            .select('tour_history')
            .eq('user_id', user.id)
            .single();
          
          if (data && data.tour_history) {
            setHasSeenTour(data.tour_history);
            
            // Auto-open tour if user hasn't seen it and steps exist
            if (!data.tour_history[location.pathname] && currentPathSteps.length > 0) {
              // Wait a bit to ensure page is fully loaded
              setTimeout(() => setIsOpen(true), 1000);
            }
          } else {
            // No tour history exists yet
            if (currentPathSteps.length > 0) {
              setTimeout(() => setIsOpen(true), 1000);
            }
          }
        } catch (error) {
          console.error('Error loading tour history:', error);
        }
      } else {
        // For non-authenticated users, use localStorage
        const localTourHistory = localStorage.getItem('tour_history');
        if (localTourHistory) {
          try {
            const parsedHistory = JSON.parse(localTourHistory);
            setHasSeenTour(parsedHistory);
            
            if (!parsedHistory[location.pathname] && currentPathSteps.length > 0) {
              setTimeout(() => setIsOpen(true), 1000);
            }
          } catch (e) {
            console.error('Error parsing tour history:', e);
          }
        } else if (currentPathSteps.length > 0) {
          setTimeout(() => setIsOpen(true), 1000);
        }
      }
    };

    checkTourStatus();
  }, [location.pathname, isAuthenticated, user]);

  const updateTourHistory = async (path: string) => {
    const newHistory = { ...hasSeenTour, [path]: true };
    setHasSeenTour(newHistory);

    if (isAuthenticated && user) {
      try {
        await supabase
          .from('user_preferences')
          .upsert({
            user_id: user.id,
            tour_history: newHistory
          }, { onConflict: 'user_id' });
      } catch (error) {
        console.error('Error updating tour history:', error);
      }
    } else {
      // For non-authenticated users, use localStorage
      localStorage.setItem('tour_history', JSON.stringify(newHistory));
    }
  };

  const openTour = () => setIsOpen(true);
  
  const closeTour = () => {
    setIsOpen(false);
    updateTourHistory(location.pathname);
  };
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      closeTour();
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const resetTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        steps,
        openTour,
        closeTour,
        nextStep,
        prevStep,
        resetTour
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
