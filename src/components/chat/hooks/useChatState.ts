
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthContext";
import { Message, User } from "./types";
import { useMessageManagement } from "./useMessageManagement";
import { usePresenceManagement } from "./usePresenceManagement";
import { useMessageSubscription } from "./useMessageSubscription";
import { useDemoData } from "./useDemoData";
import { useUISettings } from "@/hooks/useUISettings";

export const useChatState = () => {
  const { user } = useAuth();
  
  // Generate a current user ID (either from auth or a default)
  const CURRENT_USER_ID = user?.id || "user_1";
  
  // Get UI settings for chat visibility
  const { getComponentSettings } = useUISettings();
  const chatSettings = getComponentSettings('ChatButton');

  // Use our new modular hooks
  const {
    messages,
    setMessages,
    handleSendMessage: baseHandleSendMessage,
    formatTime,
    formatLastSeen
  } = useMessageManagement();

  const {
    activeUsers,
    setActiveUsers
  } = usePresenceManagement(CURRENT_USER_ID);

  // Set up real-time message subscription if authenticated
  if (user) {
    useMessageSubscription(setMessages);
  }

  // Set up demo data for non-authenticated preview
  const { triggerDemoResponse } = useDemoData(user, setMessages, setActiveUsers, 
    (content, senderId, senderName, senderAvatar) => 
      baseHandleSendMessage(content, senderId, senderName, senderAvatar)
  );

  // Message count for demo responses
  const [messageCount, setMessageCount] = useState(0);

  // Wrapper for sendMessage to handle both auth and demo cases
  const handleSendMessage = async (content: string, mediaBlob?: Blob, mediaType?: 'photo' | 'audio') => {
    try {
      // Update message counter for demo responses
      const newCount = messageCount + 1;
      setMessageCount(newCount);

      if (user) {
        // Authenticated flow
        return await baseHandleSendMessage(
          content, 
          user.id, 
          user.username || 'You', 
          user.avatar,
          mediaBlob, 
          mediaType
        );
      } else {
        // Demo flow
        const result = await baseHandleSendMessage(
          content, 
          CURRENT_USER_ID, 
          "Vous", 
          activeUsers.find(u => u.id === CURRENT_USER_ID)?.avatar,
          mediaBlob, 
          mediaType
        );
        
        // Trigger demo response
        triggerDemoResponse(newCount);
        return result;
      }
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      return null;
    }
  };

  return {
    messages,
    activeUsers,
    CURRENT_USER_ID,
    handleSendMessage,
    formatTime,
    formatLastSeen,
    chatSettings
  };
};
