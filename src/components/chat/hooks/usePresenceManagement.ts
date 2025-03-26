
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";

export const usePresenceManagement = (currentUserId: string) => {
  const [activeUsers, setActiveUsers] = useState<User[]>([
    {
      id: currentUserId,
      name: "Vous",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=current",
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: "user_2",
      name: "Ngoufo",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=john",
      isOnline: false,
      lastSeen: new Date(Date.now() - 15 * 60000) // 15 minutes ago
    },
    {
      id: "user_3",
      name: "Caroline",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=susan",
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: "user_4",
      name: "Samuel",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=alex",
      isOnline: true,
      lastSeen: new Date()
    },
    {
      id: "user_5",
      name: "Marie",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=marie",
      isOnline: false,
      lastSeen: new Date(Date.now() - 45 * 60000) // 45 minutes ago
    },
    {
      id: "user_6",
      name: "Pierre",
      avatar: "https://api.dicebear.com/7.x/micah/svg?seed=pierre",
      isOnline: true,
      lastSeen: new Date()
    }
  ]);

  // Simuler les changements de présence
  useEffect(() => {
    const randomPresenceChange = () => {
      const userIndex = Math.floor(Math.random() * (activeUsers.length - 1)) + 1; // Skip current user
      const updatedUsers = [...activeUsers];
      const user = {...updatedUsers[userIndex]};
      
      // Toggle online status
      user.isOnline = !user.isOnline;
      if (user.isOnline) {
        user.lastSeen = new Date();
      } else {
        // Random time in the past (1-30 minutes)
        const randomMinutes = Math.floor(Math.random() * 30) + 1;
        user.lastSeen = new Date(Date.now() - randomMinutes * 60000);
      }
      
      updatedUsers[userIndex] = user;
      setActiveUsers(updatedUsers);
    };
    
    // Change presence randomly every 30-60 seconds
    const interval = setInterval(() => {
      randomPresenceChange();
    }, Math.random() * 30000 + 30000);
    
    return () => clearInterval(interval);
  }, [activeUsers]);

  return {
    activeUsers,
    setActiveUsers
  };
};
