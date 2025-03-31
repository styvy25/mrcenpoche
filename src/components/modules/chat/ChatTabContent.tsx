
import { useState } from "react";
import { Users, Bot, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FuturisticUserChat from "@/components/chat/FuturisticUserChat";
import AIChat from "@/components/assistant/AIChat";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import { useToast } from "@/hooks/use-toast";
import PremiumQuizFeatures from "@/components/quiz/QuizPremiumFeatures";

interface ChatTabContentProps {
  onShowAPIKeyDialog: () => void;
}

const ChatTabContent = ({ onShowAPIKeyDialog }: ChatTabContentProps) => {
  const [chatType, setChatType] = useState<"user" | "ai">("user");
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const { toast } = useToast();

  const handleSwitchChat = (type: "user" | "ai") => {
    if (type === "ai") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        onShowAPIKeyDialog();
        return;
      }
    }
    setChatType(type);
    
    // Randomly show premium features to encourage subscription
    if (Math.random() > 0.7) {
      setTimeout(() => {
        setShowPremiumFeatures(true);
      }, 5000);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Zone de discussion</h3>
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
      
      {chatType === "user" ? <FuturisticUserChat /> : <AIChat />}
      
      <Dialog open={showPremiumFeatures} onOpenChange={setShowPremiumFeatures}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Fonctionnalités Premium
            </DialogTitle>
            <DialogDescription>
              Améliorez votre expérience d'apprentissage avec un accès premium
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <PremiumQuizFeatures />
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPremiumFeatures(false)}
              className="sm:flex-1"
            >
              Plus tard
            </Button>
            <Button
              onClick={() => {
                setShowPremiumFeatures(false);
                toast({
                  title: "Redirection vers le paiement",
                  description: "Vous allez être redirigé vers la page d'abonnement"
                });
              }}
              className="sm:flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
            >
              <Crown className="h-4 w-4 mr-2" />
              Passer à Premium
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatTabContent;
