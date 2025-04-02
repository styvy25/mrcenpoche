
import { ReactNode, useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

// Variants for different page transitions
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

// Wrap your page components with this for smooth transitions
export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const [renderKey, setRenderKey] = useState(location.pathname);
  
  // Update the render key when the path changes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setRenderKey(location.pathname);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={renderKey}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        className="min-h-[calc(100vh-5rem)] w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
