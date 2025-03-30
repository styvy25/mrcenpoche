
import React, { useMemo } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth';
import UserAvatar from '../auth/UserAvatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Shield } from 'lucide-react';

const AuthNavItem = () => {
  const { currentUser: user, logout } = useAuth();
  const navigate = useNavigate();

  const userDisplayName = useMemo(() => {
    return user?.username || user?.email?.split('@')[0] || 'Utilisateur';
  }, [user]);

  const userRole = useMemo(() => {
    return user?.role || 'Utilisateur';
  }, [user]);

  const lastLoginDisplay = useMemo(() => {
    if (!user?.lastLogin) return 'N/A';
    
    const date = new Date(user.lastLogin);
    const today = new Date();
    
    // If it's today, show time
    if (date.toDateString() === today.toDateString()) {
      return `Aujourd'hui à ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If it's yesterday
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Hier à ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show full date
    return date.toLocaleDateString(undefined, { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navigateToProfile = () => {
    navigate('/dashboard');
  };

  const navigateToSettings = () => {
    navigate('/settings');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar user={user} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userDisplayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="px-2 py-1.5">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Shield className="h-3 w-3" />
              <span>Statut: {userRole}</span>
            </div>
            <div>Dernière connexion: {lastLoginDisplay}</div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer" onClick={navigateToProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>Mon Profil</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer" onClick={navigateToSettings}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Paramètres</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default React.memo(AuthNavItem);
