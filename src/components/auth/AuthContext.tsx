
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AuthUser {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateLastLogin: () => void;
}

// Type for the Supabase profile structure
interface SupabaseProfile {
  id: string;
  full_name: string;
  email_notifications: boolean;
  avatar_url: string;
  created_at: string;
  updated_at: string;
  two_factor_enabled: boolean;
}

const LOCAL_STORAGE_AUTH_KEY = "mrc_learnscape_auth";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for authentication management
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });
  const { toast } = useToast();

  // Check if user is already logged in on load
  useEffect(() => {
    const checkAuth = async () => {
      // First, check Supabase auth
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData?.session) {
        try {
          // Get user profile from Supabase
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', sessionData.session.user.id)
            .single();
          
          if (!error && profile) {
            setAuthState({
              isAuthenticated: true,
              user: {
                id: sessionData.session.user.id,
                username: profile.full_name || sessionData.session.user.email?.split('@')[0] || 'User',
                email: sessionData.session.user.email || '',
                password: '', // Not storing password
                avatar: profile.avatar_url,
                createdAt: profile.created_at,
                lastLogin: new Date().toISOString()
              },
              isLoading: false
            });
            return;
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
      
      // Fall back to localStorage if Supabase auth failed
      const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) || 
                        sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          setAuthState({
            ...parsedAuth,
            isLoading: false
          });
        } catch (error) {
          console.error("Failed to parse auth data:", error);
          localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
          sessionStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };
    
    checkAuth();
    
    // Auth state listener for Supabase
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile from Supabase
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          setAuthState({
            isAuthenticated: true,
            user: {
              id: session.user.id,
              username: profile?.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              password: '', // Not storing password
              avatar: profile?.avatar_url,
              createdAt: profile?.created_at || new Date().toISOString(),
              lastLogin: new Date().toISOString()
            },
            isLoading: false
          });
        } else if (event === 'SIGNED_OUT') {
          setAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false
          });
        }
      }
    );
    
    // Check authentication when window gains focus
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('focus', checkAuth);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    try {
      // Try to sign in with Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // If Supabase login fails, try local storage fallback
        const storedUsers = localStorage.getItem("mrc_learnscape_users") || "[]";
        let users: AuthUser[] = [];
        
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error("Failed to parse users data:", error);
        }
        
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          // Update last login time
          const updatedUser = {
            ...user,
            lastLogin: new Date().toISOString()
          };
          
          // Update user in storage
          const updatedUsers = users.map(u => 
            u.id === updatedUser.id ? updatedUser : u
          );
          localStorage.setItem("mrc_learnscape_users", JSON.stringify(updatedUsers));
          
          const newAuthState = {
            isAuthenticated: true,
            user: updatedUser,
            isLoading: false
          };
          
          setAuthState(newAuthState);
          
          if (remember) {
            localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
          } else {
            sessionStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
          }
          
          toast({
            title: "Connexion réussie",
            description: `Bienvenue, ${user.username} !`,
          });
          
          return true;
        } else {
          toast({
            title: "Échec de connexion",
            description: "Email ou mot de passe incorrect",
            variant: "destructive",
          });
          
          return false;
        }
      } else if (data.user) {
        // Supabase login successful
        toast({
          title: "Connexion réussie",
          description: `Bienvenue, ${data.user.email?.split('@')[0] || 'User'} !`,
        });
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      // Try to sign up with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });
      
      if (error) {
        // If Supabase signup fails, try local storage fallback
        const storedUsers = localStorage.getItem("mrc_learnscape_users") || "[]";
        let users: AuthUser[] = [];
        
        try {
          users = JSON.parse(storedUsers);
        } catch (error) {
          console.error("Failed to parse users data:", error);
        }
        
        // Check if email already exists
        if (users.some(u => u.email === email)) {
          toast({
            title: "Échec d'inscription",
            description: "Cet email est déjà utilisé",
            variant: "destructive",
          });
          
          return false;
        }
        
        // Create new user
        const newUser: AuthUser = {
          id: crypto.randomUUID(),
          username,
          email,
          password,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        
        // Add user and save
        users.push(newUser);
        localStorage.setItem("mrc_learnscape_users", JSON.stringify(users));
        
        // Auto login
        const newAuthState = {
          isAuthenticated: true,
          user: newUser,
          isLoading: false
        };
        
        setAuthState(newAuthState);
        localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
        
        toast({
          title: "Inscription réussie",
          description: `Bienvenue, ${username} !`,
        });
        
        return true;
      } else if (data.user) {
        // Supabase signup successful
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé. Vous pouvez maintenant vous connecter.",
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Erreur d'inscription",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Sign out from Supabase
      await supabase.auth.signOut();
      
      // Clear local storage auth
      setAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
      
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      sessionStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
      
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };
  
  const updateLastLogin = () => {
    if (authState.user) {
      // Update last login time
      const updatedUser = {
        ...authState.user,
        lastLogin: new Date().toISOString()
      };
      
      // Update user in local storage
      const storedUsers = localStorage.getItem("mrc_learnscape_users") || "[]";
      let users: AuthUser[] = [];
      
      try {
        users = JSON.parse(storedUsers);
        const updatedUsers = users.map(u => 
          u.id === updatedUser.id ? updatedUser : u
        );
        localStorage.setItem("mrc_learnscape_users", JSON.stringify(updatedUsers));
        
        // Update auth state
        const newAuthState = {
          isAuthenticated: true,
          user: updatedUser,
          isLoading: false
        };
        
        setAuthState(newAuthState);
        
        // Update in local/session storage
        if (localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) {
          localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
        } else if (sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) {
          sessionStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
        }
      } catch (error) {
        console.error("Failed to update last login:", error);
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user: authState.user, 
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        login,
        register,
        logout,
        updateLastLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export type { AuthUser };
