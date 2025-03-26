
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import AuthDialog from "@/components/auth/AuthDialog";
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Home,
  Menu,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  Server,
  HelpCircle,
  Settings
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import ApiKeysDialog from "@/components/settings/ApiKeysDialog";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isApiKeySet } = useAppContext();
  const isMobile = useIsMobile();
  const [previousLocation, setPreviousLocation] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(!isApiKeySet);

  // Track navigation history for back button
  useEffect(() => {
    if (location.pathname !== previousLocation && previousLocation !== "") {
      // Store last 5 locations
      const history = JSON.parse(localStorage.getItem('navigationHistory') || '[]');
      if (history.length >= 5) {
        history.shift(); // Remove oldest entry
      }
      history.push(previousLocation);
      localStorage.setItem('navigationHistory', JSON.stringify(history));
    }
    setPreviousLocation(location.pathname);
  }, [location.pathname, previousLocation]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

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

  const navLinks = [
    { path: "/assistant", icon: <MessageSquare className="h-4 w-4" />, label: "Assistant", badge: isApiKeySet ? false : true },
    { path: "/documents", icon: <FileText className="h-4 w-4" />, label: "Documents" },
    { path: "/news", icon: <BookOpen className="h-4 w-4" />, label: "Actualités" },
    { path: "/quiz", icon: <HelpCircle className="h-4 w-4" />, label: "Quiz" },
    { path: "/alerte-fraude", icon: <AlertTriangle className="h-4 w-4" />, label: "Signaler", highlight: true }
  ];

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1 mr-4">
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
                    {link.badge && <Badge variant="outline" className="ml-auto text-xs">API Requise</Badge>}
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
            
            <div className="hidden sm:flex">
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
          </div>
          
          <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-mrc-blue via-mrc-red to-mrc-blue">MRC en Poche</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link to={link.path} key={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : link.highlight ? "destructive" : "ghost"}
                className="flex items-center gap-1"
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && <Badge variant="outline" className="ml-1 text-[10px] py-0">API</Badge>}
              </Button>
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    to={link.path} 
                    key={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(link.path) ? "default" : link.highlight ? "destructive" : "ghost"}
                      className="w-full justify-start"
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                      {link.badge && <Badge variant="outline" className="ml-auto text-xs">API Requise</Badge>}
                    </Button>
                  </Link>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full justify-start mt-4"
                  onClick={() => {
                    navigate('/settings');
                    setIsMobileMenuOpen(false);
                  }}
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
        </div>

        <div className="flex items-center">
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
