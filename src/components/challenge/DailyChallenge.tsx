
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Challenge } from "./types";
import { loadOrCreateChallenge, saveChallengeProgress, completeChallenge } from "./challengeUtils";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeContent from "./ChallengeContent";
import ChallengeActions from "./ChallengeActions";
import AvailableSessions from "./AvailableSessions";

interface DailyChallengeProps {
  onComplete?: () => void;
}

const DailyChallenge = ({ onComplete }: DailyChallengeProps) => {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [nextRefresh, setNextRefresh] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize challenge data
    const initializeChallenge = () => {
      setIsLoading(true);
      
      const result = loadOrCreateChallenge();
      
      setDailyChallenge(result.dailyChallenge);
      setStreakCount(result.streakCount);
      setTotalPoints(result.totalPoints);
      setNextRefresh(result.nextRefresh);
      
      setIsLoading(false);
    };

    initializeChallenge();
    
    // Set up timer to check for refresh
    const intervalId = setInterval(() => {
      const now = new Date();
      const storedDate = localStorage.getItem('dailyChallengeDate');
      
      if (storedDate !== now.toDateString()) {
        initializeChallenge();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  const startChallenge = () => {
    if (!dailyChallenge) return;
    
    const updatedChallenge = saveChallengeProgress(dailyChallenge, 20);
    setDailyChallenge(updatedChallenge);
    
    // Simulate starting the challenge (in a real app, navigate to the challenge)
    toast({
      title: "Défi commencé",
      description: `Vous avez commencé le défi "${dailyChallenge.title}"`,
    });
  };

  const handleCompleteChallenge = () => {
    if (!dailyChallenge) return;
    
    const result = completeChallenge(
      dailyChallenge,
      streakCount,
      totalPoints
    );
    
    setDailyChallenge(result.completedChallenge);
    setStreakCount(result.newStreak);
    setTotalPoints(result.newPoints);
    
    toast({
      title: "Défi complété !",
      description: `Félicitations ! Vous avez gagné ${dailyChallenge.points} points.`,
    });
    
    if (onComplete) onComplete();
  };

  if (isLoading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mrc-blue"></div>
          <p className="text-sm text-gray-500">Chargement du défi quotidien...</p>
        </div>
      </Card>
    );
  }

  if (!dailyChallenge) {
    return (
      <Card className="w-full">
        <CardContent className="py-8">
          <p className="text-center text-gray-500">Aucun défi disponible.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <ChallengeHeader 
          streakCount={streakCount}
          totalPoints={totalPoints}
          nextRefresh={nextRefresh}
        />
      </CardHeader>
      <CardContent>
        <ChallengeContent challenge={dailyChallenge} onComplete={handleCompleteChallenge} />
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <ChallengeActions
          challenge={dailyChallenge}
          onStart={startChallenge}
          onComplete={handleCompleteChallenge}
        />
        <AvailableSessions />
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
