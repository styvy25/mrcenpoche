
import { useState } from "react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

const CURRENT_USER_ID = "user_1";

// Dummy users data
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

export const useChatState = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [activeUsers, setActiveUsers] = useState<User[]>(initialUsers);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER_ID,
      senderName: "Vous",
      senderAvatar: initialUsers.find(u => u.id === CURRENT_USER_ID)?.avatar,
      content,
      timestamp: new Date()
    };

    setMessages([...messages, message]);

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
