
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DockItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DockLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

interface DockContextType {
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
}

const DockContext = React.createContext<DockContextType>({
  activeIndex: null,
  setActiveIndex: () => {}
});

export function Dock({
  children,
  className,
  ...props
}: DockProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  return (
    <DockContext.Provider value={{
      activeIndex,
      setActiveIndex
    }}>
      <div className={cn("flex justify-center pb-safe sticky bottom-0 z-50 px-4 [--dock-item-size:2.75rem] sm:[--dock-item-size:3.5rem]", className)} 
           {...props}>
        {children}
      </div>
    </DockContext.Provider>
  );
}

export function DockItem({
  children,
  className,
  ...props
}: DockItemProps) {
  const {
    activeIndex,
    setActiveIndex
  } = React.useContext(DockContext);
  
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.parentElement;
      if (parent) {
        const children = Array.from(parent.children);
        const currentIndex = children.indexOf(ref.current);
        setIndex(currentIndex);
      }
    }
  }, []);
  
  const isActive = activeIndex === index;
  
  return (
    <div 
      ref={ref} 
      onMouseEnter={() => setActiveIndex(index)} 
      onMouseLeave={() => setActiveIndex(null)} 
      className={cn("group relative flex aspect-square cursor-pointer flex-col items-center justify-center transition-all", {
        "z-10 h-[var(--dock-item-size)] w-[var(--dock-item-size)]": !isActive,
        "z-20 h-[calc(var(--dock-item-size)*1.35)] w-[calc(var(--dock-item-size)*1.35)]": isActive
      }, className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DockIcon({
  children,
  className,
  ...props
}: DockIconProps) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center rounded-xl bg-background/80 shadow-sm dark:bg-gray-800/80 transition-all", className)} 
         {...props}>
      <div className="w-6 h-6 sm:w-7 sm:h-7">{children}</div>
    </div>
  );
}

export function DockLabel({
  children,
  className,
  ...props
}: DockLabelProps) {
  const { activeIndex } = React.useContext(DockContext);
  const ref = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  
  useEffect(() => {
    if (ref.current) {
      const parent = ref.current.closest("[class*='group']");
      if (parent) {
        const dock = parent.parentElement;
        if (dock) {
          const children = Array.from(dock.children);
          const currentIndex = children.indexOf(parent);
          setIndex(currentIndex);
        }
      }
    }
  }, []);
  
  const isActive = activeIndex === index;
  
  return (
    <span 
      ref={ref} 
      className={cn("pointer-events-none absolute -top-8 rounded-md bg-popover px-2 py-1 text-sm font-medium shadow-sm text-popover-foreground opacity-0 transition-opacity", 
        isActive && "opacity-100", 
        className)} 
      {...props}
    >
      {children}
    </span>
  );
}
