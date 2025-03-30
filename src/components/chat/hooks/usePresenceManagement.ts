
import { useState, useEffect } from 'react';
import { User } from '../types';

export const usePresenceManagement = () => {
  // Mock current user
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    name: 'Utilisateur MRC',
    avatar: 'https://ui-avatars.com/api/?name=Utilisateur+MRC&background=2563EB&color=fff',
    isOnline: true,
    lastSeen: new Date(),
  });

  // Mock active users
  const [activeUsers, setActiveUsers] = useState<User[]>([
    {
      id: '2',
      name: 'Sophie Kamga',
      avatar: 'https://ui-avatars.com/api/?name=Sophie+Kamga&background=6D28D9&color=fff',
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: '3',
      name: 'Jean Foka',
      avatar: 'https://ui-avatars.com/api/?name=Jean+Foka&background=059669&color=fff',
      isOnline: false,
      lastSeen: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    },
    {
      id: '4',
      name: 'Michelle Nounga',
      avatar: 'https://ui-avatars.com/api/?name=Michelle+Nounga&background=DC2626&color=fff',
      isOnline: true,
      lastSeen: new Date(),
    },
    {
      id: '5',
      name: 'Paul Biya',
      avatar: 'https://ui-avatars.com/api/?name=Paul+Biya&background=D97706&color=fff',
      isOnline: false,
      lastSeen: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    },
  ]);

  // Simulate periodic updates of user presence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => 
        prev.map(user => ({
          ...user,
          isOnline: Math.random() > 0.3, // Randomly change online status
          lastSeen: user.isOnline ? new Date() : user.lastSeen,
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    currentUser,
    activeUsers,
  };
};
