
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children, className = "" }) => {
  // State to track if page is ready to be shown
  const [isReady, setIsReady] = useState(false);
  const [key, setKey] = useState(Date.now());
  
  // Set ready state after a short delay to ensure smooth transitions
  useEffect(() => {
    // Reset key when children change to force re-render
    setKey(Date.now());
    setIsReady(false);
    
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [children]);
  
  return (
    <AnimatePresence mode="wait">
      {isReady && (
        <motion.div
          key={`page-content-${key}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className={`${className} no-flicker`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
