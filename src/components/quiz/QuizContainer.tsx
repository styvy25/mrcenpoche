
import React, { useState, useEffect } from "react";
import { Category, QuizQuestion } from "./types";
import QuestionScreen from "./QuestionScreen";
import ResultsScreen from "./ResultsScreen";
import { calculateEarnedBadges } from "./badgeUtils";
import { ChevronLeft, ChevronRight, Play, Award, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { fetchCategories } from "@/services/quizService";
import { useToast } from "@/hooks/use-toast";

interface QuizContainerProps {
  initialCategories?: Category[];
}

const QuizContainer: React.FC<QuizContainerProps> = ({ initialCategories = [] }) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
        setLoading(false);
      } catch (err) {
        console.error("Error loading quiz categories:", err);
        setError("Impossible de charger les quiz. Veuillez réessayer plus tard.");
        setLoading(false);
        toast({
          title: "Erreur",
          description: "Impossible de charger les quiz. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
      }
    };
    
    loadCategories();
  }, [toast]);
  
  // Find the first category with questions
  const initialCategory = categories.find(cat => 
    cat.questions && cat.questions.length > 0
  ) || categories[0];
  
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(categories.indexOf(initialCategory) >= 0 ? categories.indexOf(initialCategory) : 0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | undefined)[]>([]);
  const [quizResults, setQuizResults] = useState<{ score: number } | null>(null);
  const [currentCategory, setCurrentCategory] = useState<Category | undefined>(initialCategory);
  const [isStarted, setIsStarted] = useState(false);
  const [isCategorySelectionOpen, setIsCategorySelectionOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  // Update current category when categories change
  useEffect(() => {
    if (categories.length > 0) {
      const initialCat = categories.find(cat => 
        cat.questions && cat.questions.length > 0
      ) || categories[0];
      
      setCurrentCategory(initialCat);
      setCurrentCategoryIndex(categories.indexOf(initialCat) >= 0 ? categories.indexOf(initialCat) : 0);
    }
  }, [categories]);

  const handleCategoryChange = (index: number) => {
    if (index >= 0 && index < categories.length) {
      setCurrentCategoryIndex(index);
      setCurrentCategory(categories[index]);
      setCurrentQuestionIndex(0);
      setSelectedAnswers([]);
      setQuizResults(null);
      setIsStarted(false);
    }
  };

  const handleAnswer = (answerIndex: string) => {
    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const question = currentCategory.questions[currentQuestionIndex];

    if (!question) {
      console.error("No current question found");
      return;
    }

    // Update the selected answers
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);

    // Check if this is the last question
    const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;

    if (isLastQuestion) {
      calculateResults();
    } else {
      nextQuestion();
    }
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const calculateResults = () => {
    if (!currentCategory) {
      console.error("No current category found");
      return;
    }

    const questions = currentCategory.questions;
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        score++;
      }
    });

    setQuizResults({ score: score });
    
    toast({
      title: "Quiz terminé !",
      description: `Votre score: ${score}/${questions.length}`,
    });
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setQuizResults(null);
    setIsStarted(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mrc-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-500 mb-4">{error}</h2>
        <Button onClick={() => window.location.reload()} className="bg-mrc-blue">
          Réessayer
        </Button>
      </div>
    );
  }

  // If no category with questions is found
  if (!currentCategory || !currentCategory.questions || currentCategory.questions.length === 0) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="text-xl font-semibold text-mrc-blue mb-4">Aucune question disponible</h2>
        <p className="text-gray-600">Veuillez sélectionner une autre catégorie ou réessayer plus tard.</p>
      </div>
    );
  }

  const currentQuestion = currentCategory.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentCategory.questions.length - 1;
  const isTestCategory = currentCategory.id === "test";

  // Welcome screen for the quiz
  if (!isStarted) {
    return (
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg animate-scale-in">
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-mrc-blue">
              {currentCategory.name}
            </h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsCategorySelectionOpen(!isCategorySelectionOpen)}
              className="text-sm"
            >
              Changer de catégorie
            </Button>
          </div>

          {isCategorySelectionOpen && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-full mt-2 border border-gray-200 animate-fade-in">
              <h3 className="font-semibold mb-2 text-gray-700">Catégories de quiz</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map((category, index) => (
                  <div 
                    key={category.id}
                    onClick={() => {
                      handleCategoryChange(index);
                      setIsCategorySelectionOpen(false);
                    }}
                    className={`p-2 rounded-md cursor-pointer transition-all ${
                      currentCategoryIndex === index 
                        ? 'bg-blue-100 text-mrc-blue font-medium' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${category.color || 'bg-gray-400'}`}></span>
                      <span>{category.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">
                        {category.questions?.length || 0} questions
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center p-4 mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <p className="text-gray-700 mb-2">
              Ce quiz contient <span className="font-bold">{currentCategory.questions.length}</span> questions.
            </p>
            {isTestCategory && (
              <div className="mt-2 flex items-center justify-center gap-2 text-sm bg-purple-100 p-2 rounded-md">
                <Smartphone size={16} />
                <p className="text-purple-800">Épreuve test officielle</p>
              </div>
            )}
          </div>

          <Button 
            onClick={() => setIsStarted(true)} 
            className="w-full py-3 bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
          >
            <Play className="h-5 w-5 group-hover:animate-pulse" />
            Commencer le Quiz
          </Button>
          
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="ghost"
              disabled={currentCategoryIndex === 0}
              onClick={() => handleCategoryChange(currentCategoryIndex - 1)}
              className="text-gray-500 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>
            <Button
              variant="ghost"
              disabled={currentCategoryIndex === categories.length - 1}
              onClick={() => handleCategoryChange(currentCategoryIndex + 1)}
              className="text-gray-500 flex items-center gap-1"
            >
              Suivant
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white shadow-lg rounded-xl overflow-hidden transition-all ${isSmallScreen ? 'p-4' : 'p-6'} animate-fade-in`}>
      <div className="relative">
        {quizResults ? (
          <ResultsScreen
            score={quizResults.score}
            totalQuestions={currentCategory.questions.length}
            categoryName={currentCategory.label || currentCategory.name || ""}
            selectedAnswers={selectedAnswers}
            questions={currentCategory.questions}
            onRestart={restartQuiz}
            earnedBadges={calculateEarnedBadges(quizResults.score, currentCategory.questions.length)}
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-700">
                {currentCategory.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Question {currentQuestionIndex + 1}/{currentCategory.questions.length}
                </span>
                {isTestCategory && (
                  <span className="flex items-center gap-1 text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    <Award size={14} />
                    Test
                  </span>
                )}
              </div>
            </div>

            <QuestionScreen
              currentQuestion={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswers[currentQuestionIndex]}
              isLastQuestion={isLastQuestion}
              onNextQuestion={nextQuestion}
              onCalculateResults={calculateResults}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
