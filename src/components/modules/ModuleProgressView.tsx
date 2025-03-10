
import ModuleProgress from "@/components/modules/ModuleProgress";

const ModuleProgressView = () => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-6">Votre progression</h2>
      <ModuleProgress 
        totalModules={5}
        completedModules={1}
        totalLessons={20}
        completedLessons={7}
        totalTime="5h 15m"
        rank="Sympathisant"
      />
    </div>
  );
};

export default ModuleProgressView;
