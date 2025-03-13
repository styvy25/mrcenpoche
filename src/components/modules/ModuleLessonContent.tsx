
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getLessonContent } from './utils/lessonContentUtil';
import LessonEmptyState from './LessonEmptyState';
import LessonContent from './LessonContent';
import LessonActionButtons from './LessonActionButtons';
import RosettaLearning from './rosetta/RosettaLearning';
import { Lesson } from "./types";
import { Button } from "@/components/ui/button";
import { Globe, Lightbulb } from "lucide-react";

interface ModuleLessonContentProps {
  moduleId?: string;
  lessonId?: string | null;
  activeLesson?: Lesson | null;
  onMarkComplete?: (lessonId: number) => void;
}

const ModuleLessonContent: React.FC<ModuleLessonContentProps> = ({ 
  moduleId, 
  lessonId, 
  activeLesson, 
  onMarkComplete 
}) => {
  const { toast } = useToast();
  const [showRosetta, setShowRosetta] = useState(false);
  const contentInfo = moduleId && lessonId 
    ? getLessonContent(moduleId, lessonId)
    : activeLesson 
      ? { title: activeLesson.title, content: activeLesson.content }
      : { title: "", content: "" };
  
  const { title, content } = contentInfo;
  
  const handleBookmark = () => {
    toast({
      title: "Leçon sauvegardée",
      description: `La leçon "${title}" a été ajoutée à vos favoris.`,
      variant: "default"
    });
  };
  
  const handleComplete = () => {
    toast({
      title: "Leçon terminée",
      description: `Félicitations ! Vous avez terminé la leçon "${title}".`,
      variant: "default"
    });
    
    if (onMarkComplete && activeLesson) {
      onMarkComplete(Number(activeLesson.id));
    }
  };
  
  const handleShare = () => {
    // Copy current page URL to clipboard
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        toast({
          title: "Lien copié !",
          description: "Le lien de cette leçon a été copié dans votre presse-papiers.",
          variant: "default"
        });
      })
      .catch(err => {
        console.error('Erreur lors de la copie du lien: ', err);
        toast({
          title: "Erreur",
          description: "Impossible de copier le lien.",
          variant: "destructive"
        });
      });
  };

  const handleRosettaComplete = () => {
    toast({
      title: "Apprentissage interactif terminé",
      description: "Félicitations ! Vous avez terminé l'apprentissage interactif.",
      variant: "default"
    });
    setShowRosetta(false);
    
    if (onMarkComplete && activeLesson) {
      onMarkComplete(Number(activeLesson.id));
    }
  };
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
      {!lessonId && !activeLesson ? (
        <LessonEmptyState title={title} content={content} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-mrc-blue dark:text-blue-400 pb-2 border-b border-gray-200 dark:border-gray-800 md:border-none md:pb-0">
              {title}
            </h2>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowRosetta(!showRosetta)}
              >
                <Globe className="h-4 w-4" />
                <span>{showRosetta ? "Mode lecture" : "Apprentissage interactif"}</span>
              </Button>
            </div>
          </div>
          
          {showRosetta ? (
            <RosettaLearning 
              moduleId={moduleId || (activeLesson?.id.toString() || "0")}
              lessonContent={content}
              onComplete={handleRosettaComplete}
            />
          ) : (
            <>
              <LessonContent title="" content={content} />
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
                <LessonActionButtons 
                  onBookmark={handleBookmark}
                  onComplete={handleComplete}
                  onShare={handleShare}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ModuleLessonContent;
