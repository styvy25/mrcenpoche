
import { useState, useEffect } from 'react';
import { getUserPoints } from '../services/paymentService';

interface PointsData {
  points: number;
  level: number;
  nextLevelPoints: number;
  percentToNextLevel: number;
  loading: boolean;
  addPoints?: (amount: number) => Promise<void>;
}

export const usePoints = (): PointsData => {
  const [points, setPoints] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const userPoints = await getUserPoints();
        setPoints(userPoints.points);
        setLevel(userPoints.level);
      } catch (error) {
        console.error('Error fetching points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, []);

  // Calculate points required for next level
  // Basic formula: next level requires level * 100 points
  const nextLevelPoints = level * 100;
  
  // Calculate percentage to next level
  const percentToNextLevel = Math.min(
    100,
    Math.floor((points / nextLevelPoints) * 100)
  );

  // Add points function
  const addPoints = async (amount: number) => {
    setPoints(prev => prev + amount);
    
    // Check if level up is needed
    const newPointsTotal = points + amount;
    if (newPointsTotal >= nextLevelPoints) {
      setLevel(prev => prev + 1);
    }
  };

  return {
    points,
    level,
    nextLevelPoints,
    percentToNextLevel,
    loading,
    addPoints
  };
};
