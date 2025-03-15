
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface User {
  user_id: string;
  name: string;
  avatar?: string;
  online_at: string;
  score?: number;
}

interface ConnectedUsersProps {
  users: User[];
}

const ConnectedUsers: React.FC<ConnectedUsersProps> = ({ users }) => {
  // Sort users by score (highest first)
  const sortedUsers = [...users].sort((a, b) => (b.score || 0) - (a.score || 0));

  if (users.length === 0) {
    return (
      <div className="text-sm text-muted-foreground mt-2">
        Aucun autre utilisateur connecté actuellement.
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-sm font-medium mb-2">Utilisateurs connectés ({users.length})</h4>
      <div className="flex flex-wrap gap-2">
        {sortedUsers.map((user, index) => (
          <motion.div
            key={user.user_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="px-3 py-2 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium flex items-center">
                  {user.name}
                  {index === 0 && users.length > 1 && (
                    <Trophy className="ml-1 h-3 w-3 text-yellow-500" />
                  )}
                </div>
                {user.score !== undefined && (
                  <Badge variant="outline" className="text-xs">
                    {user.score} pts
                  </Badge>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedUsers;
