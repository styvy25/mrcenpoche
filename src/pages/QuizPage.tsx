
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, CheckCircle, Clock, Play, ScrollText, Trophy, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
    icon: <ScrollText className="h-10 w-10 text-mrc-blue" />,
    premium: false
  },
  {
    id: 'ideology',
    title: 'Idéologie politique',
    description: 'Questions sur les idées et valeurs du MRC',
    icon: <ScrollText className="h-10 w-10 text-mrc-green" />,
    premium: false
  },
  {
    id: 'program',
    title: 'Programme électoral',
    description: 'Quiz sur les propositions politiques du MRC',
    icon: <ScrollText className="h-10 w-10 text-mrc-red" />,
    premium: true
  },
  {
    id: 'leaders',
    title: 'Leaders du MRC',
    description: 'Questions sur les personnalités importantes du MRC',
    icon: <ScrollText className="h-10 w-10 text-purple-500" />,
    premium: true
  }
];

// Sample quiz questions
const quizQuestions = [
  {
    id: 1,
    category: 'history',
    question: 'En quelle année le MRC a-t-il été fondé ?',
    options: ['2008', '2010', '2012', '2015'],
    correctAnswer: '2012',
    explanation: 'Le Mouvement pour la Renaissance du Cameroun (MRC) a été fondé en 2012 par Maurice Kamto et d\'autres personnalités politiques camerounaises.'
  },
  {
    id: 2,
    category: 'history',
    question: 'Qui est le fondateur du MRC ?',
    options: ['Paul Biya', 'Maurice Kamto', 'John Fru Ndi', 'Cabral Libii'],
    correctAnswer: 'Maurice Kamto',
    explanation: 'Maurice Kamto est le fondateur et président du MRC depuis sa création.'
  },
  {
    id: 3,
    category: 'history',
    question: 'Quel poste Maurice Kamto a-t-il occupé dans le gouvernement camerounais avant de fonder le MRC ?',
    options: ['Ministre de la Justice', 'Ministre de l\'Éducation', 'Ministre délégué à la Justice', 'Ministre des Finances'],
    correctAnswer: 'Ministre délégué à la Justice',
    explanation: 'Maurice Kamto a occupé le poste de Ministre délégué à la Justice du Cameroun de 2004 à 2011, avant de fonder le MRC en 2012.'
  },
  {
    id: 4,
    category: 'history',
    question: 'En quelle année Maurice Kamto s\'est-il présenté pour la première fois à l\'élection présidentielle camerounaise ?',
    options: ['2011', '2013', '2018', '2020'],
    correctAnswer: '2018',
    explanation: 'Maurice Kamto s\'est présenté pour la première fois à l\'élection présidentielle camerounaise en 2018.'
  },
  {
    id: 5,
    category: 'history',
    question: 'Quel slogan a été utilisé par le MRC lors de l\'élection présidentielle de 2018 ?',
    options: ['Cameroun d\'abord', 'L\'heure du changement', 'Ensemble, changeons le Cameroun', 'La solution pour le Cameroun'],
    correctAnswer: 'L\'heure du changement',
    explanation: 'Le slogan "L\'heure du changement" a été utilisé par le MRC et Maurice Kamto lors de la campagne présidentielle de 2018.'
  }
];

type QuizStep = 'categories' | 'instructions' | 'questions' | 'results';

type EarnedBadge = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState<QuizStep>('categories');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questions, setQuestions] = useState<typeof quizQuestions>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [quizEndTime, setQuizEndTime] = useState<number | null>(null);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([]);
  
  const { userPlan, canUseFeature } = usePlanLimits();
  const { toast } = useToast();

  const handleSelectCategory = (categoryId: string) => {
    const category = quizCategories.find(cat => cat.id === categoryId);
    
    if (category?.premium && userPlan === 'free') {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    setSelectedCategory(categoryId);
    
    // Filter questions by selected category
    const categoryQuestions = quizQuestions.filter(q => q.category === categoryId);
    // Shuffle questions
    const shuffledQuestions = [...categoryQuestions].sort(() => Math.random() - 0.5);
    // Take first 5 questions or all if less than 5
    const selectedQuestions = shuffledQuestions.slice(0, 5);
    
    setQuestions(selectedQuestions);
    setCurrentStep('instructions');
  };

  const startQuiz = () => {
    setCurrentStep('questions');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowExplanation(false);
    setQuizStartTime(Date.now());
    setQuizEndTime(null);
  };

  const handleSelectAnswer = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    // Save the current answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswer
    }));
    
    if (showExplanation) {
      // Move to next question after showing explanation
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setShowExplanation(false);
      } else {
        // End of quiz
        setQuizEndTime(Date.now());
        setCurrentStep('results');
        
        // Calculate badges
        const correctAnswersCount = countCorrectAnswers();
        calculateEarnedBadges(correctAnswersCount);
      }
    } else {
      // Show explanation before moving to next question
      setShowExplanation(true);
    }
  };

  const countCorrectAnswers = () => {
    let count = 0;
    
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        count++;
      }
    }
    
    return count;
  };
  
  const calculateEarnedBadges = (correctCount: number) => {
    const newBadges: EarnedBadge[] = [];
    const scorePercentage = (correctCount / questions.length) * 100;
    
    if (scorePercentage === 100) {
      newBadges.push({
        id: 'perfect-score',
        title: 'Score Parfait',
        icon: <Trophy className="h-8 w-8 text-yellow-500" />
      });
    } else if (scorePercentage >= 80) {
      newBadges.push({
        id: 'expert',
        title: 'Expert',
        icon: <Award className="h-8 w-8 text-blue-500" />
      });
    } else if (scorePercentage >= 60) {
      newBadges.push({
        id: 'advanced',
        title: 'Avancé',
        icon: <Award className="h-8 w-8 text-green-500" />
      });
    }
    
    // Time-based badge
    if (quizStartTime && quizEndTime) {
      const timeSpent = (quizEndTime - quizStartTime) / 1000; // in seconds
      if (timeSpent < 60) {
        newBadges.push({
          id: 'quick-thinker',
          title: 'Esprit Rapide',
          icon: <Clock className="h-8 w-8 text-purple-500" />
        });
      }
    }
    
    setEarnedBadges(newBadges);
    
    // Show toast for badges
    if (newBadges.length > 0) {
      toast({
        title: "Badge débloqué !",
        description: `Vous avez gagné le badge ${newBadges[0].title}`,
      });
    }
  };

  const startNewQuiz = () => {
    setCurrentStep('categories');
    setSelectedCategory('');
    setQuestions([]);
    setEarnedBadges([]);
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Quiz MRC</h1>
        
        <div className="max-w-4xl mx-auto">
          {currentStep === 'categories' && (
            <div>
              <p className="text-center text-muted-foreground mb-6">
                Testez vos connaissances sur le MRC avec nos quiz thématiques
              </p>
              
              <PremiumBanner type="quiz" className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quizCategories.map((category) => (
                  <Card 
                    key={category.id} 
                    className={`hover:shadow-md transition-shadow cursor-pointer ${
                      category.premium && userPlan === 'free' ? 'bg-gray-50 dark:bg-gray-900/50' : ''
                    }`}
                    onClick={() => handleSelectCategory(category.id)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        {category.icon}
                        {category.premium && (
                          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                            Premium
                          </Badge>
                        )}
                      </div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant={category.premium && userPlan === 'free' ? 'outline' : 'default'}>
                        {category.premium && userPlan === 'free' ? 'Débloquer' : 'Commencer'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {currentStep === 'instructions' && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
                <CardDescription>
                  Préparez-vous à tester vos connaissances sur {quizCategories.find(c => c.id === selectedCategory)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-mrc-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">1</span>
                    <span>Ce quiz contient {questions.length} questions à choix multiples.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-mrc-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">2</span>
                    <span>Sélectionnez la réponse que vous pensez être correcte pour chaque question.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-mrc-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">3</span>
                    <span>Après chaque question, une explication vous sera présentée.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-mrc-blue text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5">4</span>
                    <span>À la fin du quiz, vous recevrez votre score et pourrez gagner des badges.</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep('categories')}>
                  Retour
                </Button>
                <Button onClick={startQuiz}>
                  <Play className="mr-2 h-4 w-4" />
                  Commencer le quiz
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {currentStep === 'questions' && questions.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle>Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
                  <Badge variant="outline">
                    {quizCategories.find(c => c.id === selectedCategory)?.title}
                  </Badge>
                </div>
                <Progress value={(currentQuestionIndex / questions.length) * 100} className="h-2" />
              </CardHeader>
              <CardContent className="space-y-6">
                <h3 className="text-lg font-semibold">{questions[currentQuestionIndex].question}</h3>
                
                <RadioGroup value={selectedAnswer} onValueChange={handleSelectAnswer}>
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center space-x-2 border rounded-md p-3 ${
                        showExplanation && option === questions[currentQuestionIndex].correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                          : showExplanation && option === selectedAnswer && option !== questions[currentQuestionIndex].correctAnswer
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/30'
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <RadioGroupItem 
                        value={option} 
                        id={`option-${index}`} 
                        disabled={showExplanation}
                      />
                      <Label 
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer py-2"
                      >
                        {option}
                      </Label>
                      {showExplanation && option === questions[currentQuestionIndex].correctAnswer && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      {showExplanation && option === selectedAnswer && option !== questions[currentQuestionIndex].correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
                
                {showExplanation && (
                  <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-md">
                    <h4 className="font-semibold mb-1">Explication :</h4>
                    <p>{questions[currentQuestionIndex].explanation}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button 
                  className="ml-auto" 
                  onClick={handleNextQuestion}
                  disabled={!selectedAnswer}
                >
                  {!showExplanation ? 'Valider' : 
                    currentQuestionIndex < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {currentStep === 'results' && (
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2">
                  <Trophy className="h-12 w-12 text-yellow-500" />
                </div>
                <CardTitle>Résultats du Quiz</CardTitle>
                <CardDescription>
                  {quizCategories.find(c => c.id === selectedCategory)?.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 text-center">
                    <h3 className="text-lg font-semibold">Score</h3>
                    <div className="text-3xl font-bold text-mrc-blue">
                      {countCorrectAnswers()}/{questions.length}
                    </div>
                    <Progress 
                      value={(countCorrectAnswers() / questions.length) * 100} 
                      className="h-2 mt-2" 
                    />
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 text-center">
                    <h3 className="text-lg font-semibold">Pourcentage</h3>
                    <div className="text-3xl font-bold text-mrc-green">
                      {Math.round((countCorrectAnswers() / questions.length) * 100)}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {(countCorrectAnswers() / questions.length) * 100 >= 70 ? 'Excellent !' : 
                       (countCorrectAnswers() / questions.length) * 100 >= 50 ? 'Bien !' : 
                       'Continuez à apprendre !'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 text-center">
                    <h3 className="text-lg font-semibold">Temps</h3>
                    <div className="text-3xl font-bold text-mrc-red">
                      {quizStartTime && quizEndTime ? 
                        Math.round((quizEndTime - quizStartTime) / 1000) : 0}s
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {quizStartTime && quizEndTime && (quizEndTime - quizStartTime) / 1000 < 60 ? 
                        'Très rapide !' : 'Bien joué !'}
                    </div>
                  </div>
                </div>
                
                {earnedBadges.length > 0 && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-3">Badges gagnés</h3>
                    <div className="flex flex-wrap gap-4">
                      {earnedBadges.map((badge) => (
                        <div key={badge.id} className="text-center">
                          <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto">
                            {badge.icon}
                          </div>
                          <div className="mt-2 text-sm font-medium">{badge.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Résumé des questions</h3>
                  {questions.map((question, index) => (
                    <div 
                      key={index}
                      className="border rounded-md p-3"
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{index + 1}. {question.question}</div>
                        {answers[index] === question.correctAnswer ? (
                          <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 shrink-0" />
                        )}
                      </div>
                      <div className="text-sm mt-1">
                        Votre réponse: <span className={answers[index] === question.correctAnswer ? 'text-green-600' : 'text-red-600'}>
                          {answers[index]}
                        </span>
                      </div>
                      {answers[index] !== question.correctAnswer && (
                        <div className="text-sm text-green-600">
                          Réponse correcte: {question.correctAnswer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button onClick={startNewQuiz}>
                  Nouveau Quiz
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </MainLayout>
  );
};

export default QuizPage;
