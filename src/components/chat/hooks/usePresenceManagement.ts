
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
    }
  ]);

  return {
    activeUsers,
    setActiveUsers
  };
};
