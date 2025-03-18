
import ModuleDetail from "@/components/modules/ModuleDetail";
import QuizContent from "@/components/modules/QuizContent";
import ModulesHomeView from "@/components/modules/ModulesHomeView";
import { Module } from "@/components/modules/types";
import { useEffect } from "react";

interface ModuleContentProps {
  selectedModule: Module | null;
  showQuiz: boolean;
  currentQuizModule: number | null; // Changed from string to number | null
  onBackToModules: () => void;
  onQuizComplete: (score: number, totalQuestions: number) => void;
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: number) => void; // Changed from string to number
  onChallengeComplete: () => void;
}

const ModuleContent = ({
  selectedModule,
  showQuiz,
  currentQuizModule,
  onBackToModules,
  onQuizComplete,
  onChallengeClick,
  onChatClick,
  onStartQuiz,
  onChallengeComplete
}: ModuleContentProps) => {
  // Scroll to top when switching modules
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedModule, showQuiz]);
  
  if (selectedModule) {
    if (showQuiz && currentQuizModule !== null) {
      return (
        <QuizContent
          moduleId={currentQuizModule.toString()} // Convert to string for QuizContent
          onBack={onBackToModules}
          onComplete={onQuizComplete}
        />
      );
    } else {
      return (
        <ModuleDetail 
          module={selectedModule} 
          onBack={onBackToModules} 
        />
      );
    }
  } else {
    return (
      <ModulesHomeView 
        onChallengeClick={onChallengeClick}
        onChatClick={onChatClick}
        onStartQuiz={onStartQuiz}
        onChallengeComplete={onChallengeComplete}
      />
    );
  }
};

export default ModuleContent;
