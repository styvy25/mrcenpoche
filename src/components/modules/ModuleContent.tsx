
import ModuleDetail from "@/components/modules/ModuleDetail";
import QuizContent from "@/components/modules/QuizContent";
import ModulesHomeView from "@/components/modules/ModulesHomeView";
import { Module, Lesson } from "@/components/modules/types";
import { useEffect } from "react";

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
  activeLesson: Lesson | null;
  onLessonSelect: (lesson: Lesson) => void;
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
  onChallengeComplete,
  activeLesson,
  onLessonSelect
}: ModuleContentProps) => {
  // Scroll to top when switching modules
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedModule, showQuiz]);
  
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
          activeLesson={activeLesson}
          onLessonSelect={onLessonSelect}
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
