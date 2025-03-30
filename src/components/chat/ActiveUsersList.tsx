
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/components/chat/types';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface ActiveUsersListProps {
  users: User[];
  currentUserId: string;
  formatLastSeen: (date: Date) => string;
}

const ActiveUsersList: React.FC<ActiveUsersListProps> = ({ 
  users, 
  currentUserId,
  formatLastSeen 
}) => {
  // Sort users: online first, then by name
  const sortedUsers = [...users].sort((a, b) => {
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <Card className="h-full bg-gradient-to-br from-gray-900/80 to-black/90 border-blue-900/50 backdrop-blur-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
          <Users size={18} className="text-blue-400" />
          <span>Utilisateurs</span>
          <Badge variant="outline" className="ml-1 bg-blue-500/20 text-blue-300 border-blue-600">
            {users.filter(user => user.isOnline).length}/{users.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <ScrollArea className="h-[calc(80vh-10rem)]">
          <div className="space-y-3">
            {sortedUsers.map(user => (
              <div 
                key={user.id} 
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  user.isOnline 
                    ? 'bg-blue-900/20 hover:bg-blue-900/30' 
                    : 'bg-gray-800/30 hover:bg-gray-800/50'
                }`}
              >
                <div className="relative">
                  <Avatar className="h-10 w-10 border border-blue-800">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${
                    user.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}></span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-medium truncate text-white">
                      {user.name}
                      {user.id === currentUserId && (
                        <Badge variant="outline" className="ml-2 text-xs py-0 h-4 bg-blue-500/20 text-blue-300 border-none">
                          Vous
                        </Badge>
                      )}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {user.isOnline ? 'En ligne' : `Vu à ${formatLastSeen(user.lastSeen)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
