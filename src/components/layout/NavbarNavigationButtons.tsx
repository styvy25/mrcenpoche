
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavigationButtonsProps {
  className?: string;
}

const NavbarNavigationButtons: React.FC<NavigationButtonsProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  const handleGoBack = () => {
    const history = JSON.parse(localStorage.getItem('navigationHistory') || '[]');
    if (history.length > 0) {
      const lastPage = history.pop();
      localStorage.setItem('navigationHistory', JSON.stringify(history));
      navigate(lastPage);
    } else {
      navigate(-1);
    }
  };

  const handleGoForward = () => {
    navigate(1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleGoBack}
        aria-label="Retour"
        title="Retour"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleGoForward}
        aria-label="Suivant"
        title="Suivant"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleGoHome}
        aria-label="Accueil"
        title="Accueil"
      >
        <Home className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavbarNavigationButtons;
