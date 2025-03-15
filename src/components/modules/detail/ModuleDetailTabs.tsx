
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModuleOverview from "../ModuleOverview";
import ModuleLessonsList from "../ModuleLessonsList";
import ModuleLessonContent from "../ModuleLessonContent";
import { Lesson, Module } from "../types";

interface ModuleDetailTabsProps {
  module: Module;
  activeTab: string;
  activeLesson: Lesson | null;
  setActiveTab: (value: string) => void;
  onLessonClick: (lesson: Lesson) => void;
}

const ModuleDetailTabs = ({
  module,
  activeTab,
  activeLesson,
  setActiveTab,
  onLessonClick,
}: ModuleDetailTabsProps) => {
  // Helper function to handle dummy lesson content props  
  const getLessonContentProps = () => {
    if (!activeLesson) {
      return {
        moduleId: module.id.toString(),
        lessonId: "",
        lessonTitle: "Leçon non sélectionnée",
        lessonContent: "<p>Veuillez sélectionner une leçon pour afficher son contenu.</p>",
        onBack: () => {},
        onNext: () => {},
        onComplete: () => {},
        hasNext: false,
        hasPrevious: false
      };
    }
    
    return {
      moduleId: module.id.toString(),
      lessonId: activeLesson.id.toString(),
      lessonTitle: activeLesson.title,
      lessonContent: activeLesson.content || "",
      onBack: () => {},
      onNext: () => {},
      onComplete: () => {},
      hasNext: false,
      hasPrevious: false
    };
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="lessons">Leçons</TabsTrigger>
        <TabsTrigger value="content">Contenu</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview">
        <ModuleOverview module={module} onTakeQuiz={() => {}} />
      </TabsContent>
      
      <TabsContent value="lessons" className="pt-4">
        <ModuleLessonsList 
          lessons={module.lessons} 
          onLessonClick={onLessonClick}
        />
      </TabsContent>
      
      <TabsContent value="content" className="pt-4">
        <ModuleLessonContent 
          {...getLessonContentProps()}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ModuleDetailTabs;
