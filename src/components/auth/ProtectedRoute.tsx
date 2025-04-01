
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  isLoggedIn?: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  // If isLoggedIn is provided, use it; otherwise use the value from context
  const auth = useAuth();
  const isAuthenticated = isLoggedIn !== undefined ? isLoggedIn : auth.isAuthenticated;
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
