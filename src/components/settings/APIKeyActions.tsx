
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Key } from "lucide-react";

interface APIKeyActionsProps {
  onSave: () => void;
  onRefreshCache: () => void;
  isYoutubeKeyValid: boolean;
  isTesting: boolean;
}

const APIKeyActions = ({ 
  onSave, 
  onRefreshCache, 
  isYoutubeKeyValid, 
  isTesting 
}: APIKeyActionsProps) => {
  return (
    <div className="flex justify-between gap-4">
      <Button 
        variant="outline" 
        onClick={onRefreshCache}
        disabled={isTesting || !isYoutubeKeyValid}
        className="flex items-center gap-2"
      >
        <RefreshCcw className="h-4 w-4" />
        Rafraîchir le cache
      </Button>
      
      <Button 
        onClick={onSave}
        disabled={isTesting}
        className="flex items-center gap-2"
      >
        {isTesting ? (
          <>
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-1"></span>
            Test en cours...
          </>
        ) : (
          <>
            <Key className="h-4 w-4" />
            Enregistrer et tester
          </>
        )}
      </Button>
    </div>
  );
};

export default APIKeyActions;
