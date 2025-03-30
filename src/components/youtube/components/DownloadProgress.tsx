
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";

interface DownloadProgressProps {
  isDownloading: boolean;
  downloadProgress: number;
  downloadComplete: boolean;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({
  isDownloading,
  downloadProgress,
  downloadComplete
}) => {
  if (!isDownloading && !downloadComplete) return null;

  return (
    <div className="space-y-2">
      {isDownloading && (
        <div className="space-y-2">
          <div className="text-sm flex justify-between">
            <span>Téléchargement en cours...</span>
            <span>{Math.round(downloadProgress)}%</span>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-red-600 h-full transition-all duration-300 ease-out"
              style={{ width: `${downloadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {downloadComplete && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">
          <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Téléchargement terminé</AlertTitle>
          <AlertDescription>
            La vidéo a été téléchargée avec succès et est disponible pour une consultation hors-ligne.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DownloadProgress;
