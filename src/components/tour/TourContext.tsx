
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Tour {
  id: string;
  title: string;
  content: string;
  element?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  page: string;
}

interface TourContextType {
  currentTour: Tour | null;
  showTour: boolean;
  setShowTour: (show: boolean) => void;
  nextStep: () => void;
  resetTour: () => void;
  completeTour: () => void;
}

interface UserPreferences {
  completed?: boolean;
  current_page?: string;
  step_index?: number;
  tour_completed?: boolean;
  tour_current_page?: string;
  tour_step_index?: number;
  [key: string]: any;
}

// Tour Steps Data
const tourData: Record<string, Tour[]> = {
  '/': [
    {
      id: 'welcome',
      title: 'Bienvenue sur MRC en Poche',
      content: 'Découvrez notre plateforme dédiée à la formation des militants et sympathisants du MRC.',
      page: '/',
    },
    {
      id: 'navigation',
      title: 'Navigation',
      content: 'Utilisez la barre de navigation pour accéder aux différentes sections de l\'application.',
      element: 'nav',
      placement: 'bottom',
      page: '/',
    }
  ],
  '/modules': [
    {
      id: 'modules-intro',
      title: 'Modules de formation',
      content: 'Explorez nos modules thématiques pour approfondir vos connaissances sur le MRC et ses positions.',
      page: '/modules',
    },
    {
      id: 'module-selection',
      title: 'Sélection des modules',
      content: 'Cliquez sur un module pour accéder à son contenu et commencer votre apprentissage.',
      element: '.module-card',
      placement: 'top',
      page: '/modules',
    }
  ],
  '/quiz': [
    {
      id: 'quiz-intro',
      title: 'Quiz interactifs',
      content: 'Testez vos connaissances avec nos quiz thématiques sur le MRC et la politique camerounaise.',
      page: '/quiz',
    }
  ],
  '/chat': [
    {
      id: 'chat-intro',
      title: 'Assistant virtuel',
      content: 'Posez vos questions à notre assistant pour obtenir des informations sur le MRC et ses positions.',
      page: '/chat',
    }
  ],
  '/documents': [
    {
      id: 'documents-intro',
      title: 'Génération de documents',
      content: 'Créez et téléchargez des supports de formation personnalisés pour vos activités militantes.',
      page: '/documents',
    }
  ]
};

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTourPage, setCurrentTourPage] = useState<string>('/');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const { isAuthenticated, user } = useAuth();

  // Get current tour based on page and step index
  const getCurrentTour = (): Tour | null => {
    const pageTour = tourData[currentTourPage];
    if (!pageTour || currentStepIndex >= pageTour.length) return null;
    return pageTour[currentStepIndex];
  };

  // Load tour state from database or localStorage
  useEffect(() => {
    const loadTourState = async () => {
      if (isAuthenticated && user) {
        try {
          // Check if user_preferences table exists and has the required columns
          const { data, error } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (!error && data) {
            // Handle data from preferences safely by checking existence
            const userPrefs = data as UserPreferences;
            
            // Determine if tour is completed
            const tourCompleted = userPrefs.tour_completed !== undefined 
              ? userPrefs.tour_completed 
              : (userPrefs.completed !== undefined ? userPrefs.completed : false);
            
            // Get current page
            const tourCurrentPage = userPrefs.tour_current_page !== undefined 
              ? userPrefs.tour_current_page 
              : (userPrefs.current_page !== undefined ? userPrefs.current_page : '/');
            
            // Get step index
            const tourStepIndex = userPrefs.tour_step_index !== undefined 
              ? userPrefs.tour_step_index 
              : (userPrefs.step_index !== undefined ? userPrefs.step_index : 0);
            
            if (!tourCompleted) {
              setCurrentTourPage(tourCurrentPage || '/');
              setCurrentStepIndex(tourStepIndex || 0);
              setShowTour(true);
            }
          } else {
            // Create preferences if not exist
            await supabase.from('user_preferences').upsert({
              user_id: user.id,
              preferences: {
                tour_completed: false,
                tour_current_page: '/',
                tour_step_index: 0
              }
            });
            setShowTour(true);
          }
        } catch (error) {
          console.error('Error loading tour state:', error);
          // Fallback to localStorage
          useFallbackTourState();
        }
      } else {
        // For non-authenticated users, use localStorage
        useFallbackTourState();
      }
    };

    const useFallbackTourState = () => {
      const tourCompleted = localStorage.getItem('tour_completed') === 'true';
      if (!tourCompleted) {
        const savedPage = localStorage.getItem('tour_current_page') || '/';
        const savedStep = parseInt(localStorage.getItem('tour_step_index') || '0');
        
        setCurrentTourPage(savedPage);
        setCurrentStepIndex(savedStep);
        setShowTour(true);
      }
    };

    loadTourState();

    // Update current page when location changes
    const updateCurrentPage = () => {
      const pathname = window.location.pathname;
      if (tourData[pathname]) {
        setCurrentTourPage(pathname);
        setCurrentStepIndex(0);
      }
    };

    window.addEventListener('popstate', updateCurrentPage);
    updateCurrentPage();

    return () => window.removeEventListener('popstate', updateCurrentPage);
  }, [isAuthenticated, user]);

  // Save tour state
  const saveTourState = async (page: string, stepIndex: number, completed: boolean = false) => {
    if (isAuthenticated && user) {
      await supabase.from('user_preferences').upsert({
        user_id: user.id,
        preferences: {
          tour_completed: completed,
          tour_current_page: page,
          tour_step_index: stepIndex
        }
      });
    } else {
      localStorage.setItem('tour_current_page', page);
      localStorage.setItem('tour_step_index', stepIndex.toString());
      if (completed) {
        localStorage.setItem('tour_completed', 'true');
      }
    }
  };

  // Move to next step
  const nextStep = () => {
    const pageTour = tourData[currentTourPage];
    if (!pageTour) return;

    if (currentStepIndex < pageTour.length - 1) {
      const newStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(newStepIndex);
      saveTourState(currentTourPage, newStepIndex);
    } else {
      // End of current page tour
      setShowTour(false);
      
      // Find next page with tour
      const pages = Object.keys(tourData);
      const currentPageIndex = pages.indexOf(currentTourPage);
      
      if (currentPageIndex < pages.length - 1) {
        const nextPage = pages[currentPageIndex + 1];
        saveTourState(nextPage, 0);
      } else {
        // All tours completed
        completeTour();
      }
    }
  };

  // Reset and restart tour
  const resetTour = () => {
    setCurrentTourPage('/');
    setCurrentStepIndex(0);
    setShowTour(true);
    saveTourState('/', 0, false);
  };

  // Mark tour as completed
  const completeTour = () => {
    setShowTour(false);
    saveTourState(currentTourPage, currentStepIndex, true);
  };

  return (
    <TourContext.Provider 
      value={{ 
        currentTour: getCurrentTour(), 
        showTour, 
        setShowTour, 
        nextStep, 
        resetTour,
        completeTour 
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
