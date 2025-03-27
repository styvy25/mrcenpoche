
import React, { memo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';
import StripePaymentPopup from './StripePaymentPopup';
import { motion } from 'framer-motion';

interface StripeButtonProps {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient" | "glow";
  className?: string;
  showIcon?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

const StripeButton: React.FC<StripeButtonProps> = memo(({ 
  children, 
  variant = "gradient",
  className = "",
  showIcon = true,
  size = "default"
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative optimize-animation"
      >
        <Button 
          onClick={() => setIsPopupOpen(true)} 
          variant={variant}
          size={size}
          className={`relative overflow-hidden ${className}`}
        >
          {showIcon && <ShoppingCart className="h-4 w-4 mr-2" />}
          {children}
          
          {variant === "gradient" && (
            <span className="absolute inset-0 overflow-hidden rounded-lg">
              <span className="absolute inset-0 opacity-0 hover:opacity-10 bg-white transform -translate-x-full hover:translate-x-full transition-all duration-1000 ease-out"></span>
            </span>
          )}
        </Button>
      </motion.div>

      <StripePaymentPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
});

StripeButton.displayName = 'StripeButton';

export default StripeButton;
