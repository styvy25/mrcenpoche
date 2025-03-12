
import { useState } from "react";
import CourseList from "./course/CourseList";
import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./data/modulesData";

const CoursesGrid = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);
  
  const handleModuleClick = (id: number) => {
    setSelectedModuleId(id);
  };
  
  const handleBackClick = () => {
    setSelectedModuleId(null);
  };

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={handleBackClick} />;
  }

  return <CourseList modules={modulesData} onModuleClick={handleModuleClick} />;
};

export default CoursesGrid;
