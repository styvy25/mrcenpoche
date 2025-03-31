
import { Button } from "@/components/ui/button";
import { moduleQuizzes } from "@/components/modules/quizData";

interface QuizGridProps {
  onStartQuiz: (moduleId: string) => void;
}

const QuizGrid = ({ onStartQuiz }: QuizGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
      {Object.entries(moduleQuizzes).map(([moduleId, quiz]) => (
        <div key={moduleId} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          <div className="p-4">
            <h3 className="font-medium mb-2">{quiz.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
            <Button 
              className="w-full bg-mrc-blue text-white" 
              onClick={() => onStartQuiz(moduleId)}
            >
              Commencer le quiz
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizGrid;
