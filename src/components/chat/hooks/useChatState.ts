
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthContext";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'photo' | 'audio';
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const { user } = useAuth();
  
  const CURRENT_USER_ID = user?.id || "user_1";

  // Initialize dummy data if no user (for demo purposes)
  useEffect(() => {
    // Initial users data
    const initialUsers: User[] = [
      { id: "user_1", name: "Vous", avatar: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png", isOnline: true },
      { id: "user_2", name: "Thierry Kamto", avatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png", isOnline: true },
      { id: "user_3", name: "Marie Ngoh", avatar: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png", isOnline: false, lastSeen: new Date(Date.now() - 25 * 60 * 1000) },
      { id: "user_4", name: "Paul Biya", isOnline: true },
      { id: "user_5", name: "Kamto Maurice", isOnline: false, lastSeen: new Date(Date.now() - 120 * 60 * 1000) },
    ];

    // Initial messages
    const initialMessages: Message[] = [
      {
        id: "msg_1",
        senderId: "user_2",
        senderName: "Thierry Kamto",
        senderAvatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
        content: "Salut! Comment avancez-vous avec les modules de formation?",
        timestamp: new Date(Date.now() - 35 * 60 * 1000)
      },
      {
        id: "msg_2",
        senderId: "user_1",
        senderName: "Vous",
        senderAvatar: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png",
        content: "Ça avance bien! J'ai terminé le module sur l'histoire du MRC. Je trouve le contenu très intéressant.",
        timestamp: new Date(Date.now() - 34 * 60 * 1000)
      },
      {
        id: "msg_3",
        senderId: "user_3",
        senderName: "Marie Ngoh",
        senderAvatar: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png",
        content: "J'ai eu quelques difficultés avec le quiz de communication politique. Les questions sont assez techniques!",
        timestamp: new Date(Date.now() - 28 * 60 * 1000)
      },
      {
        id: "msg_4",
        senderId: "user_2",
        senderName: "Thierry Kamto",
        senderAvatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
        content: "C'est vrai que ce module est plus complexe. N'hésitez pas à utiliser l'assistant AI pour des explications supplémentaires!",
        timestamp: new Date(Date.now() - 20 * 60 * 1000)
      }
    ];

    if (!user) {
      setActiveUsers(initialUsers);
      setMessages(initialMessages);
    } else {
      // Load real users and messages from Supabase here
      loadRealtimeData();
    }
  }, [user]);

  const loadRealtimeData = async () => {
    try {
      // Subscribe to messages
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
            timestamp: new Date(newMessage.created_at)
          }]);
        })
        .subscribe();

      // Set up presence for user status
      const presenceChannel = supabase.channel('online-users');
      
      presenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = presenceChannel.presenceState();
          const presentUsers = Object.keys(state).map(key => {
            const userPresence = state[key][0] as any;
            return {
              id: userPresence.user_id,
              name: userPresence.user_name,
              avatar: userPresence.avatar,
              isOnline: true
            };
          });
          
          setActiveUsers(presentUsers);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          const newUser = newPresences[0] as any;
          setActiveUsers(prev => {
            const exists = prev.some(u => u.id === newUser.user_id);
            if (exists) {
              return prev.map(u => 
                u.id === newUser.user_id ? { ...u, isOnline: true } : u
              );
            } else {
              return [...prev, {
                id: newUser.user_id,
                name: newUser.user_name,
                avatar: newUser.avatar,
                isOnline: true
              }];
            }
          });
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          const leftUser = leftPresences[0] as any;
          setActiveUsers(prev => 
            prev.map(u => 
              u.id === leftUser.user_id ? { ...u, isOnline: false, lastSeen: new Date() } : u
            )
          );
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED' && user) {
            await presenceChannel.track({
              user_id: user.id,
              user_name: user.username || 'Anonymous',
              avatar: user.avatar,
              online_at: new Date().toISOString()
            });
          }
        });

      // Initial load of messages
      const { data: messagesData, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) throw error;

      if (messagesData) {
        setMessages(messagesData.map((msg: any) => ({
          id: msg.id,
          senderId: msg.user_id,
          senderName: msg.user_name || 'Unknown',
          senderAvatar: msg.user_avatar,
          content: msg.content,
          mediaUrl: msg.media_url,
          mediaType: msg.media_type,
          timestamp: new Date(msg.created_at)
        })));
      }

      // Cleanup
      return () => {
        supabase.removeChannel(channel);
        supabase.removeChannel(presenceChannel);
      };
    } catch (error) {
      console.error('Error setting up realtime:', error);
    }
  };

  const handleSendMessage = async (content: string, mediaBlob?: Blob, mediaType?: 'photo' | 'audio') => {
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
        senderId: CURRENT_USER_ID,
        senderName: "Vous",
        senderAvatar: activeUsers.find(u => u.id === CURRENT_USER_ID)?.avatar,
        content,
        mediaUrl,
        mediaType,
        timestamp: new Date()
      };

      // If user is authenticated, save to Supabase
      if (user) {
        const { error } = await supabase
          .from('messages')
          .insert({
            user_id: user.id,
            user_name: user.username || 'You',
            user_avatar: user.avatar,
            content: content,
            media_url: mediaUrl,
            media_type: mediaType
          });
          
        if (error) console.error('Error saving message:', error);
      } else {
        // Just update local state for demo
        setMessages([...messages, newMessage]);

        // Simulate response (for demo)
        if (messages.length % 3 === 0) {
          setTimeout(() => {
            const responderId = activeUsers.filter(u => u.id !== CURRENT_USER_ID && u.isOnline)[
              Math.floor(Math.random() * (activeUsers.filter(u => u.id !== CURRENT_USER_ID && u.isOnline).length))
            ].id;
            
            const responder = activeUsers.find(u => u.id === responderId);
            
            const response: Message = {
              id: `msg_${Date.now() + 1}`,
              senderId: responderId,
              senderName: responder?.name || "Utilisateur",
              senderAvatar: responder?.avatar,
              content: "Merci pour votre message. Continuons cette discussion sur les modules de formation du MRC!",
              timestamp: new Date()
            };

            setMessages(prev => [...prev, response]);
          }, 1500);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (date?: Date) => {
    if (!date) return "il y a longtemps";
    
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutes < 60) return `il y a ${minutes} min`;
    if (minutes < 24 * 60) return `il y a ${Math.floor(minutes / 60)} h`;
    return `il y a ${Math.floor(minutes / (60 * 24))} j`;
  };

  return {
    messages,
    activeUsers,
    CURRENT_USER_ID,
    handleSendMessage,
    formatTime,
    formatLastSeen
  };
};
