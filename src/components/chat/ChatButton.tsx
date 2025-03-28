
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatInput } from "@/components/ui/chat-input";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '../premium/PremiumBanner';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '../auth/AuthContext';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    content: "Bonjour ! Je suis votre assistant MRC. Comment puis-je vous aider aujourd'hui ?",
    sender: "ai",
    timestamp: new Date()
  }
];

const ChatButton: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { canSendChatMessage, incrementChatMessages, hasChatLimit } = usePlanLimits();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if the user can send a message based on their plan limits
    if (!canSendChatMessage()) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de messages. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Increment the usage counter
    incrementChatMessages();
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAiResponse(input),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };
  
  // Simple AI response generator
  const getAiResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mrc')) {
      return "Le MRC (Mouvement pour la Renaissance du Cameroun) est un parti politique camerounais fondé en 2012. Son président est Maurice Kamto.";
    }
    
    if (lowercaseQuery.includes('kamto')) {
      return "Maurice Kamto est un homme politique camerounais, président du MRC et ancien candidat à l'élection présidentielle de 2018.";
    }
    
    if (lowercaseQuery.includes('cameroun')) {
      return "Le Cameroun est un pays d'Afrique centrale. Sa capitale politique est Yaoundé et sa capitale économique est Douala.";
    }
    
    return "Je n'ai pas d'information spécifique sur ce sujet. Pourriez-vous préciser votre question concernant le MRC ou le Cameroun ?";
  };

  return (
    <ExpandableChat 
      position="bottom-right" 
      size="md"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Assistant MRC</h3>
          <p className="text-xs text-muted-foreground">Posez vos questions sur le MRC et le Cameroun</p>
        </div>
      </ExpandableChatHeader>
      
      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={message.sender === "user" ? undefined : "/assets/mrc-logo.png"}
                fallback={message.sender === "user" ? "U" : "MRC"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          
          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="/assets/mrc-logo.png"
                fallback="MRC"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>
      
      <ExpandableChatFooter>
        {hasChatLimit() && <PremiumBanner type="chat" className="mb-3" />}
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question..."
            onSubmit={handleSendMessage}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
        
        {!isAuthenticated && (
          <div className="mt-2 text-xs text-center text-muted-foreground">
            <a href="/auth" className="underline hover:text-primary">Connectez-vous</a> pour sauvegarder vos conversations
          </div>
        )}
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default ChatButton;
