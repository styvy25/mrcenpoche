
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Brain, CheckCircle, Clock, Play, Trophy, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Sample quiz categories
const quizCategories = [
  {
    id: 'history',
    title: 'Histoire du MRC',
    description: 'Quiz sur l\'histoire du MRC et ses fondateurs',
    icon: <Brain className="h-10 w-10 text-mrc-blue" />,
    premium: false
  },
  {
    id: 'ideology',
    title: 'Idéologie politique',
    description: 'Questions sur les idées et valeurs du MRC',
    icon: <Brain className="h-10 w-10 text-mrc-green" />,
    premium: false
  },
  {
    id: 'program',
    title: 'Programme électoral',
    description: 'Quiz sur les propositions politiques du MRC',
    icon: <Brain className="h-10 w-10 text-mrc-red" />,
    premium: true
  },
  {
    id: 'leaders',
    title: 'Leaders du MRC',
    description: 'Questions sur les personnalités importantes du MRC',
    icon: <Brain className="h-10 w-10 text-purple-500" />,
    premium: true
  }
];

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    question: 'En quelle année le MRC a-t-il été fondé ?',
    options: ['2008', '2010', '2012', '2015'],
    correctAnswer: 2,
    explanation: 'Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto.'
  },
  {
    id: 2,
    question: 'Qui est le président du MRC ?',
    options: ['John Fru Ndi', 'Maurice Kamto', 'Cabral Libii', 'Akere Muna'],
    correctAnswer: 1,
    explanation: 'Maurice Kamto est le président du MRC depuis sa fondation en 2012.'
  },
  {
    id: 3,
    question: 'Quelle est la couleur principale du MRC ?',
    options: ['Rouge', 'Bleu', 'Vert', 'Jaune'],
    correctAnswer: 1,
    explanation: 'Le bleu est la couleur principale du MRC, symbolisant l\'espoir et la paix.'
  },
  {
    id: 4,
    question: 'Quel poste ministériel Maurice Kamto a-t-il occupé avant de fonder le MRC ?',
    options: ['Ministre de la Justice', 'Ministre de l\'Économie', 'Ministre des Affaires Étrangères', 'Ministre délégué à la Justice'],
    correctAnswer: 3,
    explanation: 'Maurice Kamto a été Ministre délégué à la Justice du Cameroun de 2004 à 2011.'
  },
  {
    id: 5,
    question: 'Quelle est la devise du MRC ?',
    options: ['Le Cameroun d\'abord', 'L\'avenir est maintenant', 'Le changement est possible', 'Unis dans la diversité'],
    correctAnswer: 0,
    explanation: 'La devise du MRC est "Le Cameroun d\'abord", mettant l\'accent sur la priorité des intérêts nationaux.'
  }
];

const QuizPage = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const { canTakeQuiz, incrementQuizzes } = usePlanLimits();
  const { toast } = useToast();

  // Timer for quiz
  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      
      return () => clearTimeout(timerId);
    } else if (quizStarted && timeLeft === 0 && !showResults) {
      // Time's up, show results
      calculateResults();
    }
  }, [quizStarted, timeLeft, showResults]);

  const handleStartQuiz = (categoryId: string) => {
    const category = quizCategories.find(cat => cat.id === categoryId);
    
    if (category?.premium) {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    if (!canTakeQuiz()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de quiz. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return;
    }
    
    // Increment quiz counter
    incrementQuizzes();
    
    setSelectedCategory(categoryId);
    setShowQuiz(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
    setTimeLeft(30);
    setQuizStarted(true);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    
    // Check if answer is correct
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setShowResults(true);
    setQuizStarted(false);
    
    // Display result toast
    const percentage = Math.round((score / quizQuestions.length) * 100);
    const message = percentage >= 70 
      ? "Félicitations pour votre score !" 
      : "Continuez à vous améliorer !";
    
    toast({
      title: `Quiz terminé : ${score}/${quizQuestions.length}`,
      description: message,
    });
  };

  const handleRestartQuiz = () => {
    if (!canTakeQuiz()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de quiz. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return;
    }
    
    incrementQuizzes();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
    setTimeLeft(30);
    setQuizStarted(true);
  };

  const handleBackToCategories = () => {
    setShowQuiz(false);
    setSelectedCategory(null);
    setQuizStarted(false);
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz MRC</h1>
        
        {!showQuiz ? (
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-muted-foreground mb-6">
              Testez vos connaissances sur le MRC et la politique camerounaise
            </p>
            
            <PremiumBanner type="quiz" className="mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quizCategories.map((category) => (
                <Card 
                  key={category.id}
                  className={`hover:shadow-md transition-shadow ${category.premium ? 'border-amber-300' : ''}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {category.icon}
                        <div>
                          <CardTitle>{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      {category.premium && (
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button 
                      onClick={() => handleStartQuiz(category.id)}
                      className="w-full"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Commencer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={handleBackToCategories}
              className="mb-4"
            >
              ← Retour aux catégories
            </Button>
            
            <Card>
              {!showResults ? (
                <>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>
                          {quizCategories.find(cat => cat.id === selectedCategory)?.title}
                        </CardTitle>
                        <CardDescription>
                          Question {currentQuestionIndex + 1} sur {quizQuestions.length}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="font-mono">{timeLeft}s</span>
                      </div>
                    </div>
                    <Progress 
                      value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} 
                      className="mt-2"
                    />
                  </CardHeader>
                  
                  <CardContent>
                    <div className="py-4">
                      <h3 className="text-lg font-medium mb-4">
                        {quizQuestions[currentQuestionIndex].question}
                      </h3>
                      
                      <div className="space-y-2">
                        {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                          <div
                            key={index}
                            className={`
                              p-3 border rounded-lg cursor-pointer transition-colors
                              ${selectedAnswer === index 
                                ? 'bg-mrc-blue text-white' 
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                            `}
                            onClick={() => handleSelectAnswer(index)}
                          >
                            {option}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end">
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                    >
                      {currentQuestionIndex < quizQuestions.length - 1 
                        ? 'Question suivante' 
                        : 'Terminer le quiz'}
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {score >= quizQuestions.length / 2 
                        ? <Trophy className="h-16 w-16 text-amber-500" /> 
                        : <Award className="h-16 w-16 text-gray-400" />}
                    </div>
                    <CardTitle className="text-2xl">Résultats du Quiz</CardTitle>
                    <CardDescription>
                      {score >= quizQuestions.length / 2 
                        ? 'Félicitations pour votre score !' 
                        : 'Continuez à vous améliorer !'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">
                        {score}/{quizQuestions.length}
                      </div>
                      <p className="text-muted-foreground">
                        Score obtenu
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Résumé des questions</h3>
                      
                      {quizQuestions.map((question, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start gap-2 mb-2">
                            {answers[index] === question.correctAnswer 
                              ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" /> 
                              : <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                            <h4 className="font-medium">{question.question}</h4>
                          </div>
                          
                          <div className="pl-7 text-sm">
                            <p>Votre réponse: {answers[index] !== undefined ? question.options[answers[index]] : 'Aucune réponse'}</p>
                            <p className="text-green-600">Réponse correcte: {question.options[question.correctAnswer]}</p>
                            <p className="text-muted-foreground mt-1">{question.explanation}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      onClick={handleBackToCategories}
                    >
                      Retour aux catégories
                    </Button>
                    <Button 
                      onClick={handleRestartQuiz}
                    >
                      Recommencer le quiz
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>
        )}
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </MainLayout>
  );
};

export default QuizPage;
