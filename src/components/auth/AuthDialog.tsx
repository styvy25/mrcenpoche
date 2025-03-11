
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, LogIn, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import { useAuth } from "./AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

// Updated Auth Dialog component
const AuthDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, user, logout } = useAuth();

  const handleDialogClose = () => {
    setIsOpen(false);
    // Reset to login view when dialog closes
    setIsLogin(true);
  };

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm hidden md:inline-block">{user?.username}</span>
        <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" />
          <span className="hidden md:inline-block">Déconnexion</span>
        </Button>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <LogIn className="h-3.5 w-3.5" />
          <span className="hidden md:inline-block">Connexion</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <User className="stroke-zinc-800 dark:stroke-zinc-100" width={20} height={20} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              {isLogin ? "Bienvenue" : "Créer un compte"}
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              {isLogin
                ? "Entrez vos identifiants pour vous connecter"
                : "Remplissez ce formulaire pour créer votre compte"}
            </DialogDescription>
          </DialogHeader>
        </div>

        {isLogin ? (
          <LoginForm 
            onSuccess={handleDialogClose} 
            onSwitchToRegister={switchToRegister} 
          />
        ) : (
          <RegisterForm 
            onSuccess={handleDialogClose} 
            onSwitchToLogin={switchToLogin} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

// Re-export useAuth for backward compatibility
export { useAuth } from "./AuthContext";
export default AuthDialog;
