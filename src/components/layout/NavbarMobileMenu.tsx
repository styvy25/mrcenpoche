
import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Settings, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavbarLinks from './NavbarLinks';
import ApiKeysDialog from '@/components/settings/ApiKeysDialog';

interface MobileMenuProps {
  isApiKeySet: boolean;
}

const NavbarMobileMenu: React.FC<MobileMenuProps> = ({ isApiKeySet }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-80">
        <div className="flex flex-col space-y-4 mt-8">
          <NavbarLinks 
            isApiKeySet={isApiKeySet} 
            isMobile={true} 
            onNavClick={() => setIsOpen(false)} 
          />
          
          <Button
            variant="outline"
            className="w-full justify-start mt-4"
            onClick={() => handleNavigation('/settings')}
          >
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
          
          {!isApiKeySet && (
            <div className="w-full mt-4">
              <ApiKeysDialog 
                triggerButton={
                  <Button variant="outline" className="w-full justify-start bg-blue-500/10 border-blue-500/30 text-blue-500">
                    <Server className="h-4 w-4 mr-2" />
                    Configurer les API
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobileMenu;
