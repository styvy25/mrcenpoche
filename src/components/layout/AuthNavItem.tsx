
import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from '../auth/AuthContext';
import UserAvatar from '../auth/UserAvatar';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AuthNavItem = () => {
  const { currentUser: user, logout } = useAuth();
  const navigate = useNavigate();

  const userDisplayName = user?.username || user?.email?.split('@')[0] || 'User';
  const lastLoginDisplay = user?.lastLogin
    ? new Date(user.lastLogin).toLocaleString()
    : 'N/A';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <UserAvatar user={user} className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="flex flex-col gap-1.5">
          <div>
            <span className="font-semibold">{userDisplayName}</span>
            <p className="text-xs text-muted-foreground">
              Dernière connexion: {lastLoginDisplay}
            </p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthNavItem;
