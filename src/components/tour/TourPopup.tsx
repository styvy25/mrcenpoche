
import React from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTour } from './TourContext';
import { X } from 'lucide-react';

const TourPopup: React.FC = () => {
  const { currentTour, showTour, setShowTour, nextStep, completeTour } = useTour();

  if (!currentTour || !showTour) {
    return null;
  }

  return (
    <Dialog open={showTour} onOpenChange={setShowTour}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {currentTour.title}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => completeTour()}
              className="h-7 w-7"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>{currentTour.content}</p>
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => completeTour()}
          >
            Ignorer
          </Button>
          <Button onClick={() => nextStep()}>
            Suivant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TourPopup;
