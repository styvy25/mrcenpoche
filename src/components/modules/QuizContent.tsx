
import { Button } from "@/components/ui/button";
import ModuleQuiz from "@/components/modules/ModuleQuiz";
import { getModuleQuiz } from "@/components/modules/quizData";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent = ({ moduleId, onBack, onComplete }: QuizContentProps) => {
  const quizData = getModuleQuiz(moduleId);
  
  return (
    <div className="mb-6">
      <Button 
        variant="outline" 
        onClick={onBack} 
        className="mb-4"
      >
        ← Retour au module
      </Button>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Quiz: {quizData?.title}
      </h2>
      <ModuleQuiz 
        moduleId={moduleId}
        questions={quizData?.questions || []}
        onComplete={onComplete}
      />
    </div>
  );
};

export default QuizContent;
