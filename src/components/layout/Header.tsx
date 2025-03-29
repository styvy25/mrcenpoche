
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import UserAvatar from "@/components/auth/UserAvatar";
import AuthDialog from "../auth/AuthDialog";
import InstallAppButton from "../pwa/InstallAppButton";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/assets/mrc-logo.png" alt="MRC Logo" className="h-8 w-8" />
            <span className="font-bold text-xl hidden sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green">
              MRC en Poche
            </span>
          </NavLink>
          
          <nav className="hidden md:flex gap-4 ml-4">
            <NavLink 
              to="/assistant" 
              className={({ isActive }) => 
                `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              Assistant
            </NavLink>
            <NavLink 
              to="/documents" 
              className={({ isActive }) => 
                `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              Documents
            </NavLink>
            <NavLink 
              to="/quiz" 
              className={({ isActive }) => 
                `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
              }
            >
              Quiz
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <InstallAppButton />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <UserAvatar />
              <Button variant="outline" size="sm">
                Mon Compte
              </Button>
            </div>
          ) : (
            <AuthDialog />
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleToggleMenu}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-background z-30 md:hidden pt-16">
          <nav className="container py-8 flex flex-col gap-6">
            <NavLink 
              to="/assistant" 
              className="text-xl font-medium py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Assistant
            </NavLink>
            <NavLink 
              to="/documents" 
              className="text-xl font-medium py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Documents
            </NavLink>
            <NavLink 
              to="/quiz" 
              className="text-xl font-medium py-2 border-b border-border"
              onClick={() => setIsOpen(false)}
            >
              Quiz
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
