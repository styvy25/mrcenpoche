
import { Challenge, ChallengeState } from "./types";
import { challenges } from "./challengeData";

export const loadOrCreateChallenge = (): ChallengeState => {
  try {
    const storedChallenge = localStorage.getItem('dailyChallenge');
    const storedDate = localStorage.getItem('dailyChallengeDate');
    const storedStreak = localStorage.getItem('challengeStreak');
    const storedPoints = localStorage.getItem('challengePoints');
    
    const today = new Date().toDateString();
    const streakCount = storedStreak ? parseInt(storedStreak) : 0;
    const totalPoints = storedPoints ? parseInt(storedPoints) : 0;

    // Calculate next refresh time (midnight)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (storedChallenge && storedDate === today) {
      // Use the stored challenge for today
      return {
        dailyChallenge: JSON.parse(storedChallenge),
        streakCount,
        totalPoints,
        nextRefresh: tomorrow
      };
    } else {
      // Generate a new challenge
      const randomIndex = Math.floor(Math.random() * challenges.length);
      const newChallenge = { ...challenges[randomIndex], progress: 0 };
      
      // Reset streak if more than a day has passed
      const newStreakCount = (storedDate && new Date(storedDate).getTime() < new Date(today).getTime() - 86400000) 
        ? 0 
        : streakCount;
      
      // Save the new challenge
      localStorage.setItem('dailyChallenge', JSON.stringify(newChallenge));
      localStorage.setItem('dailyChallengeDate', today);
      localStorage.setItem('challengeStreak', newStreakCount.toString());
      localStorage.setItem('challengePoints', totalPoints.toString());
      
      return {
        dailyChallenge: newChallenge,
        streakCount: newStreakCount,
        totalPoints,
        nextRefresh: tomorrow
      };
    }
  } catch (error) {
    console.error("Error loading challenge:", error);
    // Fallback to a default challenge
    return {
      dailyChallenge: challenges[0],
      streakCount: 0,
      totalPoints: 0,
      nextRefresh: new Date(new Date().setDate(new Date().getDate() + 1))
    };
  }
};

export const formatTimeRemaining = (nextRefresh: Date): string => {
  const now = new Date();
  const diffMs = nextRefresh.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${diffHrs}h ${diffMins}m`;
};

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case "facile": return "bg-green-500";
    case "moyen": return "bg-yellow-500";
    case "difficile": return "bg-red-500";
    default: return "bg-blue-500";
  }
};

export const saveChallengeProgress = (challenge: Challenge, progress: number): Challenge => {
  const updatedChallenge = { ...challenge, progress };
  localStorage.setItem('dailyChallenge', JSON.stringify(updatedChallenge));
  return updatedChallenge;
};

export const completeChallenge = (challenge: Challenge, streakCount: number, totalPoints: number): {
  completedChallenge: Challenge;
  newStreak: number;
  newPoints: number;
} => {
  const newStreak = streakCount + 1;
  const newPoints = totalPoints + challenge.points;
  
  const completedChallenge = { ...challenge, completed: true, progress: 100 };
  
  localStorage.setItem('dailyChallenge', JSON.stringify(completedChallenge));
  localStorage.setItem('challengeStreak', newStreak.toString());
  localStorage.setItem('challengePoints', newPoints.toString());

  return {
    completedChallenge,
    newStreak,
    newPoints
  };
};
