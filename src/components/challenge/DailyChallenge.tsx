
import { useState, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Challenge } from "./types";
import { loadOrCreateChallenge, saveChallengeProgress, completeChallenge } from "./challengeUtils";
import ChallengeHeader from "./ChallengeHeader";
import ChallengeContent from "./ChallengeContent";
import ChallengeActions from "./ChallengeActions";
import AvailableSessions from "./AvailableSessions";
import ConnectedUsers from "./ConnectedUsers";
import { useAuth } from "../auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface DailyChallengeProps {
  onComplete?: () => void;
}

const DailyChallenge = ({ onComplete }: DailyChallengeProps) => {
  const [dailyChallenge, setDailyChallenge] = useState<Challenge | null>(null);
  const [streakCount, setStreakCount] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [nextRefresh, setNextRefresh] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    // Initialize challenge data
    const initializeChallenge = () => {
      setIsLoading(true);
      
      const { dailyChallenge, streakCount, totalPoints, nextRefresh } = loadOrCreateChallenge();
      
      setDailyChallenge(dailyChallenge);
      setStreakCount(streakCount);
      setTotalPoints(totalPoints);
      setNextRefresh(nextRefresh);
      
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

  // Setup realtime presence for connected users
  useEffect(() => {
    if (!user) return;

    const channelName = 'challenge_users';
    const channel = supabase.channel(channelName);
    
    // Track the current user's presence
    const userPresence = {
      user_id: user.uid || user.id || 'anonymous',
      name: user.username || user.displayName || 'Utilisateur',
      avatar: user.avatar || '',
      online_at: new Date().toISOString(),
      challenge_id: dailyChallenge?.id || 'daily',
      score: totalPoints
    };

    // Setup presence handlers
    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const users = Object.values(presenceState).flat();
        setConnectedUsers(users as any[]);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        toast({
          title: "Nouvel utilisateur connecté",
          description: `${newPresences[0]?.name || 'Un utilisateur'} a rejoint le défi`,
        });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        // Optional: Show when users leave
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track(userPresence);
        }
      });

    // Cleanup on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, dailyChallenge, totalPoints, toast]);

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
    
    const { completedChallenge, newStreak, newPoints } = completeChallenge(
      dailyChallenge,
      streakCount,
      totalPoints
    );
    
    setDailyChallenge(completedChallenge);
    setStreakCount(newStreak);
    setTotalPoints(newPoints);
    
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
        <ChallengeContent challenge={dailyChallenge} />
        
        {/* Connected Users Section */}
        <div className="mt-4">
          <ConnectedUsers users={connectedUsers} />
        </div>
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
