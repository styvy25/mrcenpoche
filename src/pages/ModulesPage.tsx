
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ModulesTabs from '@/components/modules/ModulesTabs';
import ModuleProgressView from '@/components/modules/ModuleProgressView';
import ModuleChallengeView from '@/components/modules/ModuleChallengeView';
import ModuleChatView from '@/components/modules/ModuleChatView';
import ModuleContent from '@/components/modules/ModuleContent';
import ModulesNavigation from '@/components/modules/ModulesNavigation';
import { useModuleState } from '@/hooks/useModuleState';
import { useSEO } from '@/hooks/useSEO';
import { useEffect } from 'react';

const ModulesPage = () => {
  const {
    activeTab,
    setActiveTab,
    selectedModule,
    showQuiz,
    showChallenge,
    showChat,
    currentQuizModule,
    handleModuleSelect,
    handleBackToModules,
    handleStartQuiz,
    handleQuizComplete,
    handleChallengeComplete,
    handleChallengeClick,
    handleChatClick
  } = useModuleState();
  
  const { setPageTitle, setPageDescription } = useSEO();
  
  // Set SEO metadata
  useEffect(() => {
    setPageTitle("Modules de Formation - MRC en Poche");
    setPageDescription("Explorez nos modules de formation conçus pour vous aider à devenir un militant efficace et bien informé.");
  }, [setPageTitle, setPageDescription]);

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
    />
  );

  return (
    <MainLayout className="bg-background" padBottom={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ModulesNavigation 
          currentModule={selectedModule}
          onStartLesson={() => selectedModule && selectedModule.lessons.length > 0 && 
            handleStartQuiz(Number(selectedModule.id))}
        />
        
        <ModulesTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          modulesContent={renderModulesContent()}
          progressContent={<ModuleProgressView />}
          challengeContent={<ModuleChallengeView onChallengeComplete={handleChallengeComplete} />}
          chatContent={<ModuleChatView />}
        />
      </div>
    </MainLayout>
  );
};

export default ModulesPage;
