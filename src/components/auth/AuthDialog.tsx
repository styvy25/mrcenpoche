
import { useState, useEffect, createContext, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import { User, LogIn, Shield } from "lucide-react";

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

// Custom hook pour la gestion de l'authentification
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

  // Vérifier si l'utilisateur est déjà connecté au chargement
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
    
    // Vérifier l'authentification quand la fenêtre gagne le focus
    window.addEventListener('focus', checkAuth);
    
    return () => {
      window.removeEventListener('focus', checkAuth);
    };
  }, []);

  const login = (email: string, password: string, remember: boolean = false) => {
    // Récupérer les utilisateurs enregistrés
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
    // Récupérer les utilisateurs existants
    const storedUsers = localStorage.getItem("mrc_learnscape_users") || "[]";
    let users: AuthUser[] = [];
    
    try {
      users = JSON.parse(storedUsers);
    } catch (error) {
      console.error("Failed to parse users data:", error);
    }
    
    // Vérifier si l'email existe déjà
    if (users.some(u => u.email === email)) {
      toast({
        title: "Échec d'inscription",
        description: "Cet email est déjà utilisé",
        variant: "destructive",
      });
      
      return false;
    }
    
    // Créer un nouvel utilisateur
    const newUser: AuthUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    
    // Ajouter l'utilisateur et sauvegarder
    users.push(newUser);
    localStorage.setItem("mrc_learnscape_users", JSON.stringify(users));
    
    // Connecter automatiquement
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

// Composant de dialogue d'authentification
const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { isAuthenticated, user, login, register, logout } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (login(email, password, rememberMe)) {
        setIsOpen(false);
        resetForm();
      }
    } else {
      if (register(username, email, password)) {
        setIsOpen(false);
        resetForm();
      }
    }
  };

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setRememberMe(false);
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm hidden md:inline-block">{user?.username}</span>
        <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          <span className="hidden md:inline-block">Déconnexion</span>
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <LogIn className="h-3.5 w-3.5" />
          <span className="hidden md:inline-block">Connexion</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <User className="stroke-zinc-800 dark:stroke-zinc-100" width={20} height={20} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {isLogin ? "Bienvenue" : "Créer un compte"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {isLogin
                ? "Entrez vos identifiants pour vous connecter"
                : "Remplissez ce formulaire pour créer votre compte"}
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur</Label>
                <Input
                  id="username"
                  placeholder="Votre nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="votre@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                placeholder="Votre mot de passe"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          {isLogin && (
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label htmlFor="remember" className="font-normal text-muted-foreground">
                  Se souvenir de moi
                </Label>
              </div>
              <button type="button" className="text-sm underline hover:no-underline">
                Mot de passe oublié?
              </button>
            </div>
          )}
          
          <Button type="submit" className="w-full">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </Button>
        </form>

        <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
          <span className="text-xs text-muted-foreground">Ou</span>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full"
          >
            {isLogin ? "Créer un nouveau compte" : "Se connecter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
