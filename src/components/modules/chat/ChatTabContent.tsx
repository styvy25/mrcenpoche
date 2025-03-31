
import { useState } from "react";
import { Users, Bot } from "lucide-react";
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

interface ChatTabContentProps {
  onShowAPIKeyDialog: () => void;
}

const ChatTabContent = ({ onShowAPIKeyDialog }: ChatTabContentProps) => {
  const [chatType, setChatType] = useState<"user" | "ai">("user");
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
    </>
  );
};

export default ChatTabContent;
