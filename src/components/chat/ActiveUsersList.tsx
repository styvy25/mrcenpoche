
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { User } from './hooks/types';

interface ActiveUsersListProps {
  users: User[];
  currentUserId: string;
  formatLastSeen: (date?: Date) => string;
}

const ActiveUsersList = ({ users, currentUserId, formatLastSeen }: ActiveUsersListProps) => {
  return (
    <Card className="h-full bg-gradient-to-b from-gray-900 to-gray-800 border-white/10 shadow-xl">
      <CardHeader className="pb-3 pt-4 border-b border-white/10">
        <CardTitle className="text-lg flex items-center gap-2 text-white">
          <div className="p-1.5 rounded-full bg-mrc-green/20">
            <Users size={16} className="text-mrc-green" />
          </div>
          Utilisateurs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-1">
          {users.map(user => (
            <div 
              key={user.id}
              className={`flex items-center p-2 rounded-md ${
                user.id === currentUserId 
                  ? 'bg-gradient-to-r from-mrc-blue/10 to-purple-600/10 border border-white/5'
                  : 'hover:bg-gray-800/50'
              } transition-colors`}
            >
              <div className="relative">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-800 text-white">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                  user.isOnline ? 'bg-green-400' : 'bg-gray-400'
                } border-2 border-gray-900`}></span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.id === currentUserId ? `${user.name} (Vous)` : user.name}
                </p>
                <p className="text-xs text-gray-400">
                  {user.isOnline ? 'En ligne' : formatLastSeen(user.lastSeen)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
