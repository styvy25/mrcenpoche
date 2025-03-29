
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { TourContextType, TourData, TourStep } from './types';
import { availableTours } from './tourData';
import { useTourStorage } from './useTourStorage';

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

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [activeTour, setActiveTour] = useState<TourData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const { user } = useAuth();
  const { checkCompletedTours, markTourAsCompleted, removeTourFromCompleted } = useTourStorage();

  // Map of paths to tour IDs
  const pathToTour: Record<string, string> = {
    '/': 'intro-tour',
    '/assistant': 'assistant-tour',
  };

  // Show appropriate tour based on the current page
  useEffect(() => {
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
    const path = location.pathname;
    if (pathToTour[path]) {
      const tourId = pathToTour[path];
      // Remove from completed tours
      removeTourFromCompleted(tourId);
      
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
