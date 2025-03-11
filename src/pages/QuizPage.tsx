
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Medal, Smartphone, Info, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import QuizContainer from "@/components/quiz/QuizContainer";
import BadgesDisplay from "@/components/quiz/BadgesDisplay";
import { Category } from "@/components/quiz/types";
import { culturalQuizData } from "@/components/quiz/culturalQuizData";
import "../quiz.css";

const QuizPage = () => {
  const [activeTab, setActiveTab] = useState("quiz");
  const [isLoading, setIsLoading] = useState(true);

  // Convert culturalQuizData.categories to match Category interface
  const categories: Category[] = culturalQuizData.categories.map((category: any) => ({
    label: category.name,
    id: category.id,
    name: category.name,
    color: category.color,
    questions: culturalQuizData.quizQuestions?.filter(q => q.category === category.id) || []
  }));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10">
      <main className="container mx-auto px-4 py-10 pt-24">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-mrc-blue gradient-text">Quiz Culturel Camerounais</h1>
          <p className="text-gray-600 mt-2">Testez vos connaissances et gagnez des badges culturels</p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <Badge className="bg-mrc-green text-white">Culture</Badge>
            <Badge className="bg-mrc-red text-white">Histoire</Badge>
            <Badge className="bg-mrc-yellow text-mrc-dark">Traditions</Badge>
            <Badge className="bg-purple-500 text-white">Épreuve Test</Badge>
            <Badge className="bg-blue-500 text-white flex items-center gap-1">
              <Smartphone size={12} />
              <span>Optimisé Mobile</span>
            </Badge>
          </div>
          
          <div className="max-w-md mx-auto mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800 flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-left">
              Découvrez notre nouvelle <strong>Épreuve Test</strong> de 15 questions sur le MRC et la politique camerounaise. Un excellent moyen de tester vos connaissances avant le vrai test.
            </p>
          </div>
        </div>

        <Tabs 
          defaultValue="quiz" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="max-w-4xl mx-auto animate-fade-in"
        >
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="quiz" className="flex items-center gap-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
              <Book className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center gap-2 data-[state=active]:bg-mrc-blue data-[state=active]:text-white">
              <Medal className="h-4 w-4" />
              Mes Badges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz" className="p-1">
            {isLoading ? (
              <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg animate-pulse flex flex-col items-center justify-center" style={{ height: "400px" }}>
                <Trophy className="h-12 w-12 text-mrc-blue/30 mb-4" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                <div className="space-y-3 w-full">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ) : (
              <QuizContainer categories={categories} />
            )}
          </TabsContent>
          
          <TabsContent value="badges" className="p-1">
            <BadgesDisplay badges={[]} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QuizPage;
