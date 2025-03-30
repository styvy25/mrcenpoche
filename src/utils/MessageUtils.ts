
import { Message } from "@/types/message";
import { v4 as uuidv4 } from "uuid";

/**
 * Ensures all messages have a timestamp that's a Date object
 */
export const normalizeMessages = (messages: Message[]): Message[] => {
  return messages.map(normalizeMessage);
};

/**
 * Normalize a single message to ensure it has all required properties
 */
export const normalizeMessage = (message: Partial<Message>): Message => {
  // Ensure timestamp is a Date object
  let timestamp = message.timestamp;
  if (timestamp && typeof timestamp === 'string') {
    timestamp = new Date(timestamp);
  } else if (!timestamp) {
    timestamp = new Date();
  }

  // Determine sender based on role if not provided
  const sender = message.sender || (message.role === 'assistant' ? 'ai' : 'user');

  // Create a normalized message
  return {
    id: message.id || uuidv4(),
    content: message.content || message.text || "",
    text: message.text || message.content || "",
    timestamp,
    sender,
    role: message.role,
    isRead: message.isRead || false,
    currentUser: message.currentUser || false,
    senderName: message.senderName,
    senderAvatar: message.senderAvatar,
    senderId: message.senderId,
    mediaUrl: message.mediaUrl,
    mediaType: message.mediaType,
    media: message.media
  };
};

/**
 * Create a message from basic information
 */
export const createMessage = (
  content: string,
  role: "user" | "assistant" = "user",
  additionalProps: Partial<Message> = {}
): Message => {
  const sender = additionalProps.sender || (role === 'assistant' ? 'ai' : 'user');
  
  return {
    id: uuidv4(),
    content,
    text: content,
    timestamp: new Date(),
    sender,
    role,
    isRead: false,
    currentUser: role === 'user',
    ...additionalProps
  };
};

/**
 * Format time for display in message UI
 */
export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format last seen time
 */
export const formatLastSeen = (date: Date): string => {
  const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
  if (minutes < 1) return 'à l\'instant';
  if (minutes < 60) return `il y a ${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `il y a ${hours} h`;
  
  return date.toLocaleDateString('fr-FR');
};

/**
 * Save messages to localStorage
 */
export const saveMessagesToStorage = (messages: Message[], key: string = 'mrc_chat_messages'): void => {
  if (messages.length === 0) return;
  
  const normalizedMessages = normalizeMessages(messages);
  localStorage.setItem(key, JSON.stringify(normalizedMessages));
};

/**
 * Load messages from localStorage
 */
export const loadMessagesFromStorage = (key: string = 'mrc_chat_messages'): Message[] => {
  try {
    const savedMessages = localStorage.getItem(key);
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
        return normalizeMessages(parsedMessages);
      }
    }
  } catch (error) {
    console.error('Error parsing saved messages:', error);
  }
  
  return [];
};
