
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { moduleQuizzes } from "./quizData";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent = ({ moduleId, onBack, onComplete }: QuizContentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();
  
  const quiz = moduleQuizzes[Number(moduleId)];
  
  if (!quiz) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz non trouvé</h2>
        <Button onClick={onBack}>Retour</Button>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    if (answer === quiz.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Bonne réponse !",
        description: quiz.questions[currentQuestion].explanation,
      });
    } else {
      toast({
        title: "Mauvaise réponse",
        description: quiz.questions[currentQuestion].explanation,
        variant: "destructive",
      });
    }

    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(score + 1, quiz.questions.length);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600">Question {currentQuestion + 1} sur {quiz.questions.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {quiz.questions[currentQuestion].question}
        </h3>

        <div className="space-y-3">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index.toString())}
              variant="outline"
              className="w-full text-left justify-start h-auto py-3 px-4"
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      <Button variant="ghost" onClick={onBack}>
        Quitter le quiz
      </Button>
    </div>
  );
};

export default QuizContent;
