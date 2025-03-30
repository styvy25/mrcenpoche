
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import UserAvatar from "@/components/auth/UserAvatar";
import AuthDialog from "../auth/AuthDialog";
import InstallAppButton from "../pwa/InstallAppButton";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import MRCLogoNew from "@/components/branding/MRCLogoNew";
import ChatButton from "@/components/chat/ChatButton";
import AuthNavItem from "./AuthNavItem";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleAccountClick = () => {
    navigate('/dashboard');
  };
  
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="">
          <NavLink to="/" className="flex items-center gap-2 object-cover">
            <MRCLogoNew size="small" />
            <span className="font-bold text-xl hidden sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green">
              MRC en Poche
            </span>
          </NavLink>
          
          <nav className="hidden md:flex gap-4 ml-4">
            <NavLink to="/assistant" className={({
            isActive
          }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Assistant
            </NavLink>
            <NavLink to="/documents" className={({
            isActive
          }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Documents
            </NavLink>
            <NavLink to="/quiz" className={({
            isActive
          }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Quiz
            </NavLink>
            <NavLink to="/chat-237" className={({
            isActive
          }) => `text-sm font-medium ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
              Chat 237
            </NavLink>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild className="hidden sm:flex">
            <NavLink to="/chat-237">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat 237
            </NavLink>
          </Button>
          
          <ThemeToggle />
          <InstallAppButton />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <AuthNavItem />
              <Button variant="outline" size="sm" onClick={handleAccountClick}>
                Mon Compte
              </Button>
            </div>
          ) : (
            <AuthDialog />
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={handleToggleMenu}>
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && <div className="fixed inset-0 bg-background z-30 md:hidden pt-16">
          <nav className="container py-8 flex flex-col gap-6">
            <NavLink to="/assistant" className="text-xl font-medium py-2 border-b border-border" onClick={() => setIsOpen(false)}>
              Assistant
            </NavLink>
            <NavLink to="/documents" className="text-xl font-medium py-2 border-b border-border" onClick={() => setIsOpen(false)}>
              Documents
            </NavLink>
            <NavLink to="/quiz" className="text-xl font-medium py-2 border-b border-border" onClick={() => setIsOpen(false)}>
              Quiz
            </NavLink>
            <NavLink to="/chat-237" className="text-xl font-medium py-2 border-b border-border" onClick={() => setIsOpen(false)}>
              Chat 237
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/dashboard" className="text-xl font-medium py-2 border-b border-border" onClick={() => setIsOpen(false)}>
                Mon Compte
              </NavLink>
            )}
          </nav>
        </div>}
    </header>
  );
};

export default Header;
