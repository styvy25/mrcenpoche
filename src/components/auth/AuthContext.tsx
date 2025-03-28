
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  uid?: string;
  id?: string;
  email?: string;
  displayName?: string;
  username?: string;
  avatar?: string;
  lastLogin?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string, rememberMe?: boolean) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => boolean;
  updateLastLogin: () => void;
  error: string | null;
}

const defaultContextValue: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  login: () => false,
  logout: () => {},
  register: () => false,
  updateLastLogin: () => {},
  error: null
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('mrc_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user', e);
        localStorage.removeItem('mrc_user');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      // For demo purposes, accept any valid email
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      // Create mock user
      const mockUser = {
        uid: Math.random().toString(36).substring(2, 15),
        id: Math.random().toString(36).substring(2, 15),
        email,
        displayName: email.split('@')[0],
        username: email.split('@')[0],
        lastLogin: new Date().toISOString(),
        avatar: ''
      };
      
      // Save to localStorage
      localStorage.setItem('mrc_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      
      if (!email.includes('@')) {
        throw new Error('Invalid email format');
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      
      // Create mock user
      const mockUser = {
        uid: Math.random().toString(36).substring(2, 15),
        id: Math.random().toString(36).substring(2, 15),
        email,
        displayName: email.split('@')[0],
        username: email.split('@')[0],
        lastLogin: new Date().toISOString(),
        avatar: ''
      };
      
      // Save to localStorage
      localStorage.setItem('mrc_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (e) {
      setError((e as Error).message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      // Remove from localStorage
      localStorage.removeItem('mrc_user');
      setUser(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple login function used by LoginForm
  const login = (email: string, password: string, rememberMe: boolean = false) => {
    if (!email || !password) return false;
    
    try {
      const mockUser = {
        uid: Math.random().toString(36).substring(2, 15),
        id: Math.random().toString(36).substring(2, 15),
        email,
        displayName: email.split('@')[0],
        username: email.split('@')[0],
        lastLogin: new Date().toISOString(),
        avatar: ''
      };
      
      localStorage.setItem('mrc_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  };

  // Simple logout function
  const logout = () => {
    localStorage.removeItem('mrc_user');
    setUser(null);
  };

  // Simple register function used by RegisterForm
  const register = (username: string, email: string, password: string) => {
    if (!username || !email || !password) return false;
    
    try {
      const mockUser = {
        uid: Math.random().toString(36).substring(2, 15),
        id: Math.random().toString(36).substring(2, 15),
        email,
        displayName: username,
        username,
        lastLogin: new Date().toISOString(),
        avatar: ''
      };
      
      localStorage.setItem('mrc_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return true;
    } catch (e) {
      console.error("Registration error:", e);
      return false;
    }
  };

  // Update last login time
  const updateLastLogin = () => {
    if (user) {
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem('mrc_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      signIn,
      signUp,
      signOut,
      login,
      logout,
      register,
      updateLastLogin,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};
