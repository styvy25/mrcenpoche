
import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AmazonBooksAd from "@/components/assistant/ads/AmazonBooksAd";
import ChatMessage from "./ChatMessage";
import EmptyChat from "./EmptyChat";

interface MessagesContainerProps {
  messages: {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar?: string;
    content: string;
    timestamp: Date;
  }[];
  currentUserId: string;
  formatTime: (date: Date) => string;
}

const MessagesContainer = ({ messages, currentUserId, formatTime }: MessagesContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Détermine si une pub doit être affichée après un message
  const shouldShowAdAfterMessage = (index: number) => {
    return (index + 1) % 5 === 0 && index !== messages.length - 1;
  };

  return (
    <ScrollArea className="h-full pt-4 px-4 pb-16">
      <div className="space-y-4">
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={message.id}>
                <ChatMessage 
                  message={message}
                  currentUserId={currentUserId}
                  formatTime={formatTime}
                  index={index}
                />
                
                {shouldShowAdAfterMessage(index) && (
                  <div className="my-6">
                    <AmazonBooksAd compact={true} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default MessagesContainer;
