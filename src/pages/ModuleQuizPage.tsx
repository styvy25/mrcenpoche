
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import QuizContent from "@/components/modules/QuizContent";
import QuizGrid from "@/components/modules/QuizGrid";
import { useToast } from "@/hooks/use-toast";
import { getModuleQuiz } from "@/components/modules/quizData";

const ModuleQuizPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showQuiz, setShowQuiz] = useState(!!moduleId);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  const handleStartQuiz = (id: string) => {
    navigate(`/modules/quiz/${id}`);
    setShowQuiz(true);
  };

  const handleBackToModules = () => {
    navigate("/modules/quiz");
    setShowQuiz(false);
  };

  const handleCompleteQuiz = (score: number, totalQuestions: number) => {
    if (moduleId) {
      setCompletedQuizzes([...completedQuizzes, moduleId]);
      
      const percentage = Math.round((score / totalQuestions) * 100);
      const message = percentage >= 70 
        ? "Félicitations ! Vous avez maîtrisé ce module."
        : "Continuez à vous améliorer. Révisez le contenu et réessayez.";
      
      toast({
        title: `Quiz complété : ${score}/${totalQuestions}`,
        description: message,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 pt-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-mrc-blue">
          Quiz de Formation
        </h1>
        
        {moduleId && showQuiz ? (
          <QuizContent 
            moduleId={moduleId} 
            onBack={handleBackToModules}
            onComplete={handleCompleteQuiz}
          />
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Choisissez un module pour tester vos connaissances avec un quiz interactif.
            </p>
            <QuizGrid onStartQuiz={handleStartQuiz} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ModuleQuizPage;
