
import ModuleDetail from "@/components/modules/ModuleDetail";
import QuizContent from "@/components/modules/QuizContent";
import ModulesHomeView from "@/components/modules/ModulesHomeView";
import { Module } from "@/components/modules/types";

interface ModuleContentProps {
  selectedModule: Module | null;
  showQuiz: boolean;
  currentQuizModule: string;
  onBackToModules: () => void;
  onQuizComplete: (score: number, totalQuestions: number) => void;
  onChallengeClick: () => void;
  onChatClick: () => void;
  onStartQuiz: (moduleId: string) => void;
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
  if (selectedModule) {
    if (showQuiz) {
      return (
        <QuizContent
          moduleId={currentQuizModule}
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
