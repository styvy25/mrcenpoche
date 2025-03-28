
import React from 'react';
import { Sparkles } from 'lucide-react';
import { usePlanLimits } from '@/hooks/usePlanLimits';

interface PremiumBannerProps {
  type: 'chat' | 'pdf' | 'modules' | 'general';
  className?: string;
}

const PremiumBanner: React.FC<PremiumBannerProps> = ({ type, className = '' }) => {
  const { userPlan, getUsageStats } = usePlanLimits();
  const stats = getUsageStats();
  
  if (userPlan !== 'free') return null;
  
  let message = '';
  
  switch (type) {
    case 'chat':
      message = `Utilisé ${stats.chatMessagesToday}/${stats.chatMessagesLimit} messages aujourd'hui`;
      break;
    case 'pdf':
      message = `Générations PDF: ${stats.pdfGenerationsThisMonth}/${stats.pdfGenerationsLimit} ce mois-ci`;
      break;
    case 'modules':
      message = 'Accédez à tous les modules avec Premium';
      break;
    case 'general':
      message = 'Débloquez toutes les fonctionnalités avec Premium';
      break;
  }
  
  return (
    <div className={`flex items-center gap-2 p-3 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border border-amber-200 dark:border-amber-800/50 rounded-lg ${className}`}>
      <Sparkles className="h-4 w-4 text-amber-500" />
      <div className="flex flex-col xs:flex-row gap-1 items-start xs:items-center flex-wrap">
        <span className="text-sm text-amber-800 dark:text-amber-400">{message}</span>
        <a 
          href="/payment" 
          className="text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-2 py-1 rounded-full transition-colors"
        >
          Passer à Premium
        </a>
      </div>
    </div>
  );
};

export default PremiumBanner;
