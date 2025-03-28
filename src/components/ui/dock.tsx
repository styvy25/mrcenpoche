
import * as React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface DockContextProps {
  mouseX: MotionValue<number>;
  width: number;
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context for Dock
const DockContext = createContext<DockContextProps | null>(null);

// Custom hook to use the DockContext
const useDock = () => {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("Dock components must be used within a Dock");
  }
  return context;
};

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Dock = ({ children, className, ...props }: DockProps) => {
  const [width, setWidth] = useState(0);
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <DockContext.Provider value={{ mouseX, width, focused, setFocused }}>
      <motion.div
        ref={ref}
        className={cn(
          "flex justify-center items-center gap-2 w-fit mx-auto p-2 bg-white/20 dark:bg-black/20 backdrop-blur rounded-full shadow-lg",
          className
        )}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left);
        }}
        onMouseLeave={() => mouseX.set(0)}
        {...props}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
};

interface DockItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DockItem = ({ children, className, ...props }: DockItemProps) => {
  const { mouseX, width, focused, setFocused } = useDock();
  const ref = useRef<HTMLDivElement>(null);
  
  const defaultSize = 45;
  const maxSize = 65;
  
  const distanceFromCursor = useMotionValue(width);
  const widthSync = useMotionValue(defaultSize);
  
  const widthSpring = useSpring(widthSync, {
    damping: 10,
    stiffness: 150,
  });
  
  useEffect(() => {
    return mouseX.onChange((latestX) => {
      if (!ref.current || !latestX) return;
      
      const rect = ref.current.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      
      const distance = Math.abs(itemCenterX - latestX);
      const maxDistance = width / 2;
      
      let scale = 1 - Math.min(1, distance / maxDistance) * 0.5;
      
      if (focused) {
        scale = Math.min(scale, 1);
      }
      
      const newWidth = defaultSize + (maxSize - defaultSize) * scale;
      widthSync.set(newWidth);
    });
  }, [mouseX, width, widthSync, focused]);
  
  return (
    <motion.div
      ref={ref}
      style={{
        width: widthSpring,
        height: widthSpring,
      }}
      className={cn(
        "flex items-center justify-center relative cursor-pointer transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface DockLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DockLabel = ({ children, className, ...props }: DockLabelProps) => {
  const [hover, setHover] = useState(false);
  
  return (
    <>
      <div
        className="absolute w-full h-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: hover ? 1 : 0, y: hover ? -40 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "absolute px-2 py-1 bg-black/80 text-white rounded text-sm whitespace-nowrap shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DockIcon = ({ children, className, ...props }: DockIconProps) => {
  return (
    <div
      className={cn("w-7 h-7", className)}
      {...props}
    >
      {children}
    </div>
  );
};

Dock.displayName = "Dock";
DockItem.displayName = "DockItem";
DockLabel.displayName = "DockLabel";
DockIcon.displayName = "DockIcon";

export { Dock, DockItem, DockLabel, DockIcon };
