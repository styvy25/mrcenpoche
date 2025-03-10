
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion, QuizResult, Badge } from "./types";
import { getQuizQuestions } from "./quizData";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { toast } from "sonner";
import { ArrowRight, Award, RotateCcw } from "lucide-react";

const QuizContainer = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [loadingQuestions, setLoadingQuestions] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoadingQuestions(true);
        const questions = await getQuizQuestions();
        setQuestions(questions);
      } catch (error) {
        console.error("Failed to load quiz questions:", error);
        toast.error("Impossible de charger les questions du quiz");
      } finally {
        setLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswerSelection = (optionIndex: number) => {
    if (!isAnswerSubmitted) {
      setSelectedAnswer(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer !== null) {
      setIsAnswerSubmitted(true);
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newUserAnswers);

      // If correct answer, show success toast
      if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        toast.success("Bonne réponse !");
      } else {
        toast.error("Mauvaise réponse !");
      }
    } else {
      toast.warning("Veuillez sélectionner une réponse");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const correctAnswers = userAnswers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);

    const score = (correctAnswers / questions.length) * 100;
    
    // Determine unlocked badges based on score
    const unlockedBadges: Badge[] = [];
    
    if (score >= 70) {
      unlockedBadges.push({
        id: "culture-bronze",
        name: "Expert en Culture Camerounaise",
        description: "Vous avez démontré une bonne connaissance de la culture camerounaise.",
        icon: "award",
        category: "culture",
        level: "bronze",
        unlocked: true,
        dateUnlocked: new Date(),
        colorClass: "bg-amber-700"
      });
    }
    
    if (score >= 85) {
      unlockedBadges.push({
        id: "culture-argent",
        name: "Maître des Traditions",
        description: "Vous maîtrisez les traditions camerounaises.",
        icon: "medal",
        category: "culture",
        level: "argent",
        unlocked: true,
        dateUnlocked: new Date(),
        colorClass: "bg-gray-400"
      });
    }
    
    if (score === 100) {
      unlockedBadges.push({
        id: "culture-or",
        name: "Sage du Cameroun",
        description: "Vous êtes un véritable sage des connaissances sur le Cameroun.",
        icon: "trophy",
        category: "culture",
        level: "or",
        unlocked: true,
        dateUnlocked: new Date(),
        colorClass: "bg-yellow-500"
      });
      
      toast.success("Félicitations! Vous avez obtenu le badge d'or !");
    }

    const result: QuizResult = {
      correctAnswers,
      totalQuestions: questions.length,
      score,
      unlockedBadges,
      date: new Date()
    };

    setQuizResult(result);
    setQuizCompleted(true);

    // Save to local storage
    saveQuizResult(result);
  };

  const saveQuizResult = (result: QuizResult) => {
    try {
      const savedResults = JSON.parse(localStorage.getItem("quizResults") || "[]");
      const updatedResults = [...savedResults, result];
      localStorage.setItem("quizResults", JSON.stringify(updatedResults));
      
      // Save unlocked badges
      const savedBadges = JSON.parse(localStorage.getItem("unlockedBadges") || "[]");
      const updatedBadges = [...savedBadges];
      
      result.unlockedBadges.forEach(newBadge => {
        if (!updatedBadges.some(badge => badge.id === newBadge.id)) {
          updatedBadges.push(newBadge);
        }
      });
      
      localStorage.setItem("unlockedBadges", JSON.stringify(updatedBadges));
    } catch (error) {
      console.error("Failed to save quiz results:", error);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setQuizCompleted(false);
    setQuizResult(null);
  };

  if (loadingQuestions) {
    return (
      <Card className="p-8 text-center">
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="space-y-2">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-500">Chargement des questions...</p>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <CardContent className="pt-6">
          <p className="text-gray-500">Aucune question disponible pour le moment.</p>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted && quizResult) {
    return <QuizResult result={quizResult} onRestart={handleRestartQuiz} />;
  }

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-mrc-blue">
            Question {currentQuestionIndex + 1} / {questions.length}
          </span>
          <span className="text-sm text-gray-500">
            {questions[currentQuestionIndex].category} • {questions[currentQuestionIndex].difficulty}
          </span>
        </div>

        <QuizQuestion
          question={questions[currentQuestionIndex]}
          selectedAnswer={selectedAnswer}
          isAnswerSubmitted={isAnswerSubmitted}
          onSelectAnswer={handleAnswerSelection}
        />

        <div className="flex justify-between mt-6">
          {!isAnswerSubmitted ? (
            <Button onClick={handleSubmitAnswer} className="w-full bg-mrc-blue hover:bg-blue-700">
              Valider ma réponse
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full bg-mrc-green hover:bg-green-700 flex items-center justify-center"
            >
              {currentQuestionIndex < questions.length - 1 ? (
                <>Prochaine question <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                <>Terminer le quiz <Award className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizContainer;
