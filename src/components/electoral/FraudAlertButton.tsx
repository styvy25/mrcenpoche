
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import FraudAlertModal from "./FraudAlertModal";

const FraudAlertButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="font-semibold flex items-center gap-1 bg-mrc-red hover:bg-mrc-red/80 transition-all"
        onClick={() => setIsOpen(true)}
      >
        <AlertTriangle className="h-4 w-4" />
        <span>Signaler une fraude</span>
      </Button>
      
      <FraudAlertModal
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default FraudAlertButton;
