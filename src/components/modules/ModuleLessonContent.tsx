
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { getLessonContent } from './utils/lessonContentUtil';
import LessonEmptyState from './LessonEmptyState';
import LessonContent from './LessonContent';
import LessonActionButtons from './LessonActionButtons';

interface ModuleLessonContentProps {
  moduleId: string;
  lessonId: string | null;
}

const ModuleLessonContent: React.FC<ModuleLessonContentProps> = ({ moduleId, lessonId }) => {
  const { toast } = useToast();
  const { title, content } = getLessonContent(moduleId, lessonId);
  
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
  
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-6 transition-colors duration-300">
      {!lessonId ? (
        <LessonEmptyState title={title} content={content} />
      ) : (
        <>
          <LessonContent title={title} content={content} />
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <LessonActionButtons 
              onBookmark={handleBookmark}
              onComplete={handleComplete}
              onShare={handleShare}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ModuleLessonContent;
