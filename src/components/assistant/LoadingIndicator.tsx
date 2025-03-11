
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const LoadingIndicator = () => {
  const [dots, setDots] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="p-4 max-w-[85%] bg-gradient-to-r from-mrc-blue/20 to-mrc-blue/30 backdrop-blur-sm border border-mrc-blue/30 rounded-2xl shadow-lg relative overflow-hidden">
      <div className="flex items-center gap-3 relative z-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full bg-gradient-to-br from-mrc-blue to-blue-400 shadow-md transition-all duration-300 ${dots >= i ? 'opacity-100 scale-100' : 'opacity-50 scale-75'}`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              transform: `translateY(${dots >= i ? Math.sin(i) * 5 : 0}px)`
            }}
          ></div>
        ))}
        <span className="text-blue-200 text-sm ml-2 tracking-wide">
          Styvy237 réfléchit
          {'.'.repeat(dots)}
        </span>
      </div>
      
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-40 h-40 rounded-full bg-blue-400/10 blur-xl"
          style={{
            top: '-20px',
            left: '-20px',
            animation: 'pulse 3s infinite ease-in-out',
          }}
        ></div>
        <div 
          className="absolute w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
          style={{
            bottom: '-10px',
            right: '30%',
            animation: 'pulse 2s infinite ease-in-out 1s',
          }}
        ></div>
      </div>
    </Card>
  );
};

export default LoadingIndicator;
