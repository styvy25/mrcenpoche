
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from './AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface PointsContextValue {
  points: number;
  addPoints: (amount: number) => Promise<void>;
  isLoading: boolean;
}

const PointsContext = createContext<PointsContextValue | undefined>(undefined);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load points from database on mount and when user changes
  useEffect(() => {
    const fetchPoints = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('user_tokens')
          .select('amount')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setPoints(data?.amount || 0);
      } catch (error) {
        console.error('Error fetching points:', error);
        setPoints(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoints();
  }, [user]);

  // Add points to user's account
  const addPoints = async (amount: number) => {
    if (!user) return;
    
    try {
      // First get current points to avoid race conditions
      const { data, error } = await supabase
        .from('user_tokens')
        .select('amount')
        .eq('user_id', user.id)
        .single();
        
      if (error) throw error;
      
      const currentPoints = data?.amount || 0;
      const newPoints = currentPoints + amount;
      
      // Update points in database
      const { error: updateError } = await supabase
        .from('user_tokens')
        .update({ amount: newPoints })
        .eq('user_id', user.id);
        
      if (updateError) throw updateError;
      
      // Update local state
      setPoints(newPoints);
      
      // Show success message
      toast({
        title: "Points ajoutés !",
        description: `+${amount} points ajoutés à votre compte`,
      });
    } catch (error) {
      console.error('Error adding points:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter des points à votre compte",
        variant: "destructive",
      });
    }
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, isLoading }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
