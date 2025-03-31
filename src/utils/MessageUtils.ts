
/**
 * Utility functions for message formatting and handling
 */

// Format message timestamp to a readable string
export const formatMessageTime = (timestamp: Date | string): string => {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format last seen timestamp to a readable string
export const formatLastSeen = (timestamp: Date | string): string => {
  if (!timestamp) return 'Offline';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // difference in seconds
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  
  return date.toLocaleDateString();
};

// Create a standardized chat message
export const createChatMessage = (
  content: string, 
  role: "user" | "assistant" | "system", 
  sender?: string,
  additionalData = {}
): Message => {
  return {
    role,
    content,
    timestamp: new Date(),
    sender,
    ...additionalData
  };
};

// Message type definition for local use
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  sender?: string;
  [key: string]: any;
}
