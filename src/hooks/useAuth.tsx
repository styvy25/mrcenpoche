
import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Define user type
export type User = {
  id: string;
  email: string;
  subscription?: {
    plan: 'free' | 'premium';
    features: string[];
  };
};

// Create context
const AuthContext = createContext<{
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}>({
  isAuthenticated: false,
  currentUser: null,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: async () => {},
});

// Auth provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: userSubscription } = await supabase
            .from('user_subscriptions')
            .select('*')
            .eq('user_id', session.user.id)
            .single();
          
          setCurrentUser({
            id: session.user.id,
            email: session.user.email || '',
            subscription: userSubscription ? {
              plan: userSubscription.plan_type as 'free' | 'premium',
              features: Array.isArray(userSubscription.features) ? userSubscription.features : []
            } : undefined
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            const { data: userSubscription } = await supabase
              .from('user_subscriptions')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            
            setCurrentUser({
              id: session.user.id,
              email: session.user.email || '',
              subscription: userSubscription ? {
                plan: userSubscription.plan_type as 'free' | 'premium',
                features: Array.isArray(userSubscription.features) ? userSubscription.features : []
              } : undefined
            });
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error fetching user subscription:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
      }

      // Fetch user subscription
      const { data: userSubscription } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', data.user.id)
        .single();
      
      setCurrentUser({
        id: data.user.id,
        email: data.user.email || '',
        subscription: userSubscription ? {
          plan: userSubscription.plan_type as 'free' | 'premium',
          features: Array.isArray(userSubscription.features) ? userSubscription.features : []
        } : undefined
      });
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  // Signup function
  const signup = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user) {
        // Note: In Supabase, the user isn't considered fully signed up until
        // they confirm their email, unless email confirmation is disabled
        return { success: true };
      }

      return { success: false, error: 'Signup failed' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    // You could return a loading component here
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
