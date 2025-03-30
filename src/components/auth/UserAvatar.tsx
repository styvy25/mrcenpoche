
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserWithSubscription } from './AuthContext';

interface UserAvatarProps {
  user: UserWithSubscription | null;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, className = '' }) => {
  if (!user) return null;
  
  const userName = user.displayName || user.email?.split('@')[0] || 'User';
  const initials = userName.charAt(0).toUpperCase();
  
  return (
    <Avatar className={className}>
      <AvatarImage src={user.avatar} alt={userName} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
