
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lesson } from '@/components/modules/types';
import ModuleOverview from '@/components/modules/ModuleOverview';
import ModuleLessonContent from '@/components/modules/ModuleLessonContent';
import ModuleQuiz from '@/components/modules/ModuleQuiz';

interface ModuleDetailTabsProps {
  overview: string;
  lessons: Lesson[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  activeLesson: Lesson | null;
  moduleId: string;
  onMarkComplete: () => void;
}

const ModuleDetailTabs: React.FC<ModuleDetailTabsProps> = ({
  overview,
  lessons,
  activeTab,
  setActiveTab,
  activeLesson,
  moduleId,
  onMarkComplete
}) => {
  // Determine if we should show overview or lesson content
  const hasLessonSelected = activeTab === 'lesson' && activeLesson;
  const isQuizActive = activeTab === 'quiz';

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Aperçu</TabsTrigger>
        <TabsTrigger value="lesson" disabled={!lessons.length}>Leçon</TabsTrigger>
        <TabsTrigger value="quiz">Quiz</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <ModuleOverview overview={overview} />
      </TabsContent>

      <TabsContent value="lesson" className="mt-4">
        {activeLesson && (
          <ModuleLessonContent 
            lesson={activeLesson} 
            onComplete={onMarkComplete} 
            moduleId={moduleId}
          />
        )}
      </TabsContent>

      <TabsContent value="quiz" className="mt-4">
        <ModuleQuiz 
          questions={lessons} 
          onComplete={onMarkComplete} 
          moduleId={moduleId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ModuleDetailTabs;
