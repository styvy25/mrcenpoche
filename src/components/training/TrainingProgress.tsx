
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Star, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import AdaptiveModuleService from '@/services/adaptiveModuleService';
import { useToast } from '@/hooks/use-toast';
import { usePoints } from '@/hooks/usePoints';
import { Skeleton } from '@/components/ui/skeleton';

interface Achievement {
  id: string;
  name: string;
  description: string;
  date: string;
  iconType: string;
  color: string;
}

interface TrainingSession {
  id: string;
  moduleTitle: string;
  date: string;
  durationMinutes: number;
  progress: number;
}

const TrainingProgress: React.FC = () => {
  const { toast } = useToast();
  const { points, level, nextLevelPoints, percentToNextLevel } = usePoints();
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [completedModules, setCompletedModules] = useState(0);
  const [totalModules, setTotalModules] = useState(0);
  const [activeBadges, setActiveBadges] = useState<any[]>([]);
  
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        const progressData = await AdaptiveModuleService.getTrainingProgress();
        
        setAchievements(progressData.achievements || []);
        setSessions(progressData.sessions || []);
        setCompletedModules(progressData.completedModules || 0);
        setTotalModules(progressData.totalModules || 0);
        setActiveBadges(progressData.badges || []);
      } catch (error) {
        console.error("Error loading progress data:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données de progression.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadProgressData();
  }, [toast]);
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-600';
    if (progress >= 50) return 'bg-yellow-600';
    return 'bg-blue-600';
  };
  
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'badge':
        return <Award className="h-6 w-6" />;
      case 'module':
        return <CheckCircle2 className="h-6 w-6" />;
      case 'score':
        return <Star className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };
  
  if (loading) {
    return <LoadingState />;
  }
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Modules terminés</h3>
              <div className="text-2xl font-bold">
                {completedModules} / {totalModules}
              </div>
              <div className="mt-1">
                <Progress value={(completedModules / totalModules) * 100} className="h-1.5 bg-gray-700" />
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Badges obtenus</h3>
              <div className="text-2xl font-bold">
                {activeBadges.length}
              </div>
              <p className="text-sm text-gray-400">Continuez à apprendre pour débloquer plus</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gray-800 border-gray-700">
          <div className="flex items-center">
            <div className="mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-purple-500 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-300">Niveau</h3>
              <div className="text-2xl font-bold">
                {level}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <Progress value={percentToNextLevel} className="h-1.5 w-24 bg-gray-700" />
                <span className="text-xs text-gray-400">{points} / {nextLevelPoints} points</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      <Tabs defaultValue="badges" className="w-full">
        <TabsList className="mb-6 bg-gray-800">
          <TabsTrigger value="badges" className="data-[state=active]:bg-gray-700">
            <Award className="h-4 w-4 mr-2" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-gray-700">
            <Star className="h-4 w-4 mr-2" />
            Réalisations
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-gray-700">
            <Calendar className="h-4 w-4 mr-2" />
            Historique
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="badges" className="mt-2">
          <h3 className="font-semibold text-lg mb-4">Mes badges</h3>
          {activeBadges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${badge.gradient || 'from-green-500 to-green-700'} p-0.5 mb-3`}>
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                      <Award className={`h-8 w-8 ${badge.iconColor || 'text-yellow-500'}`} />
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-center mb-1">{badge.name}</h4>
                  <p className="text-sm text-gray-400 text-center">{badge.description}</p>
                  
                  {badge.date && (
                    <div className="mt-2 text-xs text-gray-500">
                      {format(new Date(badge.date), 'PPP', { locale: fr })}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Award className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p className="text-lg font-medium mb-2">Aucun badge obtenu</p>
              <p className="text-gray-400 mb-4">Terminez des modules pour gagner des badges.</p>
              <Button variant="outline">Explorer les modules</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-2">
          <h3 className="font-semibold text-lg mb-4">Réalisations</h3>
          {achievements.length > 0 ? (
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gray-800 border border-gray-700 rounded-lg flex items-center"
                >
                  <div className={`w-10 h-10 rounded-full ${achievement.color || 'bg-blue-600'} flex items-center justify-center mr-4`}>
                    {getAchievementIcon(achievement.iconType)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.name}</h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    {format(new Date(achievement.date), 'PPP', { locale: fr })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Star className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p className="text-lg font-medium mb-2">Aucune réalisation</p>
              <p className="text-gray-400 mb-4">Terminez des modules pour débloquer des réalisations.</p>
              <Button variant="outline">Explorer les modules</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-2">
          <h3 className="font-semibold text-lg mb-4">Historique des sessions</h3>
          {sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gray-800 border border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{session.moduleTitle}</h4>
                    <span className="text-sm text-gray-400">
                      {format(new Date(session.date), 'PPP', { locale: fr })}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{session.durationMinutes} min</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Progress
                        value={session.progress}
                        className={`h-1.5 w-24 bg-gray-700 ${getProgressColor(session.progress)}`}
                      />
                      <span className="text-sm">{session.progress}%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p className="text-lg font-medium mb-2">Aucune session d'apprentissage</p>
              <p className="text-gray-400 mb-4">Commencez à apprendre pour voir votre historique.</p>
              <Button variant="outline">Commencer l'apprentissage</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Clock: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const LoadingState: React.FC = () => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 bg-gray-800" />
        ))}
      </div>
      
      <Skeleton className="h-10 w-64 mb-6 bg-gray-800" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-40 bg-gray-800" />
        ))}
      </div>
    </div>
  );
};

export default TrainingProgress;
