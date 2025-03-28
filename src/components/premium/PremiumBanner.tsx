
import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PremiumBannerProps {
  type: 'chat' | 'pdf' | 'quiz' | 'general';
  className?: string;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ 
  type = 'general',
  className 
}) => {
  const getMessage = () => {
    switch (type) {
      case 'chat':
        return "Passez à Premium pour des messages illimités avec l'assistant";
      case 'pdf':
        return "Passez à Premium pour générer des documents PDF sans limite";
      case 'quiz':
        return "Passez à Premium pour accéder à tous les quiz sans restriction";
      case 'general':
      default:
        return "Passez à Premium pour profiter de toutes les fonctionnalités sans limite";
    }
  };

  return (
    <div className={cn(
      "bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-950/30 dark:to-amber-900/20",
      "border border-amber-200 dark:border-amber-800/50 rounded-lg p-3 text-sm",
      "flex items-center justify-between",
      className
    )}>
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 text-amber-500 mr-2" />
        <p className="text-amber-800 dark:text-amber-200">{getMessage()}</p>
      </div>
      <a
        href="https://buy.stripe.com/14kcQabKFbUM9NK8wT"
        target="_blank"
        rel="noopener noreferrer" 
        className="text-xs font-medium bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full transition-colors"
      >
        Upgrader
      </a>
    </div>
  );
};

export default PremiumBanner;
