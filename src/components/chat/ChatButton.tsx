
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, AlertCircle } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePlanLimits } from '@/hooks/usePlanLimits';
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
    hasChatLimit 
  } = usePlanLimits();
  
  const chatLimitReached = hasReachedLimit('aiChat');
  const remainingChats = getRemainingUsage('aiChat');
  const hasLimit = hasChatLimit();
  
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
  
  if (!showTooltip || (!hasLimit && !chatLimitReached)) return button;
  
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
