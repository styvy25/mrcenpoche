
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import QuizContainer from "@/components/quiz/QuizContainer";
import { categories as categoriesData } from "@/components/quiz/data/categories";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "@/components/shared/SocialShareButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Award } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { culturalQuizData } from "@/components/quiz/culturalQuizData";

const QuizPage = () => {
  const { toast } = useToast();
  const [showSharing, setShowSharing] = useState(false);
  const { isMobile } = useMediaQuery("(max-width: 768px)");
  
  // This would be replaced with real user data in a production app
  const userData = {
    streak: 3,
    totalComplete: 12,
    highScore: 90
  };
  
  // Format categories correctly for the QuizContainer component
  const formattedCategories = culturalQuizData.categories.map(category => ({
    id: category.id,
    name: category.name,
    description: category.description || "",
    color: category.color || "blue-500",
    questions: culturalQuizData.categories.find(c => c.id === category.id)?.questions || [],
    label: category.name
  }));
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-16 md:pt-20 pb-12">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue mb-2">Quiz Camerounais</h1>
            <p className="text-gray-600">
              Testez vos connaissances sur le Cameroun et le MRC à travers ces quizzes interactifs.
            </p>
          </div>
          
          <div className="flex flex-shrink-0">
            {!showSharing ? (
              <button 
                onClick={() => setShowSharing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-mrc-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Partager
              </button>
            ) : (
              <SocialShareButtons 
                title="Testez vos connaissances sur le Cameroun avec MRC en Poche!"
                description="Des quiz interactifs sur l'histoire, la culture et la politique camerounaise."
                compact={true}
              />
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <QuizContainer categories={formattedCategories} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Vos statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Série actuelle:</span>
                    <span className="font-semibold">{userData.streak} jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quiz complétés:</span>
                    <span className="font-semibold">{userData.totalComplete}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meilleur score:</span>
                    <span className="font-semibold">{userData.highScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`bg-gradient-to-r from-blue-50 to-indigo-50 ${isMobile ? 'p-4' : ''}`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Défiez vos amis!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Invitez vos amis à tester leurs connaissances et comparez vos scores.
                  </p>
                  <SocialShareButtons
                    title="Relevez le défi du quiz MRC!"
                    description="Je vous défie de battre mon score sur ce quiz. Rejoignez MRC en Poche maintenant!"
                    type="quiz"
                    compact={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default QuizPage;
