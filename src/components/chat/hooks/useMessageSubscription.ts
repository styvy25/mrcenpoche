
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "./types";

export const useMessageSubscription = (
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  useEffect(() => {
    // Subscribe to new messages
    const subscribeToMessages = async () => {
      try {
        // Set up real-time subscription
        const channel = supabase.channel('public:messages')
          .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages' 
          }, (payload) => {
            const newMessage = payload.new as any;
            // Add the new message to the messages state
            setMessages(prevMessages => [...prevMessages, {
              id: newMessage.id,
              senderId: newMessage.user_id,
              senderName: newMessage.user_name || 'Unknown',
              senderAvatar: newMessage.user_avatar,
              content: newMessage.content,
              mediaUrl: newMessage.media_url,
              mediaType: newMessage.media_type,
              timestamp: new Date(newMessage.created_at),
              text: newMessage.content,
              sender: 'ai'
            } as Message]);
          })
          .subscribe();

        // Initial load of messages
        const { data: messagesData, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(50);

        if (error) throw error;

        if (messagesData) {
          const formattedMessages = messagesData.map((msg: any) => ({
            id: msg.id,
            senderId: msg.user_id,
            senderName: msg.user_name || 'Unknown',
            senderAvatar: msg.user_avatar,
            content: msg.content,
            mediaUrl: msg.media_url,
            mediaType: msg.media_type,
            timestamp: new Date(msg.created_at),
            text: msg.content,
            sender: 'ai'
          }) as Message);

          setMessages(formattedMessages);
        }

        // Cleanup
        return () => {
          supabase.removeChannel(channel);
        };
      } catch (error) {
        console.error('Error setting up message subscription:', error);
      }
    };

    subscribeToMessages();
  }, [setMessages]);
};
