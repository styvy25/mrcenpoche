
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Check, X, HelpCircle } from "lucide-react";
import { moduleQuizzes } from "../modules/quizData";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizContent: React.FC<QuizContentProps> = ({ moduleId, onBack, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();
  
  const quizData = moduleQuizzes[Number(moduleId)];
  
  useEffect(() => {
    // Réinitialiser le quiz lorsque moduleId change
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setShowResults(false);
    setShowExplanation(false);
  }, [moduleId]);
  
  if (!quizData) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quiz non trouvé</h2>
        <p className="text-gray-600 mb-4">Nous n'avons pas pu trouver le quiz demandé.</p>
        <Button onClick={onBack}>Retour</Button>
      </div>
    );
  }

  const handleAnswer = (answerIndex: string) => {
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newUserAnswers);
    
    if (answerIndex === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Bonne réponse !",
        description: "Continuez comme ça !",
      });
    } else {
      toast({
        title: "Mauvaise réponse",
        description: "Lisez l'explication pour en savoir plus.",
        variant: "destructive",
      });
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
      onComplete(score, quizData.questions.length);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setShowResults(false);
    setShowExplanation(false);
  };

  // Afficher les résultats si le quiz est terminé
  if (showResults) {
    const percentage = Math.round((score / quizData.questions.length) * 100);
    
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Résultats du Quiz</h2>
        
        <div className="mb-6 text-center">
          <p className="text-3xl font-bold mb-2">
            {score} / {quizData.questions.length}
          </p>
          <Progress value={percentage} className="h-2 w-full mb-2" />
          <p className="text-sm text-gray-600">
            {percentage >= 80 ? "Excellent ! Vous maîtrisez ce sujet." : 
             percentage >= 60 ? "Bien joué ! Continuez vos efforts." : 
             "Vous pourriez réviser ce module pour améliorer votre score."}
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          {quizData.questions.map((question, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                {userAnswers[index] === question.correctAnswer ? (
                  <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                )}
                <p className="font-medium">{question.question}</p>
              </div>
              
              <div className="ml-7 text-sm">
                <p>Votre réponse: {question.options[parseInt(userAnswers[index] || "0")]}</p>
                {userAnswers[index] !== question.correctAnswer && (
                  <p className="text-green-600">
                    Réponse correcte: {question.options[parseInt(question.correctAnswer)]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={onBack}>
            Retour aux modules
          </Button>
          <Button onClick={handleRestartQuiz}>
            Recommencer le quiz
          </Button>
        </div>
      </div>
    );
  }

  // Afficher la question actuelle
  const currentQuestionData = quizData.questions[currentQuestion];
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">{quizData.title}</h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} sur {quizData.questions.length}
          </span>
          <span className="text-sm text-gray-600">
            Score: {score}
          </span>
        </div>
        <Progress 
          value={((currentQuestion + 1) / quizData.questions.length) * 100} 
          className="h-2 w-full" 
        />
      </div>

      <div className="mb-6">
        <div className="flex items-start gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
          <h3 className="text-lg font-semibold">
            {currentQuestionData.question}
          </h3>
        </div>
        
        <div className="space-y-3 ml-7">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !userAnswers[currentQuestion] && handleAnswer(index.toString())}
              disabled={userAnswers[currentQuestion] !== undefined}
              className={`w-full p-3 text-left border rounded-lg transition-colors ${
                userAnswers[currentQuestion] === index.toString()
                  ? userAnswers[currentQuestion] === currentQuestionData.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
          <p className="text-sm text-gray-700">{currentQuestionData.explanation}</p>
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Quitter le quiz
        </Button>
        
        {userAnswers[currentQuestion] !== undefined && (
          <Button onClick={handleNextQuestion}>
            {currentQuestion < quizData.questions.length - 1 ? "Question suivante" : "Voir les résultats"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizContent;
