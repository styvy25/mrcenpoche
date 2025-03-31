
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface UserPoints {
  points: number;
  level: number;
}

export function usePoints() {
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Calculate points needed for the next level
  const getPointsForLevel = (level: number): number => {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  };

  // Points needed for the current level
  const currentLevelPoints = getPointsForLevel(level);
  
  // Points needed for the next level
  const nextLevelPoints = getPointsForLevel(level + 1);
  
  // Calculate percentage to next level
  const percentToNextLevel = Math.round(
    ((points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100
  );

  // Load points from Supabase
  const loadPoints = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session?.user) {
        // If not logged in, use localStorage
        const storedPoints = localStorage.getItem('user_points');
        if (storedPoints) {
          const parsed = JSON.parse(storedPoints) as UserPoints;
          setPoints(parsed.points || 0);
          setLevel(parsed.level || 1);
        }
        setIsLoading(false);
        return;
      }

      // Try to get points from the database
      const { data, error } = await supabase
        .from('user_points')
        .select('points, level')
        .eq('user_id', sessionData.session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching points:', error);
      }

      if (data) {
        setPoints(data.points || 0);
        setLevel(data.level || 1);
      } else {
        // If no data, create a new record
        const { error: insertError } = await supabase
          .from('user_points')
          .insert({ 
            user_id: sessionData.session.user.id, 
            points: 0, 
            level: 1 
          });

        if (insertError) {
          console.error('Error creating points record:', insertError);
        }
      }
    } catch (error) {
      console.error('Error in loadPoints:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save points to storage
  const savePoints = useCallback(async (newPoints: number, newLevel: number) => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session?.user) {
        // If logged in, save to Supabase
        const { error } = await supabase
          .from('user_points')
          .upsert({ 
            user_id: sessionData.session.user.id, 
            points: newPoints, 
            level: newLevel 
          });

        if (error) {
          console.error('Error saving points:', error);
        }
      } else {
        // If not logged in, save to localStorage
        localStorage.setItem('user_points', JSON.stringify({ points: newPoints, level: newLevel }));
      }
    } catch (error) {
      console.error('Error in savePoints:', error);
    }
  }, []);

  // Add points to the user
  const addPoints = useCallback((pointsToAdd: number) => {
    if (pointsToAdd <= 0) return;
    
    setPoints(current => {
      const newPoints = current + pointsToAdd;
      
      // Check if user leveled up
      let newLevel = level;
      while (newPoints >= getPointsForLevel(newLevel + 1)) {
        newLevel++;
        
        // Show level up toast
        toast({
          title: "Niveau supérieur !",
          description: `Félicitations, vous avez atteint le niveau ${newLevel} !`,
        });
      }
      
      // Update level if needed
      if (newLevel !== level) {
        setLevel(newLevel);
      }
      
      // Save the new state
      savePoints(newPoints, newLevel);
      
      return newPoints;
    });
    
    // Show points added toast for significant amounts
    if (pointsToAdd >= 10) {
      toast({
        title: "Points gagnés !",
        description: `Vous avez gagné ${pointsToAdd} points.`,
        variant: "default",
      });
    }
  }, [level, savePoints, toast]);

  // Load points on component mount
  useEffect(() => {
    loadPoints();
  }, [loadPoints]);

  return {
    points,
    level,
    nextLevelPoints,
    currentLevelPoints,
    percentToNextLevel,
    isLoading,
    addPoints,
    loadPoints
  };
}
