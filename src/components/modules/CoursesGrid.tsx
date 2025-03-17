
import CourseList from "./course/CourseList";
import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./data/modulesData";
import { useModuleSelection } from "./hooks/useModuleSelection";
import { useState } from "react";
import { Lesson } from "./types";

const CoursesGrid = () => {
  const { selectedModuleId, handleModuleClick, handleBackClick } = useModuleSelection();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  if (selectedModule) {
    return (
      <ModuleDetail 
        module={selectedModule} 
        onBack={handleBackClick} 
        activeLesson={activeLesson}
        onLessonSelect={handleLessonSelect}
      />
    );
  }

  return <CourseList modules={modulesData} onModuleClick={handleModuleClick} />;
};

export default CoursesGrid;
