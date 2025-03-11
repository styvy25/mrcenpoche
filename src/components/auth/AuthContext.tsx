
import { useState, useEffect, createContext, useContext } from "react";
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
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, remember: boolean) => boolean;
  register: (username: string, email: string, password: string) => boolean;
  logout: () => void;
  updateLastLogin: () => void;
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
  });
  const { toast } = useToast();

  // Check if user is already logged in on load
  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY) || 
                        sessionStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
      
      if (storedAuth) {
        try {
          const parsedAuth = JSON.parse(storedAuth);
          setAuthState(parsedAuth);
        } catch (error) {
          console.error("Failed to parse auth data:", error);
          localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
          sessionStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
        }
      }
    };
    
    checkAuth();
    
    // Check authentication when window gains focus
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const login = (email: string, password: string, remember: boolean = false) => {
    // Retrieve registered users
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
  };

  const register = (username: string, email: string, password: string) => {
    // Retrieve existing users
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
    };
    
    setAuthState(newAuthState);
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(newAuthState));
    
    toast({
      title: "Inscription réussie",
      description: `Bienvenue, ${username} !`,
    });
    
    return true;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
    
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    sessionStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
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
