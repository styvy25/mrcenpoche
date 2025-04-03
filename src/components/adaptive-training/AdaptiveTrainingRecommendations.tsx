
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, BarChart, Target, Zap, Clock, Star } from "lucide-react";
import { Module } from "@/components/modules/types";
import { Link } from "react-router-dom";
import { useSubscription } from '@/hooks/useSubscription';
import { analyzeUserSkills, getPersonalizedRecommendations } from "@/services/modules/adaptiveTrainingService";
import PremiumRequiredCard from "@/components/premium/PremiumRequiredCard";
import { Skeleton } from "@/components/ui/skeleton";

// Mock quiz submissions for demo
const mockQuizSubmissions = [
  {
    userId: "user123",
    moduleId: "histoire",
    score: 65,
    totalQuestions: 10,
    completedAt: new Date(),
    answers: []
  },
  {
    userId: "user123",
    moduleId: "mobilisation",
    score: 42,
    totalQuestions: 10,
    completedAt: new Date(),
    answers: []
  }
];

interface AdaptiveTrainingRecommendationsProps {
  isLoading?: boolean;
}

const AdaptiveTrainingRecommendations: React.FC<AdaptiveTrainingRecommendationsProps> = ({ isLoading = false }) => {
  const { isPremium } = useSubscription();
  const [recommendations, setRecommendations] = useState<Module[]>([]);
  const [activeTab, setActiveTab] = useState("recommended");
  
  useEffect(() => {
    if (!isLoading) {
      // Analyze user skills (in a real app, fetch submissions from API)
      const skills = analyzeUserSkills(mockQuizSubmissions);
      
      // Get personalized recommendations
      const completedModules: string[] = []; // In a real app, get from user's history
      const personalizedRecommendations = getPersonalizedRecommendations(skills, completedModules) as Module[];
      
      setRecommendations(personalizedRecommendations);
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  
  if (!isPremium) {
    return (
      <PremiumRequiredCard 
        title="Formations personnalisées"
        description="Accédez à des recommandations de formation personnalisées basées sur votre niveau et vos progrès."
        featureList={[
          "Recommandations basées sur vos résultats aux quiz",
          "Plan de formation adaptatif",
          "Analyse de vos points forts et axes d'amélioration",
          "Suivi personnalisé de votre progression"
        ]}
      />
    );
  }
  
  return (
    <Card className="shadow-md border-gray-800/40 bg-gray-900/40">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-white">
          <Target className="mr-2 h-5 w-5 text-mrc-blue" />
          Votre plan de formation personnalisé
        </CardTitle>
        <CardDescription>
          Recommandations basées sur vos compétences et votre progression
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="recommended" className="flex items-center gap-1">
              <Zap className="h-4 w-4" />
              <span>Recommandations</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-1">
              <BarChart className="h-4 w-4" />
              <span>Progression</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recommended" className="space-y-4">
            {recommendations.length > 0 ? (
              recommendations.map((module, index) => (
                <RecommendationCard key={module.id} module={module} index={index} />
              ))
            ) : (
              <p className="text-gray-400">Aucune recommandation disponible pour le moment.</p>
            )}
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Histoire du MRC</p>
                <span className="text-xs font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-mrc-blue h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Techniques de mobilisation</p>
                <span className="text-xs font-medium">42%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-mrc-blue h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Communication politique</p>
                <span className="text-xs font-medium">20%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-mrc-blue h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const RecommendationCard = ({ module, index }: { module: Module, index: number }) => {
  const priorityColor = module.priority === 'high' ? 'text-red-400' : 
                        module.priority === 'medium' ? 'text-amber-400' : 'text-green-400';
                        
  const priorityBg = module.priority === 'high' ? 'bg-red-950/30' : 
                    module.priority === 'medium' ? 'bg-amber-950/30' : 'bg-green-950/30';
  
  return (
    <Card className={`border-gray-700/50 ${priorityBg}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Badge variant="outline" className={priorityColor}>
              {module.priority === 'high' ? 'Prioritaire' : 
               module.priority === 'medium' ? 'Recommandé' : 'Suggéré'}
            </Badge>
            <h4 className="font-semibold text-white">{module.title}</h4>
            <div className="flex items-center text-xs text-gray-400">
              <Clock className="mr-1 h-3 w-3" />
              <span>{module.duration}</span>
              <span className="mx-2">•</span>
              <Star className="mr-1 h-3 w-3" />
              <span>{module.level}</span>
            </div>
            <p className="text-xs text-gray-300 mt-1">{module.reason}</p>
          </div>
          
          <Link to={`/modules/${module.id}`}>
            <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Voir le module</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

const LoadingSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-7 w-2/3" />
      <Skeleton className="h-4 w-1/2 mt-1" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </CardContent>
  </Card>
);

export default AdaptiveTrainingRecommendations;
