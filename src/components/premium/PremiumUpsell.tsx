
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export interface PremiumUpsellProps {
  title: string;
  description: string;
  featureList?: string[];
  actionText?: string;
  onAction?: () => void;
}

const PremiumUpsell: React.FC<PremiumUpsellProps> = ({
  title,
  description,
  featureList = [],
  actionText = "Passer à Premium",
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-amber-900/40 via-amber-800/40 to-amber-700/40 border border-amber-600/30 rounded-lg p-4 md:p-6 shadow-lg"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-amber-300 mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-300 mb-3">
            {description}
          </p>
          
          {featureList.length > 0 && (
            <ul className="space-y-1.5">
              {featureList.map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-300">
                  <CheckCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="w-full md:w-auto">
          <Button 
            onClick={onAction} 
            className="w-full md:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-0"
          >
            {actionText}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PremiumUpsell;
