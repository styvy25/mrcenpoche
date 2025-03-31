
import React, { useState, useEffect, useRef } from 'react';
import { GooeyFilter } from "@/components/ui/gooey-filter";

interface InteractiveBackgroundProps {
  isLoading: boolean;
  messagesLength: number;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ 
  isLoading, 
  messagesLength 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <GooeyFilter id="gooey-chat" strength={8} />
      
      <div 
        className="absolute w-32 h-32 rounded-full bg-mrc-blue/30 blur-xl"
        style={{ 
          left: `${mousePosition.x / 8}px`, 
          top: `${mousePosition.y / 8}px`,
          transition: 'transform 0.5s ease-out, opacity 0.5s ease-out',
          transform: `translate(-50%, -50%) scale(${isLoading ? 1.5 : 1})`,
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full bg-mrc-green/20 blur-xl"
        style={{ 
          right: `${window.innerWidth - mousePosition.x / 4}px`, 
          bottom: `${window.innerHeight - mousePosition.y / 4}px`,
          transition: 'all 0.8s ease-out',
          transform: `translate(50%, 50%) scale(${messagesLength % 2 === 0 ? 1.2 : 1})`,
        }}
      />
      <div 
        className="absolute w-40 h-40 rounded-full bg-mrc-red/15 blur-xl animate-pulse"
        style={{ 
          left: '30%', 
          top: '60%',
          animationDuration: '8s',
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
