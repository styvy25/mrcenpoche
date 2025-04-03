
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, ArrowRight, AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrainingRecommendation } from '@/services/modules/adaptiveTrainingService';
import { useAuth } from '@/components/auth/AuthContext';
import { getPersonalizedTrainingPath } from '@/services/modules/adaptiveTrainingService';
import { Module } from '@/components/modules/types';
import { QuizSubmission } from '@/components/modules/types';

interface AdaptiveTrainingRecommendationsProps {
  quizResults?: QuizSubmission[];
}

const AdaptiveTrainingRecommendations: React.FC<AdaptiveTrainingRecommendationsProps> = ({ quizResults = [] }) => {
  const [recommendations, setRecommendations] = useState<Module[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Group modules by domain/category for display
  const groupedRecommendations: Record<string, Module[]> = {};
  
  recommendations.forEach(module => {
    const category = module.category;
    if (!groupedRecommendations[category]) {
      groupedRecommendations[category] = [];
    }
    groupedRecommendations[category].push(module);
  });
  
  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      try {
        if (quizResults.length === 0) {
          // If no quiz results, we'll show some sample recommendations
          const sampleModules = [
            {
              id: "histoire-1",
              title: "Histoire du MRC",
              description: "Découvrez les origines et fondements du Mouvement pour la Renaissance du Cameroun",
              category: "histoire",
              duration: "45 min",
              level: "débutant",
              progress: 0,
              locked: false,
              priority: "high" as const,
              reason: "Vos scores dans le domaine histoire sont insuffisants et nécessitent une attention particulière"
            },
            {
              id: "communication-1",
              title: "Communication politique efficace",
              description: "Maîtrisez l'art de la rhétorique politique et de la persuasion",
              category: "communication",
              duration: "60 min",
              level: "intermédiaire",
              progress: 0,
              locked: false,
              priority: "medium" as const,
              reason: "Des améliorations sont nécessaires dans le domaine communication"
            },
            {
              id: "mobilisation-1",
              title: "Techniques de mobilisation",
              description: "Apprenez à organiser des événements politiques efficaces",
              category: "mobilisation",
              duration: "75 min",
              level: "avancé",
              progress: 0,
              locked: false,
              priority: "low" as const,
              reason: "Vous avez de bonnes bases dans le domaine mobilisation, mais pouvez encore vous perfectionner"
            }
          ] as Module[];
          
          setRecommendations(sampleModules);
          return;
        }
        
        // Get personalized recommendations based on quiz results
        const personalized = await getPersonalizedTrainingPath(user?.id, quizResults);
        setRecommendations(personalized);
        
      } catch (error) {
        console.error("Error loading adaptive training recommendations:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les recommandations de formation",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRecommendations();
  }, [quizResults, toast, user]);
  
  const handleStartTraining = (moduleId: string) => {
    navigate(`/modules/training/${moduleId}`);
  };
  
  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'medium':
        return <Circle className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg space-y-4">
        <h3 className="text-lg font-semibold text-white">Préparation de votre parcours personnalisé...</h3>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-mrc-blue"></div>
          <p className="text-gray-400">Analyse des résultats en cours</p>
        </div>
      </div>
    );
  }
  
  if (recommendations.length === 0) {
    return (
      <div className="p-6 bg-gray-900 rounded-lg text-center">
        <BookOpen className="h-12 w-12 mx-auto text-gray-500 mb-4" />
        <h3 className="text-lg font-semibold text-white">Pas de recommandations disponibles</h3>
        <p className="text-sm text-gray-400 mt-2">
          Passez d'abord quelques quiz pour obtenir des recommandations personnalisées
        </p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/quiz')}
        >
          Voir les quiz disponibles
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-mrc-blue to-blue-900 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-2">Votre parcours de formation personnalisé</h2>
        <p className="text-sm text-blue-100">
          Ces modules vous sont recommandés en fonction de vos résultats aux quiz
        </p>
      </div>
      
      {Object.entries(groupedRecommendations).map(([category, modules]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-semibold text-white capitalize flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-mrc-blue" />
            {category}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gray-800 border-gray-700 hover:border-mrc-blue transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-medium text-white">{module.title}</h4>
                      {module.priority && getPriorityIcon(module.priority)}
                    </div>
                    <p className="text-sm text-gray-400 mb-4">{module.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Niveau: {module.level || 'Débutant'}</span>
                      <span>Durée: {module.duration}</span>
                    </div>
                    
                    {module.reason && (
                      <div className="bg-gray-900/50 p-2 rounded text-xs text-gray-400 mb-4">
                        {module.reason}
                      </div>
                    )}
                    
                    <Button 
                      variant="default"
                      className="w-full bg-mrc-blue hover:bg-blue-700"
                      onClick={() => handleStartTraining(module.id)}
                    >
                      Commencer la formation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdaptiveTrainingRecommendations;
