
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/types/message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, MoreVertical, RefreshCw, Trash2, Copy, Download } from "lucide-react";
import PDFExportButton from "./PDFExportButton";
import { Feature, usePlanLimits } from "@/hooks/usePlanLimits";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  messages: Message[];
  onClearConversation: () => void;
  onRefresh?: () => Promise<boolean>;
}

export function useChatHeader({ 
  messages, 
  onClearConversation, 
  onRefresh 
}: {
  messages: Message[]; 
  onClearConversation: () => void; 
  onRefresh?: () => Promise<boolean>;
}) {
  const [isClearDialogOpen, setIsClearDialogOpen] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { toast } = useToast();

  const handleClearConfirm = React.useCallback(() => {
    onClearConversation();
    setIsClearDialogOpen(false);
    toast({
      title: "Conversation effacée",
      description: "Toutes les messages ont été supprimés",
    });
  }, [onClearConversation, toast]);

  const handleRefresh = React.useCallback(async () => {
    if (!onRefresh) return;
    
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

  const handleCopyConversation = React.useCallback(() => {
    const conversationText = messages
      .map((msg) => {
        const sender = msg.role === "assistant" || msg.sender === "ai" ? "Styvy237" : "Vous";
        return `${sender}: ${msg.content || msg.text}`;
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

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title = "Assistant IA", 
  subtitle = "Styvy237 - votre assistant pour la formation MRC",
  messages,
  onClearConversation,
  onRefresh
}) => {
  const { 
    isClearDialogOpen, 
    setIsClearDialogOpen,
    isRefreshing,
    handleClearConfirm,
    handleRefresh,
    handleCopyConversation 
  } = useChatHeader({ messages, onClearConversation, onRefresh });
  
  const { hasFeatureAccess } = usePlanLimits();

  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div>
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        {hasFeatureAccess(Feature.PDF_EXPORT) && (
          <PDFExportButton 
            messages={messages} 
            size="sm"
            className="hidden sm:flex"
          />
        )}
        
        {onRefresh && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">Rafraîchir</span>
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {hasFeatureAccess(Feature.PDF_EXPORT) && (
              <DropdownMenuItem asChild>
                <button className="flex w-full items-center" onClick={() => {
                  const pdfButton = document.querySelector('button[class*="PDFExportButton"]') as HTMLButtonElement;
                  pdfButton?.click();
                }}>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter PDF
                </button>
              </DropdownMenuItem>
            )}
            
            <DropdownMenuItem onSelect={handleCopyConversation}>
              <Copy className="mr-2 h-4 w-4" />
              Copier conversation
            </DropdownMenuItem>
            
            {onRefresh && (
              <DropdownMenuItem onSelect={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Rafraîchir
              </DropdownMenuItem>
            )}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem 
              onSelect={() => setIsClearDialogOpen(true)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Effacer conversation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <AlertDialog open={isClearDialogOpen} onOpenChange={setIsClearDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Effacer la conversation?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action est irréversible. Tous les messages seront définitivement supprimés.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearConfirm} className="bg-destructive text-destructive-foreground">
                Effacer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
};

export default ChatHeader;
