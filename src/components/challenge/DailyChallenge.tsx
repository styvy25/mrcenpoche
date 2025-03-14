
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Prize, getRandomChallenge } from './challengeData';
import { Award, Calendar, CheckCircle, Flag, Gift } from 'lucide-react';
import { format } from 'date-fns';
import ChallengeContent from './ChallengeContent';
import ChallengeActions from './ChallengeActions';
import ChallengeHeader from './ChallengeHeader';
import { useToast } from '@/components/ui/use-toast';
import { fr } from 'date-fns/locale';
import { useAuth } from '@/components/auth/AuthContext';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  completed?: boolean;
  timeEstimate: string;
  steps?: string[];
  category: string;
  prize?: Prize;
}

interface DailyChallengeProps {
  onComplete?: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ onComplete }) => {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  
  useEffect(() => {
    // Load challenge
    const dailyChallenge = getRandomChallenge();
    
    // Check if user has completed this challenge today
    const lastCompletedDate = localStorage.getItem('lastCompletedChallengeDate');
    const lastChallengeId = localStorage.getItem('lastCompletedChallengeId');
    const today = format(new Date(), 'yyyy-MM-dd');
    
    if (lastCompletedDate === today && lastChallengeId === dailyChallenge.id) {
      setCompleted(true);
      setProgress(100);
      setCurrentStep(dailyChallenge.steps?.length || 1);
    }
    
    setChallenge(dailyChallenge);
  }, []);
  
  const handleNextStep = () => {
    if (!challenge || !challenge.steps) return;

    const nextStep = currentStep + 1;
    const totalSteps = challenge.steps.length;
    
    // Calculate progress
    const newProgress = Math.floor((nextStep / totalSteps) * 100);
    
    setCurrentStep(nextStep);
    setProgress(newProgress);
    
    if (nextStep >= totalSteps) {
      completeChallenge();
    }
  };
  
  const completeChallenge = () => {
    if (!challenge) return;
    
    // Mark as completed
    setCompleted(true);
    setProgress(100);
    
    // Save to localStorage
    const today = format(new Date(), 'yyyy-MM-dd');
    localStorage.setItem('lastCompletedChallengeDate', today);
    localStorage.setItem('lastCompletedChallengeId', challenge.id);
    
    // Add points to user account if available
    try {
      if (user) {
        const currentPoints = localStorage.getItem(`user_points_${user.id}`) || '0';
        const newPoints = parseInt(currentPoints) + challenge.points;
        localStorage.setItem(`user_points_${user.id}`, newPoints.toString());
      }
    } catch (error) {
      console.error("Error updating user points:", error);
    }
    
    // Show toast notification
    toast({
      title: "Défi complété!",
      description: `Vous avez gagné ${challenge.points} points!`,
    });
    
    // Call parent's onComplete if provided
    if (onComplete) {
      onComplete();
    }
  };
  
  if (!challenge) {
    return <div className="text-center py-8">Chargement du défi...</div>;
  }
  
  return (
    <div className="space-y-4">
      <ChallengeHeader 
        title={challenge.title}
        points={challenge.points}
        difficulty={challenge.difficulty}
        timeEstimate={challenge.timeEstimate}
      />
      
      <Progress 
        value={progress} 
        className="h-2 w-full"
      />
      
      <div className="text-sm text-gray-500 flex justify-between">
        <span>Progression: {progress}%</span>
        <span>
          <Calendar className="inline h-4 w-4 mr-1" />
          {format(new Date(), "d MMMM yyyy", { locale: fr })}
        </span>
      </div>
      
      <ChallengeContent 
        challenge={challenge} 
        currentStep={currentStep} 
        completed={completed}
      />
      
      <ChallengeActions 
        onNextStep={handleNextStep}
        completed={completed}
        currentStep={currentStep}
        totalSteps={challenge.steps?.length || 0}
      />
      
      {completed && challenge.prize && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mt-4">
          <div className="flex items-center">
            <Gift className="h-5 w-5 text-yellow-500 mr-2" />
            <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Récompense gagnée!</h4>
          </div>
          <p className="mt-2 text-yellow-700 dark:text-yellow-300">{challenge.prize.description}</p>
        </div>
      )}
    </div>
  );
};

export default DailyChallenge;
