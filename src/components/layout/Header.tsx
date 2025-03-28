
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/branding/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePlanLimits } from '@/hooks/usePlanLimits';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { userPlan } = usePlanLimits();

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Logo size="small" />
            <span className="hidden sm:inline-block font-semibold text-lg">MRC en Poche</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {userPlan === 'premium' && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full border border-amber-200 dark:border-amber-700/50 mr-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs font-medium text-amber-800 dark:text-amber-400">Premium</span>
            </div>
          )}

          {!isAuthenticated ? (
            <Link to="/auth">
              <Button size="sm" variant="default">Se connecter</Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className={cn("h-8 w-8 cursor-pointer", userPlan === 'premium' && "ring-2 ring-amber-500 ring-offset-2")}>
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.username?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                {userPlan === 'premium' && (
                  <div className="flex items-center gap-1 px-2 py-1 mx-2 bg-amber-100 dark:bg-amber-900/30 rounded text-xs">
                    <Sparkles className="h-3 w-3 text-amber-500" />
                    <span className="font-medium text-amber-800 dark:text-amber-400">Premium</span>
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profil</Link>
                </DropdownMenuItem>
                {userPlan !== 'premium' && (
                  <DropdownMenuItem asChild>
                    <Link to="/payment" className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                      <span>Passer à Premium</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
