
import { useEffect } from "react";
import { Message, User } from "./types";

export const useDemoData = (
  user: any | null,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setActiveUsers: React.Dispatch<React.SetStateAction<User[]>>,
  handleSendMessage: (content: string, senderId: string, senderName: string, senderAvatar?: string) => Promise<Message | null>
) => {
  // Initialize demo data if no user (for preview purposes)
  useEffect(() => {
    if (user) return; // Skip if user is authenticated
    
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

    setActiveUsers(initialUsers);
    setMessages(initialMessages);

    // Set up demo response for when user sends a message
    const setupDemoResponse = () => {
      const originalSendMessage = handleSendMessage;
      
      // Simulate responses in demo mode
      const messageListener = (event: Event) => {
        const customEvent = event as CustomEvent;
        if (customEvent.detail?.messageCount % 3 === 0) {
          setTimeout(() => {
            const responderId = initialUsers.filter(u => u.id !== "user_1" && u.isOnline)[
              Math.floor(Math.random() * (initialUsers.filter(u => u.id !== "user_1" && u.isOnline).length))
            ].id;
            
            const responder = initialUsers.find(u => u.id === responderId);
            
            handleSendMessage(
              "Merci pour votre message. Continuons cette discussion sur les modules de formation du MRC!",
              responderId,
              responder?.name || "Utilisateur",
              responder?.avatar
            );
          }, 1500);
        }
      };

      document.addEventListener('demo-message-sent', messageListener);
      
      return () => {
        document.removeEventListener('demo-message-sent', messageListener);
      };
    };

    const cleanup = setupDemoResponse();
    return cleanup;
  }, [user, setActiveUsers, setMessages, handleSendMessage]);

  // Helper to trigger demo response events
  const triggerDemoResponse = (messageCount: number) => {
    if (!user) {
      document.dispatchEvent(new CustomEvent('demo-message-sent', { 
        detail: { messageCount } 
      }));
    }
  };

  return {
    triggerDemoResponse
  };
};
