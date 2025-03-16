import { Module, Lesson } from "./types";
import ModuleLessonContent from "./ModuleLessonContent";

interface ModuleDetailProps {
  module: Module;
  onBack: () => void;
  activeLesson: Lesson | null;
  onLessonSelect: (lesson: Lesson) => void;
}

const ModuleDetail = ({ 
  module, 
  onBack,
  activeLesson,
  onLessonSelect
}: ModuleDetailProps) => {
  const handleLessonSelect = (lesson: Lesson) => {
    onLessonSelect(lesson);
  };

  // If we have an active lesson, display its content
  if (activeLesson) {
    return (
      <ModuleLessonContent
        moduleId={module.id.toString()}
        lessonId={activeLesson.id.toString()}
        lessonTitle={activeLesson.title}
        lessonContent={activeLesson.content || ""}
        onBack={onBack}
        onNext={() => {}}
        onComplete={() => {}}
        activeLesson={activeLesson}
        isCompleted={activeLesson.isCompleted}
      />
    );
  }

  // Otherwise, display the module overview
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-4">{module.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">{module.description}</p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Leçons</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex justify-between items-center"
              onClick={() => handleLessonSelect(lesson)}
            >
              <div>
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Durée: {lesson.duration}</p>
              </div>
              {lesson.isCompleted ? (
                <span className="text-green-500 text-sm font-medium">Complété</span>
              ) : (
                <span className="text-blue-500 text-sm font-medium">Commencer</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleDetail;
