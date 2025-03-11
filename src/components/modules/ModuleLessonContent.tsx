
import { useState, useEffect } from "react";
import { BookOpen, Check, Wifi, WifiOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "./types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ModuleLessonContentProps {
  activeLesson: Lesson | null;
  onMarkComplete: (lessonId: number) => void;
}

const ModuleLessonContent = ({ activeLesson, onMarkComplete }: ModuleLessonContentProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [videoError, setVideoError] = useState(false);
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Reset video error when lesson changes
  useEffect(() => {
    setVideoError(false);
  }, [activeLesson]);

  if (!activeLesson) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
        <p className="mt-2 text-gray-500">Sélectionnez une leçon pour voir son contenu</p>
      </div>
    );
  }
  
  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{activeLesson.title}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          {isOnline ? 
            <Wifi className="h-3 w-3 text-green-500" /> : 
            <WifiOff className="h-3 w-3 text-amber-500" />
          }
          <span>{isOnline ? "En ligne" : "Hors-ligne"}</span>
        </div>
      </div>
      
      {activeLesson.videoUrl ? (
        <>
          {(!isOnline || videoError) ? (
            <div className="space-y-3">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center flex-col p-4">
                <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
                <p className="text-gray-500 text-center">
                  {videoError ? "La vidéo n'a pas pu être chargée" : "Vidéo non disponible en mode hors-ligne"}
                </p>
              </div>
              
              <Alert variant="warning">
                <AlertTitle className="flex items-center gap-2">
                  <WifiOff className="h-4 w-4" />
                  Mode hors-ligne
                </AlertTitle>
                <AlertDescription>
                  Les vidéos ne sont pas disponibles en mode hors-ligne. Connectez-vous à Internet pour accéder au contenu vidéo.
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={handleVideoError}
              ></iframe>
            </div>
          )}
        </>
      ) : (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Vidéo non disponible pour cette leçon</p>
        </div>
      )}
      
      <div className="prose prose-sm max-w-none dark:prose-invert">
        {activeLesson.content ? (
          <p>{activeLesson.content}</p>
        ) : (
          <p>Cette leçon couvre les aspects clés de {activeLesson.title}. Complétez le module pour approfondir vos connaissances sur ce sujet.</p>
        )}
      </div>
      
      <Button
        onClick={() => onMarkComplete(activeLesson.id)}
        disabled={activeLesson.isCompleted}
        className="w-full bg-green-600 hover:bg-green-700"
      >
        {activeLesson.isCompleted ? (
          <>
            <Check className="h-4 w-4 mr-1" />
            Terminé
          </>
        ) : (
          "Marquer comme terminé"
        )}
      </Button>
    </div>
  );
};

export default ModuleLessonContent;
