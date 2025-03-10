
import { BookOpen, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Lesson } from "./types";

interface ModuleLessonContentProps {
  activeLesson: Lesson | null;
  onMarkComplete: (lessonId: number) => void;
}

const ModuleLessonContent = ({ activeLesson, onMarkComplete }: ModuleLessonContentProps) => {
  if (!activeLesson) {
    return (
      <div className="text-center py-8">
        <BookOpen className="h-12 w-12 mx-auto text-gray-300" />
        <p className="mt-2 text-gray-500">Sélectionnez une leçon pour voir son contenu</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{activeLesson.title}</h3>
      {activeLesson.videoUrl ? (
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={activeLesson.videoUrl}
            title={activeLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Vidéo non disponible</p>
        </div>
      )}
      <div className="prose prose-sm max-w-none">
        {activeLesson.content ? (
          <p>{activeLesson.content}</p>
        ) : (
          <p>Contenu de la leçon {activeLesson.title}...</p>
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
