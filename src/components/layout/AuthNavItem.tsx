
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthDialog";
import { LogIn, LogOut, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const AuthNavItem = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  // Pour éviter les erreurs d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="md:mr-2 text-mrc-blue hover:text-mrc-blue/80 hover:bg-white/10"
        asChild
      >
        <a href="/auth">
          <LogIn className="h-4 w-4 mr-2" />
          Connexion
        </a>
      </Button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:mr-2 text-mrc-blue hover:text-mrc-blue/80 hover:bg-white/10"
        >
          <User className="h-4 w-4 mr-2" />
          <span className="hidden md:inline-block">{user?.username}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align="end">
        <div className="space-y-3">
          <div className="border-b pb-2">
            <p className="font-medium">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <div className="space-y-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <a href="/settings">
                <User className="h-4 w-4 mr-2" />
                Profile
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-red-500 hover:text-red-600"
              onClick={logout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AuthNavItem;
