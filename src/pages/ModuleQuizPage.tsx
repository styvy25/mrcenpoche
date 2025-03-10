
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { getModuleQuiz } from "@/components/modules/moduleQuizData";
import ModuleQuiz from "@/components/modules/ModuleQuiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, BookOpen, Award, BarChart } from "lucide-react";
import { MODULE_NAMES } from "@/components/documents/pdfUtils";

const ModuleQuizPage = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (moduleId) {
      const data = getModuleQuiz(moduleId);
      setQuizData(data);
      setIsLoading(false);
    }
  }, [moduleId]);

  const handleQuizComplete = (correct: number, total: number) => {
    setScore({ correct, total });
    setQuizCompleted(true);
    
    // In a real app, save the results to the database
    const quizResult = {
      moduleId,
      score: correct,
      total,
      percentage: Math.round((correct / total) * 100),
      completedAt: new Date().toISOString()
    };
    
    // Save to localStorage as a simple storage mechanism
    const savedResults = JSON.parse(localStorage.getItem('moduleQuizResults') || '[]');
    savedResults.push(quizResult);
    localStorage.setItem('moduleQuizResults', JSON.stringify(savedResults));
  };

  const handleReturnToModules = () => {
    navigate('/modules');
  };

  const handleRestartQuiz = () => {
    setQuizCompleted(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mrc-blue"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl text-red-500">Module non trouvé</CardTitle>
              <CardDescription>
                Le module de quiz demandé n'existe pas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={handleReturnToModules}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Retourner aux modules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-mrc-blue" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Quiz: {MODULE_NAMES[moduleId as keyof typeof MODULE_NAMES]}
            </h1>
          </div>
          <Badge variant="outline" className="text-mrc-blue">
            {quizData.questions.length} questions
          </Badge>
        </div>

        {quizCompleted ? (
          <Card className="max-w-3xl mx-auto text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl">Quiz Terminé!</CardTitle>
              <CardDescription>
                Félicitations pour avoir complété le quiz sur {quizData.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center justify-center gap-2">
                  <BarChart className="h-5 w-5 text-mrc-blue" />
                  Résultat
                </h3>
                <div className="text-4xl font-bold">
                  {score.correct} / {score.total}
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((score.correct / score.total) * 100)}% de réponses correctes
                </div>
                <div className="max-w-md mx-auto mt-2">
                  <Progress value={(score.correct / score.total) * 100} className="h-2" />
                </div>
              </div>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  onClick={handleRestartQuiz} 
                  variant="outline"
                  className="sm:order-1"
                >
                  Recommencer le quiz
                </Button>
                <Button 
                  onClick={handleReturnToModules} 
                  className="bg-mrc-blue hover:bg-blue-700 sm:order-2"
                >
                  Retourner aux modules
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <ModuleQuiz 
            moduleId={moduleId || ''} 
            questions={quizData.questions} 
            onComplete={handleQuizComplete} 
          />
        )}
      </div>
    </div>
  );
};

export default ModuleQuizPage;
