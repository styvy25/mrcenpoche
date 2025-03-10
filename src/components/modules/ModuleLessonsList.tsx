
import { Lock, PlayCircle, CheckCircle } from "lucide-react";
import { Lesson } from "./types";
import { useToast } from "@/components/ui/use-toast";

interface ModuleLessonsListProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

const ModuleLessonsList = ({ lessons, onLessonClick }: ModuleLessonsListProps) => {
  const { toast } = useToast();

  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.isLocked) {
      toast({
        title: "Contenu verrouillé",
        description: "Veuillez compléter les leçons précédentes pour débloquer ce contenu.",
        variant: "destructive",
      });
      return;
    }
    
    onLessonClick(lesson);
  };

  return (
    <div className="space-y-2">
      {lessons.map((lesson) => (
        <div 
          key={lesson.id}
          onClick={() => handleLessonClick(lesson)}
          className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center ${lesson.isLocked ? 'opacity-70' : ''}`}
        >
          <div className="flex items-center">
            {lesson.isLocked ? (
              <Lock className="h-4 w-4 mr-2 text-gray-400" />
            ) : (
              <PlayCircle className="h-4 w-4 mr-2 text-mrc-blue" />
            )}
            <span>{lesson.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-xs text-gray-500">{lesson.duration}</span>
            {lesson.isCompleted ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleLessonsList;
