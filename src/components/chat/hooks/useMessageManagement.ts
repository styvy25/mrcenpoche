
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Message, User } from "./types";

export const useMessageManagement = (initialMessages: Message[] = []) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Helper to format timestamps consistently
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to format last seen time with a friendly relative format
  const formatLastSeen = (date?: Date) => {
    if (!date) return "il y a longtemps";
    
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutes < 60) return `il y a ${minutes} min`;
    if (minutes < 24 * 60) return `il y a ${Math.floor(minutes / 60)} h`;
    return `il y a ${Math.floor(minutes / (60 * 24))} j`;
  };

  // Function to send a message
  const handleSendMessage = async (
    content: string, 
    senderId: string, 
    senderName: string,
    senderAvatar?: string,
    mediaBlob?: Blob, 
    mediaType?: 'photo' | 'audio'
  ) => {
    try {
      let mediaUrl = undefined;
      
      // Upload media if present
      if (mediaBlob && mediaType) {
        const fileName = `chat-${Date.now()}.${mediaType === 'photo' ? 'jpg' : 'webm'}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('chat-media')
          .upload(fileName, mediaBlob, {
            contentType: mediaType === 'photo' ? 'image/jpeg' : 'audio/webm',
          });
          
        if (uploadError) {
          console.error('Error uploading media:', uploadError);
        } else {
          // Get public URL
          const { data } = supabase.storage
            .from('chat-media')
            .getPublicUrl(fileName);
            
          mediaUrl = data.publicUrl;
        }
      }

      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId,
        senderName,
        senderAvatar,
        content,
        mediaUrl,
        mediaType,
        timestamp: new Date(),
        text: content,
        sender: 'user'
      };

      // If user is authenticated, save to Supabase
      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: senderId,
          user_name: senderName,
          user_avatar: senderAvatar,
          content: content,
          media_url: mediaUrl,
          media_type: mediaType
        });
          
      if (error) {
        console.error('Error saving message:', error);
        // Still update local state even if DB save fails
      }
      
      // Update local state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      return newMessage;
      
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  };

  return {
    messages,
    setMessages,
    handleSendMessage,
    formatTime,
    formatLastSeen
  };
};
