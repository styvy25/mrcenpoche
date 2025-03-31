
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

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

// Messages d'exemple pour simulation
const sampleResponses = [
  "Merci pour votre message! Le module sur l'histoire du MRC est vraiment complet.",
  "Je suis d'accord avec vous, les quiz sont bien structurés même s'ils sont exigeants.",
  "Avez-vous terminé le module sur la communication politique? J'ai trouvé certains concepts difficiles.",
  "L'assistant IA est très utile pour approfondir certains sujets. Je l'utilise régulièrement.",
  "Personnellement, j'ai apprécié les vidéos intégrées dans les modules, elles complètent bien la théorie.",
  "N'hésitez pas à participer aux défis quotidiens, ils sont excellents pour renforcer nos connaissances!",
  "J'ai terminé la section sur les enjeux économiques. Le contenu est vraiment intéressant et bien documenté.",
];

// Utilisateurs de démonstration
const initialUsers: User[] = [
  { id: "user_1", name: "Vous", avatar: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png", isOnline: true },
  { id: "user_2", name: "Thierry Kamto", avatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png", isOnline: true },
  { id: "user_3", name: "Marie Ngoh", avatar: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png", isOnline: false, lastSeen: new Date(Date.now() - 25 * 60 * 1000) },
  { id: "user_4", name: "Paul Biya", isOnline: true },
  { id: "user_5", name: "Kamto Maurice", isOnline: false, lastSeen: new Date(Date.now() - 120 * 60 * 1000) },
  { id: "user_6", name: "Jacqueline Nkolo", isOnline: true },
  { id: "user_7", name: "Thomas Manga", isOnline: true },
  { id: "user_8", name: "Sarah Eteki", isOnline: false, lastSeen: new Date(Date.now() - 15 * 60 * 1000) },
];

// Messages initiaux
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
  
  // Simulation d'activité utilisateur
  useEffect(() => {
    // Intervalles aléatoires pour les activités
    const userActivityInterval = setInterval(() => {
      // Simuler les changements de statut en ligne/hors ligne
      setActiveUsers(prev => prev.map(user => {
        if (user.id === CURRENT_USER_ID) return user; // Garder l'utilisateur actuel toujours en ligne
        const randomChange = Math.random() > 0.9;
        if (randomChange) {
          return {
            ...user,
            isOnline: !user.isOnline,
            lastSeen: !user.isOnline ? undefined : new Date()
          };
        }
        return user;
      }));
    }, 30000); // Vérifier toutes les 30 secondes
    
    return () => {
      clearInterval(userActivityInterval);
    };
  }, []);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Créer le message de l'utilisateur
    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER_ID,
      senderName: "Vous",
      senderAvatar: activeUsers.find(u => u.id === CURRENT_USER_ID)?.avatar,
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    
    // Notification de message envoyé
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès",
      duration: 2000,
    });

    // Simuler une réponse d'un autre utilisateur (pour démo)
    setTimeout(() => {
      // Sélectionner un utilisateur en ligne aléatoire autre que l'utilisateur actuel
      const onlineUsers = activeUsers.filter(u => u.id !== CURRENT_USER_ID && u.isOnline);
      
      if (onlineUsers.length > 0) {
        const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
        const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        
        const response: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: randomUser.id,
          senderName: randomUser.name,
          senderAvatar: randomUser.avatar,
          content: randomResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, response]);
        
        // Notification de nouveau message
        toast({
          title: "Nouveau message",
          description: `${randomUser.name} vient de répondre`,
          duration: 3000,
        });
      }
    }, Math.random() * 3000 + 1000); // Réponse entre 1-4 secondes
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
