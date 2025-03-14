
import React, { useState, useEffect } from 'react';
import { User, UserCheck, Clock, Award, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/components/auth/AuthContext';

interface ConnectedUser {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'busy' | 'away' | 'offline';
  lastActive?: string;
  points?: number;
  isCurrentUser?: boolean;
}

const ConnectedUsers = () => {
  const [users, setUsers] = useState<ConnectedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  
  // Simulate fetching connected users
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to get active users
        // For now, we'll simulate with some static data
        setTimeout(() => {
          const mockUsers: ConnectedUser[] = [
            {
              id: '1',
              name: 'Utilisateur Actuel',
              role: 'Membre',
              status: 'online',
              points: 250,
              isCurrentUser: true
            },
            {
              id: '2',
              name: 'Samuel Eto\'o',
              role: 'Sympathisant',
              avatar: 'https://i.pravatar.cc/150?img=3',
              status: 'online',
              lastActive: 'il y a 5 min',
              points: 420
            },
            {
              id: '3',
              name: 'Marie Ngo',
              role: 'Militant',
              avatar: 'https://i.pravatar.cc/150?img=5',
              status: 'busy',
              lastActive: 'il y a 12 min',
              points: 380
            },
            {
              id: '4',
              name: 'Christian Tumi',
              role: 'Coordinateur',
              avatar: 'https://i.pravatar.cc/150?img=8',
              status: 'online',
              lastActive: 'il y a 3 min',
              points: 570
            },
            {
              id: '5',
              name: 'Caroline Mbia',
              role: 'Membre',
              avatar: 'https://i.pravatar.cc/150?img=9',
              status: 'away',
              lastActive: 'il y a 25 min',
              points: 310
            }
          ];
          
          // If user is logged in, update the current user info
          if (user) {
            const currentUserIndex = mockUsers.findIndex(u => u.isCurrentUser);
            if (currentUserIndex !== -1) {
              mockUsers[currentUserIndex].name = user.email || 'Utilisateur Actuel';
            }
          }
          
          setUsers(mockUsers);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Failed to fetch connected users:', error);
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [user]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-red-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Militant':
        return 'bg-blue-500';
      case 'Coordinateur':
        return 'bg-purple-500';
      case 'Sympathisant':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mrc-blue"></div>
        <p className="mt-3 text-sm text-gray-500">Chargement des utilisateurs...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <UserCheck className="h-5 w-5 mr-2 text-mrc-blue" />
          <h3 className="text-lg font-medium">Utilisateurs connectés</h3>
        </div>
        <Badge variant="outline" className="bg-mrc-blue/10 dark:bg-mrc-blue/5 text-mrc-blue">
          {users.filter(user => user.status === 'online').length} en ligne
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {users.map((user) => (
          <div 
            key={user.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              user.isCurrentUser 
                ? 'bg-mrc-blue/5 border-mrc-blue/20 dark:bg-mrc-blue/10 dark:border-mrc-blue/20' 
                : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                  {user.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  ) : (
                    <AvatarFallback className="bg-mrc-blue text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span 
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(user.status)}`}
                ></span>
              </div>
              
              <div className="ml-3">
                <div className="flex items-center">
                  <span className="font-medium">{user.name}</span>
                  {user.isCurrentUser && (
                    <Badge variant="outline" className="ml-2 text-xs py-0 px-1 border-mrc-blue/30 dark:border-mrc-blue/50 text-mrc-blue">
                      Vous
                    </Badge>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500 gap-2">
                  <Badge 
                    variant="secondary" 
                    className={`text-[10px] px-1 py-0 ${getRoleBadgeColor(user.role)} text-white`}
                  >
                    {user.role}
                  </Badge>
                  
                  {user.lastActive && (
                    <span className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 inline" />
                      {user.lastActive}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {user.points && (
              <div className="flex items-center mr-2">
                <Award className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-medium">{user.points}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedUsers;
