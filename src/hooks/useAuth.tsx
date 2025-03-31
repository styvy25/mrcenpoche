
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// User type definition
export interface User {
  id: string;
  email: string;
  username?: string;
  role?: 'user' | 'admin' | 'moderator';
  lastLogin?: Date;
  profileImage?: string;
}

// Define authentication context type
export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register?: (email: string, password: string, username: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // For demo purposes, simulate a successful login
    const userData: User = {
      id: '123456',
      email,
      username: email.split('@')[0],
      role: 'user',
      lastLogin: new Date(),
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  // Register function
  const register = async (email: string, password: string, username: string) => {
    // For demo purposes, simulate a successful registration
    const userData: User = {
      id: '123456',
      email,
      username,
      role: 'user',
      lastLogin: new Date(),
    };

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
