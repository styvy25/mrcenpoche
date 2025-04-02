
import { supabase } from "@/integrations/supabase/client";

export interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  level: number;
  image: string;
  completed: boolean;
  locked: boolean;
}

export const fetchTrainingScenarios = async (): Promise<TrainingScenario[]> => {
  try {
    const { data, error } = await supabase
      .from('training_scenarios')
      .select('*')
      .order('level', { ascending: true });
      
    if (error) {
      console.error("Error fetching training scenarios:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Failed to fetch training scenarios:", error);
    return [];
  }
};

export const updateScenarioProgress = async (id: string, completed: boolean): Promise<void> => {
  try {
    const { error } = await supabase
      .from('training_scenarios')
      .update({ completed })
      .eq('id', id);
      
    if (error) {
      console.error("Error updating scenario progress:", error);
      throw error;
    }
  } catch (error) {
    console.error("Failed to update scenario progress:", error);
  }
};
