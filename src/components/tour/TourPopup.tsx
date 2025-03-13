
import React, { useEffect, useRef } from 'react';
import { useTour } from './TourContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

const TourPopup: React.FC = () => {
  const { isOpen, currentStep, steps, closeTour, nextStep, prevStep } = useTour();
  const popupRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || !steps[currentStep]) return;

    const targetElement = document.querySelector(steps[currentStep].element) as HTMLElement;
    if (targetElement && popupRef.current) {
      targetRef.current = targetElement;
      
      const updatePosition = () => {
        if (!popupRef.current || !targetRef.current) return;
        
        const targetRect = targetRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();
        
        const position = steps[currentStep].position;
        
        // Calculate position based on target element
        let left = 0;
        let top = 0;
        
        switch (position) {
          case 'top':
            left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
            top = targetRect.top - popupRect.height - 10;
            break;
          case 'right':
            left = targetRect.right + 10;
            top = targetRect.top + targetRect.height / 2 - popupRect.height / 2;
            break;
          case 'bottom':
            left = targetRect.left + targetRect.width / 2 - popupRect.width / 2;
            top = targetRect.bottom + 10;
            break;
          case 'left':
            left = targetRect.left - popupRect.width - 10;
            top = targetRect.top + targetRect.height / 2 - popupRect.height / 2;
            break;
        }
        
        // Adjust if popup would go off screen
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (left < 10) left = 10;
        if (left + popupRect.width > viewportWidth - 10) {
          left = viewportWidth - popupRect.width - 10;
        }
        
        if (top < 10) top = 10;
        if (top + popupRect.height > viewportHeight - 10) {
          top = viewportHeight - popupRect.height - 10;
        }
        
        popupRef.current.style.left = `${left}px`;
        popupRef.current.style.top = `${top}px`;
      };
      
      // Highlight target element
      const originalOutline = targetElement.style.outline;
      const originalPosition = targetElement.style.position;
      const originalZIndex = targetElement.style.zIndex;
      
      targetElement.style.outline = '2px solid #3b82f6';
      targetElement.style.position = 'relative';
      targetElement.style.zIndex = '50';
      
      // Update position initially and on resize
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
        
        if (targetRef.current) {
          targetRef.current.style.outline = originalOutline;
          targetRef.current.style.position = originalPosition;
          targetRef.current.style.zIndex = originalZIndex;
        }
      };
    }
  }, [isOpen, currentStep, steps]);

  if (!isOpen || !steps.length) return null;

  const currentTourStep = steps[currentStep];
  if (!currentTourStep) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/30 z-[999]" aria-hidden="true" onClick={closeTour} />
      
      <motion.div
        ref={popupRef}
        className="fixed z-[1000]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="w-80 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
              <Button variant="ghost" size="icon" onClick={closeTour} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {currentTourStep.content}
            </p>
          </CardContent>
          
          <CardFooter className="flex justify-between pt-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {currentStep + 1} / {steps.length}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={nextStep}
              >
                {currentStep === steps.length - 1 ? 'Terminer' : (
                  <>
                    Suivant
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default TourPopup;
