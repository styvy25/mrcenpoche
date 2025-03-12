
import { Module } from "../types";
import CourseCard from "../CourseCard";

interface CourseListProps {
  modules: Module[];
  onModuleClick: (id: number) => void;
}

const CourseList = ({ modules, onModuleClick }: CourseListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <div key={module.id} onClick={() => onModuleClick(module.id as number)}>
          <CourseCard
            title={module.title}
            description={module.description}
            progress={module.progress}
            duration={module.duration}
            level={module.level}
            isPdfAvailable={module.isPdfAvailable}
            isCompleted={module.isCompleted}
          />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
