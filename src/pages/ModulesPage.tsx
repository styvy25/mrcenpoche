
import Navbar from "@/components/layout/Navbar";
import ModulesTabs from "@/components/modules/ModulesTabs";
import ModuleProgressView from "@/components/modules/ModuleProgressView";
import ModuleChallengeView from "@/components/modules/ModuleChallengeView";
import ModuleChatView from "@/components/modules/ModuleChatView";
import ModuleContent from "@/components/modules/ModuleContent";
import ModulesNavigation from "@/components/modules/ModulesNavigation";
import TrainingStorage from "@/components/training/TrainingStorage";
import { useModuleState } from "@/hooks/useModuleState";
import { useSEO } from "@/hooks/useSEO";
import { useEffect, useState } from "react";
import { Lesson } from "@/components/modules/types";

const ModulesPage = () => {
  const {
    activeTab,
    setActiveTab,
    selectedModule,
    showQuiz,
    showChallenge,
    showChat,
    showTraining,
    currentQuizModule,
    handleModuleSelect,
    handleBackToModules,
    handleStartQuiz,
    handleQuizComplete,
    handleChallengeComplete,
    handleChallengeClick,
    handleChatClick,
    handleTrainingClick
  } = useModuleState();
  
  const { setPageTitle, setPageDescription } = useSEO();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  
  // Set SEO metadata
  useEffect(() => {
    setPageTitle("Modules de Formation - MRC en Poche");
    setPageDescription("Explorez nos modules de formation conçus pour vous aider à devenir un militant efficace et bien informé.");
  }, [setPageTitle, setPageDescription]);

  // Handle lesson navigation
  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handleNextLesson = () => {
    if (!selectedModule || !activeLesson) return;
    
    const currentIndex = selectedModule.lessons.findIndex(lesson => lesson.id === activeLesson.id);
    if (currentIndex < selectedModule.lessons.length - 1) {
      setActiveLesson(selectedModule.lessons[currentIndex + 1]);
    }
  };

  const handlePreviousLesson = () => {
    if (!selectedModule || !activeLesson) return;
    
    const currentIndex = selectedModule.lessons.findIndex(lesson => lesson.id === activeLesson.id);
    if (currentIndex > 0) {
      setActiveLesson(selectedModule.lessons[currentIndex - 1]);
    }
  };

  // Check if next/previous lessons are available
  const hasNextLesson = () => {
    if (!selectedModule || !activeLesson) return false;
    const currentIndex = selectedModule.lessons.findIndex(lesson => lesson.id === activeLesson.id);
    return currentIndex < selectedModule.lessons.length - 1;
  };

  const hasPreviousLesson = () => {
    if (!selectedModule || !activeLesson) return false;
    const currentIndex = selectedModule.lessons.findIndex(lesson => lesson.id === activeLesson.id);
    return currentIndex > 0;
  };

  const renderModulesContent = () => (
    <ModuleContent
      selectedModule={selectedModule}
      showQuiz={showQuiz}
      currentQuizModule={currentQuizModule}
      onBackToModules={handleBackToModules}
      onQuizComplete={handleQuizComplete}
      onChallengeClick={handleChallengeClick}
      onChatClick={handleChatClick}
      onStartQuiz={handleStartQuiz}
      onChallengeComplete={handleChallengeComplete}
      activeLesson={activeLesson}
      onLessonSelect={handleLessonSelect}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ModulesNavigation 
          currentModule={selectedModule}
          currentLesson={activeLesson}
          onStartLesson={() => selectedModule && selectedModule.lessons.length > 0 && handleLessonSelect(selectedModule.lessons[0])}
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
          hasNextLesson={hasNextLesson()}
          hasPreviousLesson={hasPreviousLesson()}
        />
        
        <ModulesTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          chatContent={<ModuleChatView />}
          progressContent={<ModuleProgressView />}
        />
      </div>
    </div>
  );
};

export default ModulesPage;
