
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface RosettaControlsProps {
  onNext: () => void;
}

const RosettaControls: React.FC<RosettaControlsProps> = ({ onNext }) => {
  return (
    <div className="flex justify-end mt-4">
      <Button 
        variant="default" 
        onClick={onNext}
      >
        Suivant
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
};

export default RosettaControls;
