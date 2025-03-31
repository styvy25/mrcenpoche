
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

export interface UserSubscription {
  plan: 'free' | 'premium';
  startDate: Date;
  endDate?: Date;
  active: boolean;
}

export interface UserWithSubscription extends User {
  username?: string;
  displayName?: string;
  avatar?: string;
  subscription?: UserSubscription;
  lastLogin?: Date;
}

export interface AuthContextType {
  session: Session | null;
  currentUser: UserWithSubscription | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<{ error: any }>;
  updateLastLogin: () => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  session: null,
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => ({ error: null }),
  logout: async () => {},
  register: async () => ({ error: null }),
  updateLastLogin: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state
  const [session, setSession] = useState<Session | null>(null);
  const [currentUser, setCurrentUser] = useState<UserWithSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        
        if (newSession?.user) {
          // Enhance the user with subscription info
          const userWithSubscription: UserWithSubscription = {
            ...newSession.user,
            subscription: getUserSubscription(newSession.user.id),
            lastLogin: new Date(),
          };
          setCurrentUser(userWithSubscription);
        } else {
          setCurrentUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      
      if (existingSession?.user) {
        // Enhance the user with subscription info
        const userWithSubscription: UserWithSubscription = {
          ...existingSession.user,
          subscription: getUserSubscription(existingSession.user.id),
          lastLogin: new Date(),
        };
        setCurrentUser(userWithSubscription);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Get user subscription from local storage or other source
  // In a real app, this would come from the database
  const getUserSubscription = (userId: string): UserSubscription => {
    try {
      const storedPlan = localStorage.getItem('user_plan');
      
      return {
        plan: (storedPlan === 'premium') ? 'premium' : 'free',
        startDate: new Date(),
        active: true
      };
    } catch (error) {
      console.error('Error getting user subscription:', error);
      return {
        plan: 'free',
        startDate: new Date(),
        active: true
      };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        updateLastLogin();
      }
      return { error };
    } catch (error) {
      console.error('Error during login:', error);
      return { error };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username,
          }
        }
      });
      
      return { error };
    } catch (error) {
      console.error('Error during registration:', error);
      return { error };
    }
  };

  const updateLastLogin = async () => {
    if (!currentUser) return;
    
    try {
      // In a real app, update the last login time in the database
      // For now, we'll just update the local state
      setCurrentUser(prev => prev ? {
        ...prev,
        lastLogin: new Date()
      } : null);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  };

  const value = {
    session,
    currentUser,
    isAuthenticated: !!currentUser,
    isLoading,
    login,
    logout,
    register,
    updateLastLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
