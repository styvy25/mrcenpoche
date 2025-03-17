
import React, { memo } from 'react';
import { Button } from "@/components/ui/button";
import { Key, Loader2, ShoppingCart, Shield, CheckCircle } from 'lucide-react';
import { useStripePayment } from '@/hooks/payment/useStripePayment';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StripeButtonProps {
  priceId: string;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  className?: string;
  showIcon?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

const StripeButton: React.FC<StripeButtonProps> = memo(({ 
  priceId, 
  children, 
  variant = "gradient",
  className = "",
  showIcon = true,
  size = "default"
}) => {
  const { initiatePayment, isApiKeySet, isProcessing } = useStripePayment(priceId);
  const navigate = useNavigate();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Add a small delay to allow the button animation to complete
    e.preventDefault();
    
    if (!isApiKeySet) {
      navigate('/settings');
      return;
    }
    
    // Introduce a small delay for better visual feedback
    setTimeout(async () => {
      const success = await initiatePayment();
      if (success) {
        console.log('Payment initiated successfully');
      }
    }, 100);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative optimize-animation"
    >
      <Button 
        onClick={handleClick} 
        variant={variant}
        size={size}
        className={`relative overflow-hidden ${className}`}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : !isApiKeySet ? (
          <Key className="h-4 w-4 mr-2" />
        ) : showIcon ? (
          <ShoppingCart className="h-4 w-4 mr-2" />
        ) : null}
        {children}
        
        {/* Effet de brillance sur le bouton */}
        {variant === "gradient" && !isProcessing && (
          <span className="absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute inset-0 opacity-0 hover:opacity-10 bg-white transform -translate-x-full hover:translate-x-full transition-all duration-1000 ease-out"></span>
          </span>
        )}
      </Button>
      
      {/* Indicateur de sécurité */}
      {variant === "gradient" && !isProcessing && (
        <motion.div 
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs flex items-center gap-1 text-muted-foreground opacity-0 hover:opacity-100 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          <Shield className="h-3 w-3" /> Paiement sécurisé
        </motion.div>
      )}
      
      {/* Effet de succès lors du click */}
      {isProcessing && (
        <motion.div
          className="absolute inset-0 bg-green-500/10 rounded-lg optimize-animation"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
});

StripeButton.displayName = 'StripeButton';

export default StripeButton;
