
import { useState, useEffect } from 'react';
import { useAppContext } from '@/App';
import { useToast } from '@/components/ui/use-toast';

interface UsageLimits {
  chatMessages: number;
  pdfGenerated: number;
  lastResetDate: string;
}

const DEFAULT_LIMITS = {
  chatMessages: 0,
  pdfGenerated: 0,
  lastResetDate: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
};

const CHAT_LIMIT = 10; // 10 messages per day for free users
const PDF_LIMIT = 3; // 3 PDFs per month for free users

export function useUsageLimits() {
  const [limits, setLimits] = useState<UsageLimits>(DEFAULT_LIMITS);
  const { isPremium } = useAppContext();
  const { toast } = useToast();

  // Load limits from localStorage on component mount
  useEffect(() => {
    const storedLimits = localStorage.getItem('usage_limits');
    if (storedLimits) {
      setLimits(JSON.parse(storedLimits));
    }
  }, []);

  // Save limits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('usage_limits', JSON.stringify(limits));
  }, [limits]);

  // Check if it's a new day and reset daily limits if needed
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (limits.lastResetDate !== today) {
      setLimits(prev => ({
        ...prev,
        chatMessages: 0,
        lastResetDate: today
      }));
    }
  }, [limits.lastResetDate]);

  // Increment the chat message count
  const incrementChatMessage = () => {
    if (isPremium) return true; // Premium users have no limits
    
    if (limits.chatMessages >= CHAT_LIMIT) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite quotidienne de 10 messages. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    setLimits(prev => ({
      ...prev,
      chatMessages: prev.chatMessages + 1
    }));
    return true;
  };

  // Increment the PDF generated count
  const incrementPdfGenerated = () => {
    if (isPremium) return true; // Premium users have no limits
    
    if (limits.pdfGenerated >= PDF_LIMIT) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint votre limite mensuelle de 3 PDF générés. Passez à Premium pour un accès illimité.",
        variant: "destructive",
      });
      return false;
    }
    
    setLimits(prev => ({
      ...prev,
      pdfGenerated: prev.pdfGenerated + 1
    }));
    return true;
  };

  // Reset all limits (used when upgrading to premium)
  const resetLimits = () => {
    setLimits(DEFAULT_LIMITS);
  };

  return {
    limits,
    incrementChatMessage,
    incrementPdfGenerated,
    resetLimits,
    isChatLimited: !isPremium && limits.chatMessages >= CHAT_LIMIT,
    isPdfLimited: !isPremium && limits.pdfGenerated >= PDF_LIMIT,
    chatRemaining: isPremium ? Infinity : Math.max(0, CHAT_LIMIT - limits.chatMessages),
    pdfRemaining: isPremium ? Infinity : Math.max(0, PDF_LIMIT - limits.pdfGenerated)
  };
}
