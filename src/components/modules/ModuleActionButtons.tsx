
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { LightbulbIcon, MessageCircle, Trophy, Target } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ModuleActionButtonsProps {
  onChallengeClick: () => void;
  onChatClick: () => void;
}

const ModuleActionButtons = memo(({ onChallengeClick, onChatClick }: ModuleActionButtonsProps) => {
  const handleChallengeClick = useCallback(() => {
    onChallengeClick();
    toast.success("Défi quotidien chargé!", {
      icon: <Target className="h-5 w-5 text-mrc-blue" />,
    });
  }, [onChallengeClick]);
  
  const handleChatClick = useCallback(() => {
    onChatClick();
    toast.success("Discussion ouverte!", {
      icon: <MessageCircle className="h-5 w-5 text-green-500" />,
    });
  }, [onChatClick]);

  const handleDuel = useCallback(() => {
    toast.success("Mode duel activé!", {
      icon: <Trophy className="h-5 w-5 text-yellow-500" />,
      description: "Affrontez d'autres militants sur ce module!"
    });
  }, []);
  
  return (
    <div className="flex space-x-2">
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="optimize-animation"
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex items-center gap-1 hover:bg-yellow-50 hover:text-yellow-800 hover:border-yellow-300 transition-colors"
          onClick={handleChallengeClick}
        >
          <LightbulbIcon className="h-4 w-4 mr-1 text-yellow-500" />
          Défi du jour
        </Button>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="optimize-animation"
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex items-center gap-1 hover:bg-blue-50 hover:text-blue-800 hover:border-blue-300 transition-colors"
          onClick={handleChatClick}
        >
          <MessageCircle className="h-4 w-4 mr-1 text-blue-500" />
          Discussion
        </Button>
      </motion.div>
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="hidden md:block optimize-animation"
      >
        <Button 
          variant="outline" 
          size="sm" 
          className="hidden md:flex items-center gap-1 hover:bg-purple-50 hover:text-purple-800 hover:border-purple-300 transition-colors"
          onClick={handleDuel}
        >
          <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
          Duel
        </Button>
      </motion.div>
    </div>
  );
});

ModuleActionButtons.displayName = 'ModuleActionButtons';

export default ModuleActionButtons;
