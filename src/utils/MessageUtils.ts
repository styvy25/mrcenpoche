
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
    read: role === 'user'
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
        timestamp: new Date(msg.timestamp)
      };
    } else if (!msg.timestamp) {
      return {
        ...msg,
        timestamp: new Date()
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
