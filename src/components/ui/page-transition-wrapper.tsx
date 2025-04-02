
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children, className = "" }) => {
  // State to track if page is ready to be shown
  const [isReady, setIsReady] = useState(false);
  
  // Set ready state after a short delay to ensure smooth transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence mode="wait">
      {isReady && (
        <motion.div
          key="page-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`${className} no-flicker`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransitionWrapper;
