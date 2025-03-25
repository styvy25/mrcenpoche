
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

export const usePresenceManagement = (currentUserId: string, initialUsers: User[] = []) => {
  const [activeUsers, setActiveUsers] = useState<User[]>(initialUsers);

  // Setup presence channel for user status tracking
  useEffect(() => {
    const setupPresence = async () => {
      try {
        const presenceChannel = supabase.channel('online-users');
        
        presenceChannel
          .on('presence', { event: 'sync' }, () => {
            const state = presenceChannel.presenceState();
            const presentUsers = Object.keys(state).map(key => {
              const userPresence = state[key][0] as any;
              return {
                id: userPresence.user_id,
                name: userPresence.user_name,
                avatar: userPresence.avatar,
                isOnline: true
              };
            });
            
            setActiveUsers(presentUsers);
          })
          .on('presence', { event: 'join' }, ({ key, newPresences }) => {
            const newUser = newPresences[0] as any;
            setActiveUsers(prev => {
              const exists = prev.some(u => u.id === newUser.user_id);
              if (exists) {
                return prev.map(u => 
                  u.id === newUser.user_id ? { ...u, isOnline: true } : u
                );
              } else {
                return [...prev, {
                  id: newUser.user_id,
                  name: newUser.user_name,
                  avatar: newUser.avatar,
                  isOnline: true
                }];
              }
            });
          })
          .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
            const leftUser = leftPresences[0] as any;
            setActiveUsers(prev => 
              prev.map(u => 
                u.id === leftUser.user_id ? { ...u, isOnline: false, lastSeen: new Date() } : u
              )
            );
          })
          .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
              await presenceChannel.track({
                user_id: currentUserId,
                user_name: 'You',
                avatar: activeUsers.find(u => u.id === currentUserId)?.avatar,
                online_at: new Date().toISOString()
              });
            }
          });

        // Cleanup on unmount
        return () => {
          supabase.removeChannel(presenceChannel);
        };
      } catch (error) {
        console.error('Error setting up presence:', error);
      }
    };

    if (currentUserId) {
      setupPresence();
    }
  }, [currentUserId]);

  return {
    activeUsers,
    setActiveUsers
  };
};
