
import { useEffect } from "react";
import { Message } from "./types";

export const useDemoData = (
  user: any,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setActiveUsers: React.Dispatch<React.SetStateAction<any[]>>,
  handleSendMessage: (content: string, senderId: string, senderName: string, senderAvatar?: string) => Promise<Message | null>
) => {
  const triggerDemoResponse = async (messageCount: number) => {
    // Only for demo mode (not authenticated)
    if (user) return;

    // Add a small delay to simulate processing
    setTimeout(async () => {
      if (messageCount === 1) {
        await handleSendMessage(
          "Bonjour ! Comment puis-je vous aider ?",
          "user_2",
          "Ngoufo",
          "https://api.dicebear.com/7.x/micah/svg?seed=john"
        );
      } else if (messageCount === 2) {
        await handleSendMessage(
          "Je vois que vous êtes intéressé par notre plateforme. N'hésitez pas à poser des questions !",
          "user_3",
          "Caroline",
          "https://api.dicebear.com/7.x/micah/svg?seed=susan"
        );
      } else if (messageCount === 3) {
        await handleSendMessage(
          "Avez-vous besoin d'informations sur le processus électoral ? ou d'autres questions ?",
          "user_4",
          "Samuel",
          "https://api.dicebear.com/7.x/micah/svg?seed=alex"
        );
      } else {
        // Random responses for other messages
        const responses = [
          "Merci pour votre message. Un membre de notre équipe vous répondra bientôt.",
          "C'est noté, nous allons examiner votre demande.",
          "Excellent point ! Je partage ces informations avec l'équipe.",
          "Pouvez-vous fournir plus de détails à ce sujet ?",
          "Consultez aussi notre section Documents pour plus d'informations."
        ];
        
        const randomUser = ["user_2", "user_3", "user_4"][Math.floor(Math.random() * 3)];
        const randomUserName = randomUser === "user_2" ? "Ngoufo" : 
                              randomUser === "user_3" ? "Caroline" : "Samuel";
        const randomUserAvatar = `https://api.dicebear.com/7.x/micah/svg?seed=${
          randomUser === "user_2" ? "john" : 
          randomUser === "user_3" ? "susan" : "alex"
        }`;
        
        await handleSendMessage(
          responses[Math.floor(Math.random() * responses.length)],
          randomUser,
          randomUserName,
          randomUserAvatar
        );
      }
    }, 1000);
  };

  // Initialize with demo messages if not authenticated
  useEffect(() => {
    if (!user && setMessages) {
      const demoMessages: Message[] = [
        {
          id: "msg_1",
          senderId: "user_2",
          senderName: "Ngoufo",
          senderAvatar: "https://api.dicebear.com/7.x/micah/svg?seed=john",
          content: "Bienvenue sur notre plateforme d'éducation électorale !",
          timestamp: new Date(Date.now() - 120 * 60000) // 2 hours ago
        },
        {
          id: "msg_2",
          senderId: "user_3",
          senderName: "Caroline",
          senderAvatar: "https://api.dicebear.com/7.x/micah/svg?seed=susan",
          content: "N'hésitez pas à poser vos questions sur le processus électoral.",
          timestamp: new Date(Date.now() - 90 * 60000) // 1.5 hours ago
        }
      ];
      setMessages(demoMessages);
    }
  }, [user, setMessages]);

  return {
    triggerDemoResponse
  };
};
