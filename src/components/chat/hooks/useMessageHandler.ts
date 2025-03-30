
import { useState, useCallback, useEffect } from 'react';
import { Message } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const useMessageHandler = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize messages from localStorage
  const initializeMessages = useCallback(() => {
    setIsLoading(true);
    try {
      const savedMessages = localStorage.getItem('mrc_chat_messages');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string dates to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } else {
        // Set welcome message if no messages exist
        const welcomeMessage: Message = {
          id: uuidv4(),
          content: "Bienvenue sur le Chat MRC 237! Connectez-vous et commencez à échanger avec d'autres militants.",
          senderId: 'system',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Error initializing messages:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('mrc_chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Handle sending a text message
  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return false;

    const newMessage: Message = {
      id: uuidv4(),
      content: text,
      senderId: '1', // Current user ID
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    return true;
  }, []);

  // Handle sending media (images, audio)
  const handleSendMedia = useCallback(async (file: File) => {
    try {
      // For the demo, we'll create an object URL
      const mediaUrl = URL.createObjectURL(file);
      
      // Determine media type based on file type
      let mediaType: 'image' | 'audio' | 'video' = 'image';
      if (file.type.startsWith('audio/')) {
        mediaType = 'audio';
      } else if (file.type.startsWith('video/')) {
        mediaType = 'video';
      }
      
      const newMessage: Message = {
        id: uuidv4(),
        content: file.name,
        senderId: '1', // Current user ID
        timestamp: new Date(),
        type: mediaType,
        mediaUrl
      };

      setMessages(prev => [...prev, newMessage]);
      return true;
    } catch (error) {
      console.error('Error sending media:', error);
      return false;
    }
  }, []);

  // Clear the conversation
  const clearConversation = useCallback(() => {
    setMessages([]);
    localStorage.removeItem('mrc_chat_messages');
  }, []);

  return {
    messages,
    isLoading,
    setIsLoading,
    handleSendMessage,
    handleSendMedia,
    clearConversation,
    initializeMessages,
    setMessages
  };
};
