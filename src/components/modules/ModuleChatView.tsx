
import { useState, useEffect } from "react";
import UserChat from "@/components/chat/UserChat";
import AIChat from "@/components/assistant/AIChat";
import { Button } from "@/components/ui/button";
import { Bot, Users, Info } from "lucide-react";
import AuthDialog, { useAuth } from "@/components/auth/AuthDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";

const ModuleChatView = () => {
  const [chatType, setChatType] = useState<"user" | "ai">("user");
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Check if API keys are defined
  useEffect(() => {
    if (chatType === "ai") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        setShowAPIKeyDialog(true);
      }
    }
  }, [chatType]);

  const handleSwitchChat = (type: "user" | "ai") => {
    if (type === "ai") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        setShowAPIKeyDialog(true);
      }
    }
    setChatType(type);
  };

  if (!isAuthenticated) {
    return (
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center p-10 bg-gray-900/50 rounded-lg border border-white/10">
          <Info size={48} className="text-mrc-blue mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connexion requise</h3>
          <p className="text-center text-muted-foreground mb-6">
            Vous devez être connecté pour accéder aux espaces de discussion
          </p>
          <AuthDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green">
          Espace de discussion
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={chatType === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSwitchChat("user")}
            className={chatType === "user" ? "bg-mrc-blue hover:bg-mrc-blue/90" : ""}
          >
            <Users size={16} className="mr-2" />
            <span className="hidden sm:inline">Apprenants</span>
          </Button>
          <Button 
            variant={chatType === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => handleSwitchChat("ai")}
            className={chatType === "ai" ? "bg-mrc-green hover:bg-mrc-green/90" : ""}
          >
            <Bot size={16} className="mr-2" />
            <span className="hidden sm:inline">Assistant IA</span>
          </Button>
        </div>
      </div>
      
      {chatType === "user" ? <UserChat /> : <AIChat />}

      <Dialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clés API requises</DialogTitle>
            <DialogDescription>
              Pour utiliser l'assistant IA, vous devez configurer vos clés API YouTube et Perplexity
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Veuillez vous rendre dans les paramètres de l'application pour configurer vos clés API.
          </p>
          <DialogFooter>
            <Button 
              onClick={() => {
                setShowAPIKeyDialog(false);
                setChatType("user");
                toast({
                  title: "Configuration nécessaire",
                  description: "Veuillez configurer vos clés API dans les paramètres",
                  variant: "destructive"  // Updated from "warning" to "destructive"
                });
              }}
            >
              Compris
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModuleChatView;
