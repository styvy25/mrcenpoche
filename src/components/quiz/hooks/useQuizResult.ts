
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BadgeProps } from "../types";
import { useAuth } from "@/components/auth/AuthContext";
import { useGamification } from "@/services/gamificationService";
import { useMediaQuery } from "@/hooks/use-media-query";

interface UseQuizResultProps {
  score: number;
  totalQuestions: number;
  earnedBadges?: BadgeProps[];
  result?: {
    unlockedBadges?: BadgeProps[];
  };
}

export const useQuizResult = ({ 
  score, 
  totalQuestions, 
  earnedBadges = [], 
  result = {} 
}: UseQuizResultProps) => {
  const [showNotification, setShowNotification] = useState(false);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const { currentUser } = useAuth();
  const { level, points } = useGamification(currentUser?.id || 'anonymous');
  const { isMobile } = useMediaQuery("(max-width: 640px)");
  
  // Determine performance level based on percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  const getPerformanceLevel = () => {
    if (percentage >= 90) return "excellent";
    if (percentage >= 70) return "good";
    if (percentage >= 50) return "average";
    return "needsImprovement";
  };
  
  const performanceLevel = getPerformanceLevel() as "excellent" | "good" | "average" | "needsImprovement";
  
  // Show badge notifications when component mounts
  useEffect(() => {
    const badgesToShow = result?.unlockedBadges || earnedBadges || [];
    
    if (badgesToShow && badgesToShow.length > 0) {
      // Track which achievements are new
      setNewAchievements(badgesToShow.map(b => b.id));
      
      // Show notification
      setShowNotification(true);
      
      // Show toast notification with proper sizing for mobile
      if (badgesToShow[0]) {
        toast.success("Nouveau badge débloqué !", {
          description: `Vous avez débloqué : ${badgesToShow[0].name}`,
          duration: 4000,
          className: isMobile ? 'text-sm' : '',
        });
      }
    }
  }, [result?.unlockedBadges, earnedBadges, isMobile]);

  // Use badges from result or fallback to earned badges
  const badgesToDisplay = result?.unlockedBadges || earnedBadges || [];

  return {
    showNotification,
    setShowNotification,
    newAchievements,
    performanceLevel,
    badgesToDisplay,
    currentUser,
    level,
    points,
    isMobile
  };
};
