
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChartBar, Clock, Award, Trophy, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import * as adaptiveModuleService from '@/services/adaptiveModuleService';

const TrainingProgress: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState<any>(null);
  
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        setLoading(true);
        const data = await adaptiveModuleService.getTrainingProgress();
        setProgressData(data);
      } catch (error) {
        console.error("Error loading training progress:", error);
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
  
  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-800 rounded w-1/4"></div>
          <div className="h-32 bg-gray-800 rounded w-full"></div>
          <div className="h-8 bg-gray-800 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-64 bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
            <div className="h-64 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!progressData) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-400">Aucune donnée de progression disponible.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
          <ChartBar className="w-5 h-5 mr-2 text-green-500" /> Progression générale
        </h2>
        
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-400">Modules complétés</span>
              <span className="text-sm font-medium">
                {progressData.completedModules}/{progressData.totalModules}
              </span>
            </div>
            <Progress 
              value={(progressData.completedModules / progressData.totalModules) * 100} 
              className="h-2 bg-gray-700" 
            />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard 
              icon={<Calendar className="w-4 h-4 text-blue-400" />}
              value={progressData.sessions.length.toString()}
              label="Sessions"
            />
            <StatsCard 
              icon={<Clock className="w-4 h-4 text-green-400" />}
              value={calculateTotalTime(progressData.sessions)}
              label="Heures"
            />
            <StatsCard 
              icon={<Award className="w-4 h-4 text-purple-400" />}
              value={progressData.badges.length.toString()}
              label="Badges"
            />
            <StatsCard 
              icon={<Trophy className="w-4 h-4 text-yellow-400" />}
              value={progressData.achievements.length.toString()}
              label="Réussites"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
          <Award className="w-5 h-5 mr-2 text-yellow-500" /> Badges obtenus
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {progressData.badges.map((badge: any) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
          <Clock className="w-5 h-5 mr-2 text-blue-500" /> Dernières sessions
        </h2>
        
        <div className="space-y-3">
          {progressData.sessions.map((session: any) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
}> = ({ icon, value, label }) => {
  return (
    <div className="bg-gray-700 rounded-md p-3 flex flex-col items-center justify-center">
      <div className="mb-1">{icon}</div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
};

const BadgeCard: React.FC<{ badge: any }> = ({ badge }) => {
  const gradientClass = badge.gradient || "from-blue-600 via-purple-600 to-orange-500";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gray-800 rounded-lg p-4 flex items-center border border-gray-700"
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${gradientClass} flex items-center justify-center mr-3`}>
        {badge.iconType === 'award' && <Award className="w-6 h-6 text-white" />}
        {badge.iconType === 'star' && <Trophy className="w-6 h-6 text-white" />}
      </div>
      
      <div>
        <h3 className="font-medium">{badge.name}</h3>
        <p className="text-xs text-gray-400">{badge.description}</p>
        {badge.date && (
          <div className="text-xs text-gray-500 mt-1">
            Obtenu le {new Date(badge.date).toLocaleDateString()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SessionCard: React.FC<{ session: any }> = ({ session }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-3 flex justify-between border border-gray-700">
      <div>
        <h3 className="font-medium">{session.moduleTitle}</h3>
        <p className="text-xs text-gray-400">
          {new Date(session.date).toLocaleDateString()} · {session.durationMinutes} min
        </p>
      </div>
      
      <div className="flex items-center">
        <Progress 
          value={session.progress} 
          className="w-16 h-1.5 bg-gray-700 mr-2" 
        />
        <span className="text-xs text-gray-400">{session.progress}%</span>
      </div>
    </div>
  );
};

// Helper function to calculate total time spent from sessions
const calculateTotalTime = (sessions: any[]): string => {
  const totalMinutes = sessions.reduce((total, session) => total + session.durationMinutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours === 0) {
    return `${minutes}min`;
  } else if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}min`;
  }
};

export default TrainingProgress;
