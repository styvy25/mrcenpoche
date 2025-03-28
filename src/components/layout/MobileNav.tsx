
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Bot,
  FileText,
  Brain,
  Settings,
  LogOut,
  LogIn,
  Smartphone
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from '@/components/ui/button';
import InstallButton from '../mobileApp/InstallButton';

interface MobileNavProps {
  onClose?: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 border-b">
        {isAuthenticated ? (
          <div className="py-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-mrc-blue flex items-center justify-center text-white font-medium">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-medium">{user?.email || 'Utilisateur'}</p>
                <p className="text-sm text-muted-foreground">Compte MRC</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <Link to="/auth" onClick={handleLinkClick}>
              <Button className="w-full" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Se connecter
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="flex-1 py-4">
        <nav className="space-y-1">
          <Link to="/" onClick={handleLinkClick}>
            <Button
              variant={location.pathname === '/' ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Home className="mr-2 h-5 w-5" />
              Accueil
            </Button>
          </Link>
          <Link to="/assistant" onClick={handleLinkClick}>
            <Button
              variant={location.pathname === '/assistant' ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Bot className="mr-2 h-5 w-5" />
              Assistant
            </Button>
          </Link>
          <Link to="/documents" onClick={handleLinkClick}>
            <Button
              variant={location.pathname === '/documents' ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <FileText className="mr-2 h-5 w-5" />
              Documents
            </Button>
          </Link>
          <Link to="/quiz" onClick={handleLinkClick}>
            <Button
              variant={location.pathname === '/quiz' ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Brain className="mr-2 h-5 w-5" />
              Quiz
            </Button>
          </Link>

          <div className="mt-4 py-2">
            <div className="flex justify-center">
              <InstallButton />
            </div>
          </div>
        </nav>
      </div>

      <div className="border-t py-4">
        <Link to="/settings" onClick={handleLinkClick}>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-5 w-5" />
            Paramètres
          </Button>
        </Link>
        
        {isAuthenticated && (
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
            onClick={() => {
              logout();
              if (onClose) onClose();
            }}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Déconnexion
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
