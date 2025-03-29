
export type TourStep = {
  id: string;
  title: string;
  content: string;
  target?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  nextLabel?: string;
  backLabel?: string;
};

export type TourData = {
  id: string;
  name: string;
  steps: TourStep[];
};

export interface TourContextType {
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
