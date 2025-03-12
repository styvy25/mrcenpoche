
import ModuleProgress from "@/components/modules/ModuleProgress";
import UpcomingEventsWidget from "@/components/challenge/UpcomingEventsWidget";

const ProgressGridSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2">
        <ModuleProgress 
          totalModules={5}
          completedModules={1}
          totalLessons={20}
          completedLessons={7}
          totalTime="5h 15m"
          rank="Sympathisant"
        />
      </div>
      <div>
        <UpcomingEventsWidget />
      </div>
    </div>
  );
};

export default ProgressGridSection;
