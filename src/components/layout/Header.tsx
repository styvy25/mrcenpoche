
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Menu, X } from 'lucide-react';
import Logo from '@/components/branding/Logo';
import { useAuth } from '@/components/auth/AuthContext';
import AuthNavItem from './AuthNavItem';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import MobileNav from './MobileNav';
import { useTheme } from 'next-themes';
import InstallButton from '../mobileApp/InstallButton';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size={32} />
            <span className="font-bold text-xl hidden sm:inline-block">MRC en Poche</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <Link to="/">
            <Button variant={location.pathname === '/' ? "default" : "ghost"}>
              Accueil
            </Button>
          </Link>
          <Link to="/assistant">
            <Button variant={location.pathname === '/assistant' ? "default" : "ghost"}>
              Assistant
            </Button>
          </Link>
          <Link to="/documents">
            <Button variant={location.pathname === '/documents' ? "default" : "ghost"}>
              Documents
            </Button>
          </Link>
          <Link to="/quiz">
            <Button variant={location.pathname === '/quiz' ? "default" : "ghost"}>
              Quiz
            </Button>
          </Link>
          
          <div className="ml-2">
            <InstallButton />
          </div>
        </nav>

        <div className="flex items-center space-x-2">
          <AuthNavItem />
          
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden">
              <MobileNav onClose={() => setIsMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
