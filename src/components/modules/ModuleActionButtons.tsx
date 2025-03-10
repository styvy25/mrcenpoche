
import { Button } from "@/components/ui/button";
import { LightbulbIcon, MessageCircle } from "lucide-react";

interface ModuleActionButtonsProps {
  onChallengeClick: () => void;
  onChatClick: () => void;
}

const ModuleActionButtons = ({ onChallengeClick, onChatClick }: ModuleActionButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="hidden md:flex"
        onClick={onChallengeClick}
      >
        <LightbulbIcon className="h-4 w-4 mr-1" />
        Défi du jour
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="hidden md:flex"
        onClick={onChatClick}
      >
        <MessageCircle className="h-4 w-4 mr-1" />
        Discussion
      </Button>
    </div>
  );
};

export default ModuleActionButtons;
