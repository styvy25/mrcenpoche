
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, Trash, Shield, Video } from "lucide-react";

interface APIKeyActionsProps {
  onSave: () => Promise<any>;
  onRefreshCache: () => Promise<any>;
  isYoutubeKeyValid: boolean;
  isTesting: boolean;
}

const APIKeyActions: React.FC<APIKeyActionsProps> = ({
  onSave,
  onRefreshCache,
  isYoutubeKeyValid,
  isTesting
}) => {
  return (
    <div className="flex flex-wrap gap-3 justify-between w-full">
      <div>
        {isYoutubeKeyValid && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefreshCache}
            disabled={isTesting}
            className="mr-2 flex items-center"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Rafraîchir le cache YouTube
          </Button>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isTesting}
          className="bg-red-50 border-red-200 hover:bg-red-100 text-red-700 flex items-center"
        >
          <Video className="mr-2 h-4 w-4" />
          Tester les fonctionnalités YouTube
        </Button>
        <Button
          variant="default"
          onClick={onSave}
          disabled={isTesting}
          className="bg-green-600 hover:bg-green-700 flex items-center"
        >
          {isTesting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Vérification...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les clés API
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default APIKeyActions;
