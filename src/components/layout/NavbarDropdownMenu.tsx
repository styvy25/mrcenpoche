
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronLeft, ChevronRight, Home, Settings, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ApiKeysDialog from '@/components/settings/ApiKeysDialog';
import { navLinks } from './NavbarLinks';

interface NavbarDropdownMenuProps {
  isApiKeySet: boolean;
}

const NavbarDropdownMenu: React.FC<NavbarDropdownMenuProps> = ({ isApiKeySet }) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" title="Menu de navigation">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleGoBack}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Retour
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoForward}>
          <ChevronRight className="h-4 w-4 mr-2" />
          Suivant
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleGoHome}>
          <Home className="h-4 w-4 mr-2" />
          Accueil
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Fonctionnalités</DropdownMenuLabel>
        
        {navLinks.map((link) => (
          <DropdownMenuItem key={link.path} onClick={() => navigate(link.path)} className="flex items-center">
            <div className={`mr-2 ${link.highlight ? 'text-mrc-red' : ''}`}>{link.icon}</div>
            <span className={link.highlight ? 'text-mrc-red font-medium' : ''}>{link.label}</span>
            {link.badge && !isApiKeySet && <Badge variant="outline" className="ml-auto text-xs">API Requise</Badge>}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => navigate('/settings')}>
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </DropdownMenuItem>
        
        {!isApiKeySet && (
          <DropdownMenuItem className="text-blue-500 font-medium" asChild>
            <div className="w-full">
              <ApiKeysDialog 
                triggerButton={
                  <div className="flex items-center gap-2 w-full">
                    <Server className="h-4 w-4" />
                    Configurer les API
                  </div>
                }
              />
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarDropdownMenu;
