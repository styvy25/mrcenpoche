
import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface UserPoints {
  points: number;
  level: number;
}

export const usePoints = () => {
  const { isLoggedIn, user } = useAuth();
  const [userPoints, setUserPoints] = useState<UserPoints>({
    points: 0,
    level: 1,
  });
  
  useEffect(() => {
    if (isLoggedIn && user) {
      // This would normally fetch the user's points from an API
      // For demo purposes, we'll just set mock points
      setUserPoints({
        points: 120,
        level: 2
      });
    }
  }, [isLoggedIn, user]);
  
  const calculateLevelFromPoints = (points: number): number => {
    // Simple level calculation: level = 1 + floor(points / 100)
    return 1 + Math.floor(points / 100);
  };
  
  const addPoints = async (pointsToAdd: number): Promise<void> => {
    try {
      const newPoints = userPoints.points + pointsToAdd;
      const newLevel = calculateLevelFromPoints(newPoints);
      
      // Here we would normally send this to an API
      setUserPoints({
        points: newPoints,
        level: newLevel
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding points:', error);
      return Promise.reject(error);
    }
  };
  
  return {
    ...userPoints,
    isMaxLevel: userPoints.level >= 10, // Let's say 10 is the max level
    addPoints,
    calculateLevelFromPoints,
  };
};
