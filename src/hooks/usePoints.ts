
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UsePointsReturn {
  points: number;
  level: number;
  nextLevelPoints: number;
  percentToNextLevel: number;
  addPoints: (amount: number) => Promise<void>;
}

interface PointsData {
  points: number;
  level: number;
}

// Points required for each level
const POINTS_PER_LEVEL = [
  0,     // Level 1 (starting level)
  100,   // Level 2
  250,   // Level 3
  500,   // Level 4
  1000,  // Level 5
  2000,  // Level 6
  3500,  // Level 7
  5000,  // Level 8
  7500,  // Level 9
  10000, // Level 10
];

// Calculate points needed for next level
const getNextLevelPoints = (currentLevel: number): number => {
  if (currentLevel >= POINTS_PER_LEVEL.length) {
    // For levels beyond our predefined array, use a formula
    return POINTS_PER_LEVEL[POINTS_PER_LEVEL.length - 1] + 
      (currentLevel - POINTS_PER_LEVEL.length + 1) * 3000;
  }
  return POINTS_PER_LEVEL[currentLevel];
};

export const usePoints = (): UsePointsReturn => {
  const [userData, setUserData] = useState<PointsData>({ points: 0, level: 1 });
  
  // Fetch user points data
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        // Check if a user points record exists
        const { data, error } = await supabase
          .from('profiles')
          .select('points, level')
          .eq('id', session.user.id)
          .maybeSingle();
          
        if (error) {
          console.error('Error fetching user points:', error);
          return;
        }
        
        if (data) {
          setUserData({
            points: data.points || 0,
            level: data.level || 1
          });
        } else {
          // Create initial points record if it doesn't exist
          await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              points: 0,
              level: 1
            });
        }
      } catch (error) {
        console.error('Error fetching points:', error);
      }
    };
    
    fetchUserPoints();
  }, []);
  
  // Add points and update level if needed
  const addPoints = useCallback(async (amount: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      const newPoints = userData.points + amount;
      let newLevel = userData.level;
      
      // Check if the new points amount reaches the next level
      const nextLevelThreshold = getNextLevelPoints(userData.level);
      if (newPoints >= nextLevelThreshold) {
        newLevel = userData.level + 1;
      }
      
      // Update the database
      const { error } = await supabase
        .from('profiles')
        .update({ 
          points: newPoints,
          level: newLevel 
        })
        .eq('id', session.user.id);
        
      if (error) {
        console.error('Error updating points:', error);
        return;
      }
      
      // Update local state
      setUserData({ points: newPoints, level: newLevel });
      
    } catch (error) {
      console.error('Error adding points:', error);
    }
  }, [userData]);
  
  // Calculate percent to next level
  const currentLevelPoints = userData.level <= 1 ? 0 : POINTS_PER_LEVEL[userData.level - 1];
  const nextLevelPoints = getNextLevelPoints(userData.level);
  const pointsInCurrentLevel = userData.points - currentLevelPoints;
  const pointsNeededForNextLevel = nextLevelPoints - currentLevelPoints;
  const percentToNextLevel = Math.floor((pointsInCurrentLevel / pointsNeededForNextLevel) * 100);
  
  return {
    points: userData.points,
    level: userData.level,
    nextLevelPoints,
    percentToNextLevel: Math.min(percentToNextLevel, 100),
    addPoints
  };
};
