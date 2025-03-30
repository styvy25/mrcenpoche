
import { useState, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";

interface UseChatHeaderProps {
  messages: Message[];
  onClearConversation: () => void;
  onRefresh: () => Promise<boolean>;
}

export function useChatHeader({ 
  messages, 
  onClearConversation, 
  onRefresh 
}: UseChatHeaderProps) {
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleClearConfirm = useCallback(() => {
    onClearConversation();
    setIsClearDialogOpen(false);
    toast({
      title: "Conversation effacée",
      description: "Toutes les messages ont été supprimés",
    });
  }, [onClearConversation, toast]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const success = await onRefresh();
    setIsRefreshing(false);
    
    if (!success) {
      toast({
        title: "Erreur",
        description: "Impossible de rafraîchir la conversation",
        variant: "destructive",
      });
    }
  }, [onRefresh, toast]);

  const handleCopyConversation = useCallback(() => {
    const conversationText = messages
      .map((msg) => {
        const sender = msg.role === "assistant" || msg.sender === "ai" ? "Styvy237" : "Vous";
        return `${sender}: ${msg.content}`;
      })
      .join("\n\n");

    navigator.clipboard.writeText(conversationText);
    toast({
      title: "Conversation copiée",
      description: "La conversation a été copiée dans le presse-papiers",
    });
  }, [messages, toast]);

  return {
    isClearDialogOpen,
    setIsClearDialogOpen,
    isRefreshing,
    handleClearConfirm,
    handleRefresh,
    handleCopyConversation
  };
}
