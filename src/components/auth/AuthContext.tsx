
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

export interface UserWithSubscription extends User {
  subscription?: {
    type: 'free' | 'premium';
    features?: string[];
  };
  displayName?: string;
  username?: string;
  avatar?: string;
  lastLogin?: Date;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  currentUser: UserWithSubscription | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  register: (email: string, password: string, userData?: any) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  logout: () => Promise<void>;
  updateLastLogin: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  currentUser: null,
  session: null,
  login: async () => ({ error: null, data: null }),
  register: async () => ({ error: null, data: null }),
  logout: async () => {},
  loading: true,
  updateLastLogin: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserWithSubscription | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session and set up listener for auth changes
  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          // Add subscription info for testing purposes
          const enhancedUser: UserWithSubscription = {
            ...session.user,
            displayName: session.user.email?.split('@')[0] || 'User',
            username: session.user.email?.split('@')[0] || 'user',
            avatar: `https://ui-avatars.com/api/?name=${session.user.email?.split('@')[0] || 'User'}&background=random`,
            lastLogin: new Date(),
            subscription: {
              type: 'free',
              features: ['basic_access']
            }
          };
          setCurrentUser(enhancedUser);
        } else {
          setCurrentUser(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // Add subscription info for testing purposes
        const enhancedUser: UserWithSubscription = {
          ...session.user,
          displayName: session.user.email?.split('@')[0] || 'User',
          username: session.user.email?.split('@')[0] || 'user',
          avatar: `https://ui-avatars.com/api/?name=${session.user.email?.split('@')[0] || 'User'}&background=random`,
          lastLogin: new Date(),
          subscription: {
            type: 'free',
            features: ['basic_access']
          }
        };
        setCurrentUser(enhancedUser);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error, data };
  };

  const register = async (email: string, password: string, userData = {}) => {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    
    return { error, data };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateLastLogin = async () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        lastLogin: new Date()
      });
    }
  };

  const value = {
    isAuthenticated: !!user,
    user,
    currentUser,
    session,
    login,
    register,
    logout,
    loading,
    updateLastLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
