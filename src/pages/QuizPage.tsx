
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import QuizContainer from "@/components/quiz/QuizContainer";
import { useToast } from "@/hooks/use-toast";
import SocialShareButtons from "@/components/shared/SocialShareButtons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, Award } from "lucide-react";
import { fetchCategories, getUserStats } from "@/services/quizService";
import { useAuth } from "@/components/auth/AuthContext";

const QuizPage = () => {
  const { toast } = useToast();
  const [showSharing, setShowSharing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  // User statistics
  const [userStats, setUserStats] = useState({
    streak: 0,
    totalComplete: 0,
    highScore: 0
  });
  
  // Load categories and user stats
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        
        // Load user stats if user is logged in
        if (currentUser && currentUser.id) {
          const stats = await getUserStats(currentUser.id);
          setUserStats({
            streak: stats.streakDays || 0,
            totalComplete: stats.completedQuizzes || 0,
            highScore: stats.totalQuestions ? Math.round((stats.correctAnswers / stats.totalQuestions) * 100) : 0
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading quiz data:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    loadData();
  }, [currentUser, toast]);
  
  // Show achievement toasts based on user actions
  const showAchievementToast = (achievement: string) => {
    toast({
      title: "🏆 Nouveau badge débloqué !",
      description: `Vous avez débloqué: ${achievement}`,
      duration: 5000,
    });
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-mrc-blue mb-2">Quiz Camerounais</h1>
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
            <QuizContainer initialCategories={categories} />
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
                    <span className="font-semibold">{userStats.streak} jours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quiz complétés:</span>
                    <span className="font-semibold">{userStats.totalComplete}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Meilleur score:</span>
                    <span className="font-semibold">{userStats.highScore}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
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
