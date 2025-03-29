
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/components/auth/AuthContext";

const UserAvatar = () => {
  const { user } = useAuth();
  
  const initials = user?.displayName 
    ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase() 
    : 'U';
  
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.avatar || ''} alt={user?.displayName || 'User'} />
      <AvatarFallback className="bg-mrc-blue text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
