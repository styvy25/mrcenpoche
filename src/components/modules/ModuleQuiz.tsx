
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ModuleQuizProps {
  moduleId: string;
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
}

const ModuleQuiz: React.FC<ModuleQuizProps> = ({
  moduleId,
  questions,
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Empêcher de changer de réponse
    setSelectedAnswer(answerIndex);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Bonne réponse !",
        description: "Félicitations, vous avez répondu correctement.",
        variant: "default",
      });
    } else {
      toast({
        title: "Réponse incorrecte",
        description: "Consultez l'explication pour comprendre.",
        variant: "destructive",
      });
    }

    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      onComplete(score, questions.length);
    }
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-2xl font-bold">Quiz terminé</h2>
            <p className="text-lg">
              Votre score: {score} sur {questions.length}
            </p>
            <Progress value={percentage} className="h-2 w-full mb-2" />
            <p className="text-sm text-gray-500">
              {percentage >= 80
                ? "Excellent travail ! Vous maîtrisez ce sujet."
                : percentage >= 60
                ? "Bon travail. Vous avez une bonne compréhension du sujet."
                : "Vous pourriez réviser ce module pour améliorer votre compréhension."}
            </p>
            <Button
              className="mt-4 bg-mrc-blue"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setShowExplanation(false);
                setScore(0);
                setQuizCompleted(false);
              }}
            >
              Recommencer le quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardContent className="p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} sur {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            Score: {score}
          </span>
        </div>
        <Progress 
          value={((currentQuestion + 1) / questions.length) * 100} 
          className="h-2 w-full mb-6" 
        />
        
        <h3 className="text-xl font-semibold mb-4">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="space-y-3 mb-6">
          {questions[currentQuestion].options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`p-3 border rounded-lg cursor-pointer transition-all flex justify-between items-center ${
                selectedAnswer === index
                  ? selectedAnswer === questions[currentQuestion].correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "hover:bg-gray-50 hover:border-gray-300 border-gray-200"
              }`}
            >
              <span>{option}</span>
              {selectedAnswer === index && (
                <>
                  {selectedAnswer === questions[currentQuestion].correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
        
        {showExplanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-mrc-blue"
          >
            {currentQuestion < questions.length - 1
              ? "Question suivante"
              : "Terminer le quiz"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleQuiz;
