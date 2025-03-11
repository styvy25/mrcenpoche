
import { useState } from "react";
import UserChat from "@/components/chat/UserChat";
import AIChat from "@/components/assistant/AIChat";
import { Button } from "@/components/ui/button";
import { Bot, Users } from "lucide-react";

const ModuleChatView = () => {
  const [chatType, setChatType] = useState<"user" | "ai">("user");

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gradient-to-r from-mrc-blue to-mrc-green bg-clip-text text-transparent">
          Espace de discussion
        </h2>
        <div className="flex gap-2">
          <Button 
            variant={chatType === "user" ? "default" : "outline"}
            size="sm"
            onClick={() => setChatType("user")}
            className={chatType === "user" ? "bg-mrc-blue" : ""}
          >
            <Users size={16} className="mr-2" />
            Apprenants
          </Button>
          <Button 
            variant={chatType === "ai" ? "default" : "outline"}
            size="sm"
            onClick={() => setChatType("ai")}
            className={chatType === "ai" ? "bg-mrc-green" : ""}
          >
            <Bot size={16} className="mr-2" />
            Assistant IA
          </Button>
        </div>
      </div>
      
      {chatType === "user" ? <UserChat /> : <AIChat />}
    </div>
  );
};

export default ModuleChatView;
