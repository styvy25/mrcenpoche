
import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import ModulesTabs from "@/components/modules/ModulesTabs";
import ModuleProgressView from "@/components/modules/ModuleProgressView";
import ModuleChallengeView from "@/components/modules/ModuleChallengeView";
import ModuleChatView from "@/components/modules/ModuleChatView";
import ModuleContent from "@/components/modules/ModuleContent";
import { useModuleState } from "@/hooks/useModuleState";
import PageTransition from "@/components/ui/page-transition";

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
    <PageTransition>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ModulesTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              modulesContent={renderModulesContent()}
              progressContent={<ModuleProgressView />}
              challengeContent={<ModuleChallengeView onChallengeComplete={handleChallengeComplete} />}
              chatContent={<ModuleChatView />}
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ModulesPage;
