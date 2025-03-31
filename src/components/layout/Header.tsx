
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  MessageSquare,
  LucideIcon,
  Settings,
  LogOut,
  LogIn,
  Moon,
  Sun,
  FileText,
  Brain,
  Youtube,
  User
} from 'lucide-react';
import MRCLogo from '@/components/branding/MRCLogo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/hooks/useAuth';
import { AnimatePresence, motion } from 'framer-motion';

interface NavItem {
  title: string;
  path: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  {
    title: 'Assistant',
    path: '/assistant',
    icon: MessageSquare,
  },
  {
    title: 'Documents',
    path: '/documents',
    icon: FileText,
  },
  {
    title: 'Quiz',
    path: '/quiz',
    icon: Brain,
  },
  {
    title: 'YouTube',
    path: '/youtube-download',
    icon: Youtube,
  },
  {
    title: 'Compte',
    path: '/dashboard',
    icon: User,
  },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between">
          <Link to="/" className="mr-6 flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <MRCLogo />
            <span className="font-bold sm:inline-block">MRC en Poche</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="flex items-center text-sm font-medium transition-colors hover:text-primary"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* User Menu (Desktop) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" /> Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAuthenticated ? (
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link to="/auth" className="cursor-pointer">
                        <LogIn className="mr-2 h-4 w-4" /> Connexion
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border/40"
          >
            <div className="container py-4">
              <nav className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
                <div className="mt-4 space-y-2">
                  <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" /> Paramètres
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-red-500"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Déconnexion
                    </Button>
                  ) : (
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <LogIn className="mr-2 h-4 w-4" /> Connexion
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
