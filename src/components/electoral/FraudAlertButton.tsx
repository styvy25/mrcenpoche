
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import FraudAlertModal from "./FraudAlertModal";
import { useIsMobile } from '@/hooks/use-mobile';
import { useUISettings } from '@/hooks/useUISettings';

const FraudAlertButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { getComponentSettings } = useUISettings();
  const buttonSettings = getComponentSettings('FraudAlertButton');
  
  // If button is configured to be hidden, don't render it
  if (!buttonSettings.isVisible) return null;

  return (
    <>
      <Button
        variant="destructive"
        size={isMobile ? "sm" : "default"}
        className={`font-semibold flex items-center gap-1 bg-mrc-red hover:bg-mrc-red/80 transition-all ${
          isMobile ? 'text-xs px-2 py-1' : ''
        }`}
        onClick={() => setIsOpen(true)}
      >
        <AlertTriangle className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        <span>{isMobile ? 'Signaler' : 'Signaler une fraude'}</span>
      </Button>
      
      <FraudAlertModal
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default FraudAlertButton;
