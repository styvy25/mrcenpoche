
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { APIKeyForm } from "../settings/APIKeyForm";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageDisplay from "./MessageDisplay";
import LoadingIndicator from "./LoadingIndicator";
import { Message } from "./types/message";
import { getPerplexityResponse } from "./services/perplexityService";

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (input: string) => {
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer vos clés API.",
        variant: "destructive",
      });
      return;
    }

    const { perplexity } = JSON.parse(apiKeys);
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseContent = await getPerplexityResponse(perplexity, input);
      
      const aiMessage: Message = {
        role: "assistant",
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF en cours de génération",
      description: "Votre document sera téléchargé automatiquement dans quelques instants.",
    });
    
    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "PDF généré avec succès",
        description: "Votre document a été téléchargé.",
        variant: "default",
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden border border-white/10">
      {!localStorage.getItem("api_keys") && (
        <div className="p-4">
          <APIKeyForm />
        </div>
      )}
      
      <ChatHeader onGeneratePDF={handleGeneratePDF} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/60">
        {messages.map((message, index) => (
          <MessageDisplay key={index} message={message} />
        ))}
        {isLoading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput 
        isLoading={isLoading} 
        onSendMessage={handleSendMessage} 
        onGeneratePDF={handleGeneratePDF} 
      />
    </div>
  );
};

export default AIChat;
