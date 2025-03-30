
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Users } from 'lucide-react';
import { User } from './types';
import { Badge } from '@/components/ui/badge';

interface Chat237HeaderProps {
  currentUser: User;
  activeUsers: User[];
  onClearChat: () => void;
}

const Chat237Header: React.FC<Chat237HeaderProps> = ({ 
  currentUser, 
  activeUsers,
  onClearChat
}) => {
  const onlineCount = activeUsers.filter(user => user.isOnline).length + 1; // +1 for current user
  
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-2">
        <h3 className="font-semibold">Chat MRC 237</h3>
        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
          <Users className="h-3 w-3 mr-1" />
          {onlineCount} en ligne
        </Badge>
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearChat}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Effacer le chat</span>
        </Button>
      </div>
    </div>
  );
};

export default Chat237Header;
