
import ModuleDetail from "@/components/modules/ModuleDetail";
import QuizContent from "@/components/modules/QuizContent";
import ModulesHomeView from "@/components/modules/ModulesHomeView";
import { Module } from "@/components/modules/types";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Users } from "lucide-react";

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
        />
      );
    }
  } else {
    return (
      <>
        <div className="mb-6 flex flex-wrap gap-3">
          <Link to="/modules/training">
            <Button variant="outline" className="bg-gradient-to-r from-mrc-blue to-blue-600 text-white hover:from-blue-600 hover:to-mrc-blue border-none">
              <Video className="mr-2 h-4 w-4" />
              Formation Immersive
            </Button>
          </Link>
          <Link to="/modules/reunions">
            <Button variant="outline" className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-700 border-none">
              <Users className="mr-2 h-4 w-4" />
              Réunions Virtuelles
            </Button>
          </Link>
        </div>
        
        <ModulesHomeView 
          onChallengeClick={onChallengeClick}
          onChatClick={onChatClick}
          onStartQuiz={onStartQuiz}
          onChallengeComplete={onChallengeComplete}
        />
      </>
    );
  }
};

export default ModuleContent;
