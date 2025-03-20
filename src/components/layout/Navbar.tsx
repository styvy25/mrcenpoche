
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
  MessageSquare
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isApiKeySet } = useAppContext();
  const [previousLocation, setPreviousLocation] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    { path: "/chat", icon: <MessageSquare className="h-4 w-4" />, label: "Assistant" },
    { path: "/documents", icon: <FileText className="h-4 w-4" />, label: "Documents" }
  ];

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1 mr-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" title="Navigation">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
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
            MRC<span className="text-mrc-blue"> en Poche</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link to={link.path} key={link.path}>
              <Button
                variant={isActive(link.path) ? "default" : "ghost"}
                className="flex items-center gap-1"
              >
                {link.icon}
                <span>{link.label}</span>
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
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    to={link.path} 
                    key={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Button
                      variant={isActive(link.path) ? "default" : "ghost"}
                      className="w-full justify-start"
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </Button>
                  </Link>
                ))}
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
