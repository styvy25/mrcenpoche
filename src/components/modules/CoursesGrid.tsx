
import CourseList from "./course/CourseList";
import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./data/modulesData";
import { useModuleSelection } from "./hooks/useModuleSelection";

const CoursesGrid = () => {
  const { selectedModuleId, handleModuleClick, handleBackClick } = useModuleSelection();
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={handleBackClick} />;
  }

  return <CourseList modules={modulesData} onModuleClick={handleModuleClick} />;
};

export default CoursesGrid;
