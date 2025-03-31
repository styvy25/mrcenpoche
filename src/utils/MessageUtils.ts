
import { Message } from "@/types";

/**
 * Creates a new message object
 */
export const createMessage = (
  content: string,
  role: 'user' | 'assistant' | 'system'
): Message => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    content,
    role,
    timestamp: new Date(),
    read: role === 'user',
    text: content // Add text field to ensure compatibility
  };
};

/**
 * Normalizes messages to ensure they have proper timestamps
 */
export const normalizeMessages = (messages: Message[]): Message[] => {
  return messages.map(msg => {
    if (msg.timestamp && typeof msg.timestamp === 'string') {
      return {
        ...msg,
        timestamp: new Date(msg.timestamp),
        text: msg.content // Ensure text field exists
      };
    } else if (!msg.timestamp) {
      return {
        ...msg,
        timestamp: new Date(),
        text: msg.content // Ensure text field exists
      };
    }
    // Ensure text field exists
    if (!msg.text) {
      return {
        ...msg,
        text: msg.content
      };
    }
    return msg;
  });
};

/**
 * Loads messages from localStorage
 */
export const loadMessagesFromStorage = (): Message[] => {
  try {
    const savedMessages = localStorage.getItem('mrc_chat_messages');
    if (!savedMessages) return [];
    
    const parsed = JSON.parse(savedMessages);
    if (!Array.isArray(parsed)) return [];
    
    return normalizeMessages(parsed);
  } catch (error) {
    console.error('Error loading messages from storage:', error);
    return [];
  }
};

/**
 * Saves messages to localStorage
 */
export const saveMessagesToStorage = (messages: Message[]): void => {
  try {
    const normalizedMessages = normalizeMessages(messages);
    localStorage.setItem('mrc_chat_messages', JSON.stringify(normalizedMessages));
  } catch (error) {
    console.error('Error saving messages to storage:', error);
  }
};

/**
 * Formats message time for display
 */
export const formatMessageTime = (timestamp: Date | string): string => {
  if (!timestamp) return '';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Formats last seen time for display
 */
export const formatLastSeen = (timestamp: Date | string | undefined): string => {
  if (!timestamp) return 'Never';
  
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} mins ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString();
};
