
import { useState, useEffect } from 'react';
import { User } from './types';

export const usePresenceManagement = () => {
  // Demo current user
  const [currentUser, setCurrentUser] = useState({
    id: '1',
    name: 'John Doe',
    avatar: '/assets/avatars/user1.png'
  });
  
  // Demo active users
  const [activeUsers, setActiveUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      status: 'En ligne',
      avatar: '/assets/avatars/user1.png',
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: '2',
      name: 'Jane Smith',
      status: 'Occupé',
      avatar: '/assets/avatars/user2.png',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
    },
    {
      id: '3',
      name: 'Alice Johnson',
      status: 'En ligne',
      avatar: '/assets/avatars/user3.png',
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: '4',
      name: 'Bob Brown',
      status: 'En ligne',
      avatar: '/assets/avatars/user4.png',
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: '5',
      name: 'Charlie Davis',
      status: 'Absent',
      avatar: '/assets/avatars/user5.png',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
    },
    {
      id: '6',
      name: 'Diana Evans',
      status: 'En ligne',
      avatar: '/assets/avatars/user6.png',
      isOnline: true,
      lastSeen: new Date()
    }
  ]);

  // Simulate periodic updates of user presence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => {
        // Randomly update some users' status
        return prev.map(user => {
          // 10% chance to change status
          if (Math.random() < 0.1) {
            return {
              ...user,
              isOnline: !user.isOnline,
              lastSeen: user.isOnline ? new Date() : user.lastSeen
            };
          }
          return user;
        });
      });
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return {
    activeUsers,
    currentUser,
    setCurrentUser
  };
};
