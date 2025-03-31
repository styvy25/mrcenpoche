
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePlanLimits, Feature } from '@/hooks/usePlanLimits';
import { useNavigate } from 'react-router-dom';

interface ChatButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  showTooltip?: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ 
  variant = 'default',
  showTooltip = true
}) => {
  const navigate = useNavigate();
  const { 
    hasReachedLimit,
    getRemainingUsage,
    hasLimit 
  } = usePlanLimits();
  
  const chatLimitReached = hasReachedLimit(Feature.AI_CHAT);
  const remainingChats = getRemainingUsage(Feature.AI_CHAT);
  const hasChatLimit = hasLimit(Feature.AI_CHAT);
  
  const handleClick = () => {
    navigate('/assistant');
  };
  
  const button = (
    <Button 
      variant={variant} 
      onClick={handleClick}
      className="gap-2"
      disabled={chatLimitReached}
    >
      {chatLimitReached ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <MessageCircle className="h-4 w-4" />
      )}
      <span>Discussion</span>
    </Button>
  );
  
  if (!showTooltip || (!hasChatLimit && !chatLimitReached)) return button;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent>
          {chatLimitReached ? (
            <p>Limite de discussions atteinte. Passez au premium pour plus.</p>
          ) : (
            <p>Il vous reste {remainingChats} discussions</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatButton;
