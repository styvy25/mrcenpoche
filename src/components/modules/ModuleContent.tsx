
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video, Users, BookOpen } from "lucide-react";
import PageTransitionWrapper from "@/components/ui/page-transition-wrapper";

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
  // Scroll to top when switching modules
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedModule, showQuiz]);
  
  if (selectedModule) {
    return (
      <PageTransitionWrapper>
        {showQuiz ? (
          <QuizContent
            moduleId={currentQuizModule}
            onBack={onBackToModules}
            onComplete={onQuizComplete}
          />
        ) : (
          <ModuleDetail 
            module={selectedModule} 
            onBack={onBackToModules} 
          />
        )}
      </PageTransitionWrapper>
    );
  } else {
    return (
      <PageTransitionWrapper>
        <motion.div 
          className="mb-6 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/modules/training">
            <Button variant="outline" className="bg-gradient-to-r from-mrc-blue to-blue-600 text-white hover:from-blue-600 hover:to-mrc-blue border-none transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
              <Video className="mr-2 h-4 w-4" />
              Formation Immersive
            </Button>
          </Link>
          <Link to="/modules/reunions">
            <Button variant="outline" className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white hover:from-indigo-500 hover:to-indigo-700 border-none transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
              <Users className="mr-2 h-4 w-4" />
              Réunions Virtuelles
            </Button>
          </Link>
          <Link to="/quiz">
            <Button variant="outline" className="bg-gradient-to-r from-green-700 to-green-500 text-white hover:from-green-500 hover:to-green-700 border-none transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]">
              <BookOpen className="mr-2 h-4 w-4" />
              Quiz Politiques
            </Button>
          </Link>
        </motion.div>
        
        <ModulesHomeView 
          onChallengeClick={onChallengeClick}
          onChatClick={onChatClick}
          onStartQuiz={onStartQuiz}
          onChallengeComplete={onChallengeComplete}
        />
      </PageTransitionWrapper>
    );
  }
};

export default ModuleContent;
