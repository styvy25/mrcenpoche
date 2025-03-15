
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
          activeLesson={activeLesson}
          onMarkComplete={() => {}}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ModuleDetailTabs;
