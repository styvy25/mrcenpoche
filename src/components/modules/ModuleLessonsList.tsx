
import { Lock, PlayCircle, CheckCircle, Circle } from "lucide-react";
import { Lesson } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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

  // Calculate progress percentage
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">Progression du module</span>
          <span className="text-sm font-medium">{completedLessons}/{lessons.length}</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="text-xs">Complété</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50">
            <PlayCircle className="h-3 w-3 text-mrc-blue" />
            <span className="text-xs">Disponible</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
            <Lock className="h-3 w-3 text-gray-400" />
            <span className="text-xs">Verrouillé</span>
          </Badge>
        </div>
      </div>
      
      <div className="space-y-2">
        {lessons.map((lesson) => (
          <div 
            key={lesson.id}
            onClick={() => handleLessonClick(lesson)}
            className={`p-3 border rounded-lg hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
              lesson.isLocked ? 'opacity-70 border-gray-200' : 
              lesson.isCompleted ? 'border-green-200 bg-green-50' : 'border-blue-100'
            }`}
          >
            <div className="flex items-center">
              {lesson.isLocked ? (
                <Lock className="h-4 w-4 mr-2 text-gray-400" />
              ) : lesson.isCompleted ? (
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              ) : (
                <PlayCircle className="h-4 w-4 mr-2 text-mrc-blue" />
              )}
              <span className={lesson.isCompleted ? "text-green-800" : ""}>{lesson.title}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-500">{lesson.duration}</span>
              {lesson.isCompleted ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : lesson.isLocked ? (
                <Lock className="h-4 w-4 text-gray-400" />
              ) : (
                <Circle className="h-4 w-4 text-mrc-blue" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleLessonsList;
