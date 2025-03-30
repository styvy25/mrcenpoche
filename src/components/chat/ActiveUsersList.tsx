
import { useState } from 'react';
import { User } from './hooks/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users by search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort users: online first, then by name
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a.isOnline && !b.isOnline) return -1;
    if (!a.isOnline && b.isOnline) return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <Card className="h-full">
      <CardHeader className="py-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Utilisateurs</span>
          <Badge variant="outline" className="ml-2">
            {users.filter(user => user.isOnline).length} en ligne
          </Badge>
        </CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-auto max-h-[calc(100%-6rem)]">
        <div className="divide-y">
          {sortedUsers.map(user => (
            <div 
              key={user.id} 
              className={`flex items-center gap-3 p-3 hover:bg-accent/50 transition-colors ${
                user.id === currentUserId ? 'bg-accent/30' : ''
              }`}
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.isOnline 
                    ? user.status || 'En ligne' 
                    : `Vu à ${formatLastSeen(user.lastSeen)}`
                  }
                </p>
              </div>
            </div>
          ))}
          
          {filteredUsers.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-muted-foreground text-sm">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveUsersList;
