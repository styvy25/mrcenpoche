
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { moduleQuizzes } from "./quizData";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle2, X, Award } from "lucide-react";

interface QuizContentProps {
  moduleId: string;
  onBack: () => void;
  onComplete: (score: number, totalQuestions: number) => void;
}

// Component to display quiz question and answers
const QuizQuestion = ({ 
  question, 
  options, 
  onAnswer,
  currentQuestionIndex,
  totalQuestions 
}: { 
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{question}</h3>
        <Badge variant="outline" className="ml-2">
          {currentQuestionIndex + 1}/{totalQuestions}
        </Badge>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <Button
            key={index}
            onClick={() => onAnswer(index.toString())}
            variant="outline"
            className="w-full text-left justify-start h-auto py-3 px-4 hover:bg-muted"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Component to display feedback after answering a question
const AnswerFeedback = ({ 
  isCorrect, 
  explanation, 
  onContinue 
}: { 
  isCorrect: boolean;
  explanation: string;
  onContinue: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}
    >
      <div className="flex items-center mb-2">
        {isCorrect ? (
          <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
        ) : (
          <X className="h-5 w-5 text-red-500 mr-2" />
        )}
        <h4 className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
          {isCorrect ? "Bonne réponse !" : "Mauvaise réponse"}
        </h4>
      </div>
      <p className="text-gray-600 mb-3">{explanation}</p>
      <Button onClick={onContinue} size="sm" variant="outline">
        Continuer
      </Button>
    </motion.div>
  );
};

const QuizContent = ({ moduleId, onBack, onComplete }: QuizContentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();
  
  const quiz = moduleQuizzes[Number(moduleId)];
  
  useEffect(() => {
    // Reset the quiz state when moduleId changes
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  }, [moduleId]);
  
  if (!quiz) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Quiz non trouvé</h2>
        <Button onClick={onBack}>Retour</Button>
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    const currentQuestionData = quiz.questions[currentQuestion];
    const isAnswerCorrect = answer === currentQuestionData.correctAnswer;
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    setShowFeedback(false);
    
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      
      // Show toast for achievement when quiz is completed
      toast({
        title: "Quiz terminé !",
        description: (
          <div className="flex items-center">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <span>Vous avez obtenu un nouvel accomplissement !</span>
          </div>
        ),
      });
      
      onComplete(score + (isCorrect ? 1 : 0), quiz.questions.length);
    }
  };

  if (quizCompleted) {
    return (
      <div className="p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100 mb-4">
            <Award className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Quiz terminé !</h2>
          <p className="text-gray-600 mb-4">
            Votre score : {score} sur {quiz.questions.length}
          </p>
        </motion.div>
        
        <div className="space-x-4">
          <Button onClick={onBack} variant="outline">
            Retour aux modules
          </Button>
          <Button onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowFeedback(false);
            setQuizCompleted(false);
          }}>
            Recommencer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <p className="text-gray-600">Question {currentQuestion + 1} sur {quiz.questions.length}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {showFeedback ? (
          <AnswerFeedback 
            isCorrect={isCorrect}
            explanation={quiz.questions[currentQuestion].explanation || ""}
            onContinue={handleContinue}
          />
        ) : (
          <QuizQuestion
            question={quiz.questions[currentQuestion].question}
            options={quiz.questions[currentQuestion].options}
            onAnswer={handleAnswer}
            currentQuestionIndex={currentQuestion}
            totalQuestions={quiz.questions.length}
          />
        )}
      </div>

      <Button variant="ghost" onClick={onBack}>
        Quitter le quiz
      </Button>
    </div>
  );
};

export default QuizContent;
