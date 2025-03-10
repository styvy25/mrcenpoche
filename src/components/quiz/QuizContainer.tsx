
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { getQuizQuestions } from "./quizData";
import { Badge as BadgeType, QuizQuestion as QuizQuestionType, QuizResult as QuizResultType } from "./types";
import BadgesDisplay from "./BadgesDisplay";
import { toast } from "sonner";

// Confetti animation
const createConfetti = () => {
  const confettiContainer = document.querySelector(".confetti-container");
  if (!confettiContainer) return;

  // Clear existing confetti
  confettiContainer.innerHTML = "";

  const colors = ["#FFD700", "#FF6347", "#4169E1", "#32CD32", "#FF4500", "#8A2BE2"];
  
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.width = Math.random() * 10 + 5 + "px";
    confetti.style.height = Math.random() * 10 + 5 + "px";
    confetti.style.transformOrigin = "center";
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.opacity = (Math.random() + 0.5).toString();
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    
    confettiContainer.appendChild(confetti);
  }
  
  // Remove confetti after animation
  setTimeout(() => {
    if (confettiContainer) {
      confettiContainer.innerHTML = "";
    }
  }, 5000);
};

const QuizContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResultType | null>(null);
  const [badges, setBadges] = useState<BadgeType[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestionType[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load quiz questions
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const questions = await getQuizQuestions();
        setQuizQuestions(questions);
      } catch (err) {
        console.error("Failed to load quiz questions:", err);
        toast.error("Impossible de charger les questions du quiz");
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Load badges from localStorage on component mount
  useEffect(() => {
    const savedBadges = localStorage.getItem("quiz_badges");
    if (savedBadges) {
      setBadges(JSON.parse(savedBadges));
    } else {
      // Initialize badges if not exist
      const initialBadges: BadgeType[] = [
        {
          id: "culture-bronze",
          name: "Novice Culturel",
          description: "Vous avez commencé votre voyage dans la culture camerounaise",
          icon: "🏆",
          category: "culture",
          level: "bronze",
          unlocked: false,
          colorClass: "bg-amber-600",
          imageUrl: "/badges/culture-bronze.png"
        },
        {
          id: "culture-silver",
          name: "Apprenti Culturel",
          description: "Vous avez une bonne connaissance de la culture camerounaise",
          icon: "🏆",
          category: "culture",
          level: "argent",
          unlocked: false,
          colorClass: "bg-gray-400",
          imageUrl: "/badges/culture-silver.png"
        },
        {
          id: "culture-gold",
          name: "Expert Culturel",
          description: "Vous maîtrisez la culture camerounaise",
          icon: "🏆",
          category: "culture",
          level: "or",
          unlocked: false,
          colorClass: "bg-yellow-500",
          imageUrl: "/badges/culture-gold.png"
        },
        {
          id: "histoire-bronze",
          name: "Novice Historien",
          description: "Vous avez commencé à explorer l'histoire du Cameroun",
          icon: "🏆",
          category: "histoire",
          level: "bronze",
          unlocked: false,
          colorClass: "bg-amber-600",
          imageUrl: "/badges/history-bronze.png"
        },
        {
          id: "histoire-silver",
          name: "Apprenti Historien",
          description: "Vous avez une bonne connaissance de l'histoire du Cameroun",
          icon: "🏆",
          category: "histoire",
          level: "argent",
          unlocked: false,
          colorClass: "bg-gray-400",
          imageUrl: "/badges/history-silver.png"
        },
        {
          id: "histoire-gold",
          name: "Expert Historien",
          description: "Vous maîtrisez l'histoire du Cameroun",
          icon: "🏆",
          category: "histoire",
          level: "or",
          unlocked: false,
          colorClass: "bg-yellow-500",
          imageUrl: "/badges/history-gold.png"
        },
        {
          id: "traditions-bronze",
          name: "Novice des Traditions",
          description: "Vous avez commencé à découvrir les traditions camerounaises",
          icon: "🏆",
          category: "traditions",
          level: "bronze",
          unlocked: false,
          colorClass: "bg-amber-600",
          imageUrl: "/badges/traditions-bronze.png"
        },
        {
          id: "traditions-silver",
          name: "Apprenti des Traditions",
          description: "Vous avez une bonne connaissance des traditions camerounaises",
          icon: "🏆",
          category: "traditions",
          level: "argent",
          unlocked: false,
          colorClass: "bg-gray-400",
          imageUrl: "/badges/traditions-silver.png"
        },
        {
          id: "traditions-gold",
          name: "Expert des Traditions",
          description: "Vous maîtrisez les traditions camerounaises",
          icon: "🏆",
          category: "traditions",
          level: "or",
          unlocked: false,
          colorClass: "bg-yellow-500",
          imageUrl: "/badges/traditions-gold.png"
        },
        {
          id: "politique-bronze",
          name: "Novice Politique",
          description: "Vous avez commencé à comprendre la politique camerounaise",
          icon: "🏆",
          category: "politique",
          level: "bronze",
          unlocked: false,
          colorClass: "bg-amber-600",
          imageUrl: "/badges/politics-bronze.png"
        },
        {
          id: "politique-silver",
          name: "Apprenti Politique",
          description: "Vous avez une bonne connaissance de la politique camerounaise",
          icon: "🏆",
          category: "politique",
          level: "argent",
          unlocked: false,
          colorClass: "bg-gray-400",
          imageUrl: "/badges/politics-silver.png"
        },
        {
          id: "politique-gold",
          name: "Expert Politique",
          description: "Vous maîtrisez la politique camerounaise",
          icon: "🏆",
          category: "politique",
          level: "or",
          unlocked: false,
          colorClass: "bg-yellow-500",
          imageUrl: "/badges/politics-gold.png"
        },
        {
          id: "geographie-bronze",
          name: "Novice Géographe",
          description: "Vous avez commencé à explorer la géographie du Cameroun",
          icon: "🏆",
          category: "geographie",
          level: "bronze",
          unlocked: false,
          colorClass: "bg-amber-600",
          imageUrl: "/badges/geography-bronze.png"
        },
        {
          id: "geographie-silver",
          name: "Apprenti Géographe",
          description: "Vous avez une bonne connaissance de la géographie du Cameroun",
          icon: "🏆",
          category: "geographie",
          level: "argent",
          unlocked: false,
          colorClass: "bg-gray-400",
          imageUrl: "/badges/geography-silver.png"
        },
        {
          id: "geographie-gold",
          name: "Expert Géographe",
          description: "Vous maîtrisez la géographie du Cameroun",
          icon: "🏆",
          category: "geographie",
          level: "or",
          unlocked: false,
          colorClass: "bg-yellow-500",
          imageUrl: "/badges/geography-gold.png"
        }
      ];
      setBadges(initialBadges);
      localStorage.setItem("quiz_badges", JSON.stringify(initialBadges));
    }
  }, []);

  // Calculate available categories from quiz questions
  const categories = [...new Set(quizQuestions.map(q => q.category))];

  // Filter questions by selected category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredQuestions(quizQuestions.filter(q => q.category === selectedCategory));
    } else {
      setFilteredQuestions([]);
    }
  }, [selectedCategory, quizQuestions]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setQuizStarted(false);
    setShowResult(false);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setShowResult(false);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result
      const correctAnswersCount = newAnswers.filter(
        (answer, index) => answer === filteredQuestions[index].correctAnswer
      ).length;
      
      const score = Math.round((correctAnswersCount / filteredQuestions.length) * 100);
      
      // Check which badges to unlock
      let unlockedBadges: BadgeType[] = [];
      const updatedBadges = [...badges];
      
      if (selectedCategory) {
        // Find badges for the current category
        const categoryBadges = updatedBadges.filter(
          badge => badge.category === selectedCategory
        );
        
        // Unlock bronze badge at 50%
        if (score >= 50) {
          const bronzeBadge = categoryBadges.find(b => b.level === "bronze");
          if (bronzeBadge && !bronzeBadge.unlocked) {
            bronzeBadge.unlocked = true;
            bronzeBadge.dateUnlocked = new Date();
            unlockedBadges.push(bronzeBadge);
          }
        }
        
        // Unlock silver badge at 75%
        if (score >= 75) {
          const silverBadge = categoryBadges.find(b => b.level === "argent");
          if (silverBadge && !silverBadge.unlocked) {
            silverBadge.unlocked = true;
            silverBadge.dateUnlocked = new Date();
            unlockedBadges.push(silverBadge);
          }
        }
        
        // Unlock gold badge at 90%
        if (score >= 90) {
          const goldBadge = categoryBadges.find(b => b.level === "or");
          if (goldBadge && !goldBadge.unlocked) {
            goldBadge.unlocked = true;
            goldBadge.dateUnlocked = new Date();
            unlockedBadges.push(goldBadge);
          }
        }
      }
      
      // Save updated badges
      setBadges(updatedBadges);
      localStorage.setItem("quiz_badges", JSON.stringify(updatedBadges));
      
      // Create result object
      const quizResult: QuizResultType = {
        correctAnswers: correctAnswersCount,
        totalQuestions: filteredQuestions.length,
        score: score,
        unlockedBadges: unlockedBadges,
        date: new Date()
      };
      
      setResult(quizResult);
      setShowResult(true);
      
      // Show confetti for good results
      if (score >= 70) {
        createConfetti();
      }
      
      // Add toast notification for new badges
      if (unlockedBadges.length > 0) {
        toast({
          title: "Nouveau badge débloqué !",
          description: `Félicitations ! Vous avez débloqué ${unlockedBadges.length > 1 ? 'des badges' : 'un badge'} !`,
        });
      }
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setShowResult(false);
    setSelectedCategory(null);
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  // Calculate progress percentage
  const progressPercentage = filteredQuestions.length > 0
    ? Math.round(((currentQuestionIndex) / filteredQuestions.length) * 100)
    : 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mrc-blue"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="confetti-container fixed inset-0 pointer-events-none"></div>
      
      {!quizStarted && !showResult ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">Quiz Culturel Camerounais</h2>
          
          {!selectedCategory ? (
            <div className="space-y-4">
              <p className="text-center text-gray-600 dark:text-gray-300">
                Choisissez une catégorie pour commencer le quiz
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
                  >
                    <div className="text-4xl mb-2">
                      {category === "culture" ? "🎭" : 
                       category === "histoire" ? "📜" :
                       category === "traditions" ? "👘" :
                       category === "politique" ? "🏛️" : "🌍"}
                    </div>
                    <h3 className="text-lg font-medium capitalize mb-1">
                      {category}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {quizQuestions.filter(q => q.category === category).length} questions
                    </p>
                  </button>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Vos badges</h3>
                <BadgesDisplay badges={badges} />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory(null)}
                >
                  Retour aux catégories
                </Button>
                <Badge className="capitalize px-3 py-1 text-sm">
                  {selectedCategory}
                </Badge>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-2 capitalize">
                  Quiz de {selectedCategory}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {filteredQuestions.length} questions pour tester vos connaissances
                </p>
                <Button onClick={startQuiz} className="w-full bg-mrc-blue hover:bg-blue-700">
                  Commencer le Quiz
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : showResult && result ? (
        <QuizResult
          result={result}
          onRestart={resetQuiz}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={resetQuiz}>
              Quitter le quiz
            </Button>
            <Badge className="capitalize px-3 py-1 text-sm">
              Question {currentQuestionIndex + 1}/{filteredQuestions.length}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {filteredQuestions.length > 0 && currentQuestionIndex < filteredQuestions.length && (
            <QuizQuestion
              question={filteredQuestions[currentQuestionIndex]}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QuizContainer;
