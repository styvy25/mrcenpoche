
import { createClient } from '@supabase/supabase-js';
import type { ApiKeys } from '@/hooks/api-keys/types';
import { Module } from '@/components/modules/types';
import { TrainingScenario } from './training/trainingScenarioService';

// Appointment and training scenario types
import type { Appointment } from '@/components/quiz/types';
export interface VirtualMeeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  participants: number;
  maxParticipants: number;
  imageUrl: string;
  meetingUrl: string;
  description: string;
}

// Create a Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// API Keys functions
export const loadApiKeysFromSupabase = async (): Promise<ApiKeys | null> => {
  try {
    // In a real app, we would fetch from Supabase
    // For now, just return from localStorage as a fallback
    return JSON.parse(localStorage.getItem('api_keys') || 'null');
  } catch (error) {
    console.error('Error loading API keys from Supabase:', error);
    return null;
  }
};

export const saveApiKeysToSupabase = async (keys: ApiKeys): Promise<boolean> => {
  try {
    // In a real app, save to Supabase
    // For now, just save to localStorage
    localStorage.setItem('api_keys', JSON.stringify(keys));
    return true;
  } catch (error) {
    console.error('Error saving API keys to Supabase:', error);
    return false;
  }
};

// Virtual meetings functions - using mock data
export const getVirtualMeetings = async (): Promise<VirtualMeeting[]> => {
  try {
    // Mock data instead of Supabase call
    const mockMeetings: VirtualMeeting[] = [
      {
        id: '1',
        title: 'Stratégie électorale 2025',
        date: '2024-09-15',
        time: '18:00',
        duration: '1h30',
        host: 'Dr. Maurice Kamto',
        participants: 24,
        maxParticipants: 100,
        imageUrl: 'https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Rpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        meetingUrl: 'https://meet.example.com/mrc-strategy',
        description: 'Discussion sur les stratégies électorales pour les prochaines élections de 2025.'
      },
      {
        id: '2',
        title: 'Formation des militants',
        date: '2024-09-22',
        time: '14:00',
        duration: '2h',
        host: 'Mme. Anne Féconde',
        participants: 18,
        maxParticipants: 50,
        imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhaW5pbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        meetingUrl: 'https://meet.example.com/mrc-formation',
        description: 'Séance de formation pour les nouveaux militants sur les actions de terrain.'
      },
      {
        id: '3',
        title: 'Débat politique: Décentralisation',
        date: '2024-10-05',
        time: '19:30',
        duration: '1h',
        host: 'Prof. Jean-Claude Nkou',
        participants: 12,
        maxParticipants: 80,
        imageUrl: 'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZGViYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        meetingUrl: 'https://meet.example.com/mrc-debate',
        description: 'Débat sur les enjeux de la décentralisation au Cameroun et la position du MRC.'
      }
    ];

    return mockMeetings;
  } catch (error) {
    console.error('Error fetching virtual meetings:', error);
    return [];
  }
};

// Training scenarios functions - using mock data
export const getTrainingScenarios = async (): Promise<TrainingScenario[]> => {
  try {
    // Mock data instead of Supabase call
    const mockScenarios: TrainingScenario[] = [
      {
        id: 'scenario1',
        title: 'Mobilisation électorale',
        description: 'Apprenez à mobiliser efficacement les électeurs pour un scrutin local.',
        level: 1,
        image: 'https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dm90ZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        completed: false,
        locked: false
      },
      {
        id: 'scenario2',
        title: 'Débat télévisé',
        description: 'Simulation d\'un débat télévisé sur les enjeux politiques camerounais.',
        level: 2,
        image: 'https://images.unsplash.com/photo-1607545587226-fa775db4d1a9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGViYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        completed: false,
        locked: true
      },
      {
        id: 'scenario3',
        title: 'Gestion de crise',
        description: 'Apprenez à gérer une situation de crise politique.',
        level: 3,
        image: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3Jpc2lzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        completed: false,
        locked: true
      }
    ];

    return mockScenarios;
  } catch (error) {
    console.error('Error fetching training scenarios:', error);
    return [];
  }
};

// Export the function to update scenario progress
export const updateScenarioProgress = async (id: string, completed: boolean): Promise<boolean> => {
  try {
    // In a real app, update in Supabase
    // For now, simulate success
    console.log(`Scenario ${id} marked as ${completed ? 'completed' : 'incomplete'}`);
    return true;
  } catch (error) {
    console.error('Error updating scenario progress:', error);
    return false;
  }
};

// Add function to fetch meetings from Supabase (mock implementation)
export const fetchMeetingsFromSupabase = async (status?: 'upcoming' | 'completed'): Promise<VirtualMeeting[]> => {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, just return mock data
    const mockMeetings = await getVirtualMeetings();
    
    if (status) {
      // Filter by status (would be done at database level in real implementation)
      return mockMeetings.filter(meeting => 
        status === 'upcoming' ? new Date(meeting.date) > new Date() : new Date(meeting.date) <= new Date()
      );
    }
    
    return mockMeetings;
  } catch (error) {
    console.error('Error fetching meetings from Supabase:', error);
    return [];
  }
};

// Add function to fetch scenarios from Supabase (mock implementation)
export const fetchScenariosFromSupabase = async (): Promise<TrainingScenario[]> => {
  try {
    // In a real implementation, we would fetch from Supabase
    // For now, just return mock data
    return getTrainingScenarios();
  } catch (error) {
    console.error('Error fetching scenarios from Supabase:', error);
    return [];
  }
};

// Module functions - using mock data
export const getModules = async (): Promise<Module[]> => {
  try {
    // Return mock modules instead of Supabase call
    // These would be fetched from the modules data
    return []; // Placeholder - actual modules come from CoursesGrid component
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};
