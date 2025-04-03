
import { Button } from "@/components/ui/button";
import ModuleQuiz from "@/components/modules/ModuleQuiz";
import { getModuleQuiz } from "@/components/modules/quizData";
import { QuizQuestion } from "@/components/quiz/types";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent = ({ moduleId, onBack, onComplete }: QuizContentProps) => {
  const quizData = getModuleQuiz(moduleId);
  
  // Convert module questions to quiz questions if needed
  const convertedQuestions: QuizQuestion[] = quizData?.questions?.map((q: any) => ({
    id: q.id.toString(),
    text: q.question || q.text,
    options: Array.isArray(q.options) ? 
      q.options.map((opt: any, i: number) => 
        typeof opt === 'string' ? { id: i.toString(), text: opt } : opt
      ) : [],
    correctAnswer: q.correctOptionId || q.correctAnswer,
    explanation: q.explanation
  })) || [];
  
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
        questions={convertedQuestions}
        onComplete={onComplete}
      />
    </div>
  );
};

export default QuizContent;
