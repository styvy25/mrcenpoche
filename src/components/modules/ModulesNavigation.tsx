
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, BookOpen, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Module } from "./types";

interface ModulesNavigationProps {
  currentModule?: Module | null;
  onStartLesson?: () => void;
  onPreviousModule?: () => void;
  onNextModule?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

const ModulesNavigation: React.FC<ModulesNavigationProps> = ({
  currentModule,
  onStartLesson,
  onPreviousModule,
  onNextModule,
  hasNext = false,
  hasPrevious = false
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/modules');
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-3 rounded-lg shadow-sm mb-6 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoHome}
          className="flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Accueil</span>
        </Button>
        
        {currentModule && (
          <div className="text-sm font-medium px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
            {currentModule.title}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {hasPrevious && onPreviousModule && (
          <Button
            variant="outline"
            size="sm"
            onClick={onPreviousModule}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Précédent</span>
          </Button>
        )}
        
        {currentModule && onStartLesson && (
          <Button
            variant="default"
            size="sm"
            onClick={onStartLesson}
            className="flex items-center gap-1"
          >
            <PlayCircle className="h-4 w-4" />
            <span>Commencer</span>
          </Button>
        )}
        
        {hasNext && onNextModule && (
          <Button
            variant="outline"
            size="sm"
            onClick={onNextModule}
            className="flex items-center gap-1"
          >
            <span className="hidden sm:inline">Suivant</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ModulesNavigation;
