
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const LoadingIndicator = () => {
  const [dots, setDots] = useState(0);
  const [highlight, setHighlight] = useState(false);
  
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 300);
    
    const highlightInterval = setInterval(() => {
      setHighlight(true);
      setTimeout(() => setHighlight(false), 1000);
    }, 3000);
    
    return () => {
      clearInterval(dotsInterval);
      clearInterval(highlightInterval);
    };
  }, []);

  return (
    <Card className={`p-4 max-w-[85%] bg-gradient-to-r from-mrc-blue/20 to-mrc-blue/30 backdrop-blur-sm border border-mrc-blue/30 rounded-2xl shadow-lg relative overflow-hidden transition-all duration-300 ${highlight ? 'shadow-mrc-blue/30 shadow-lg' : ''}`}>
      <div className="flex items-center gap-3 relative z-10">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className={`w-3 h-3 rounded-full bg-gradient-to-br from-mrc-blue to-blue-400 shadow-md transition-all duration-300 ${
              dots >= i ? 'opacity-100 scale-100' : 'opacity-50 scale-75'
            }`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              transform: `translateY(${dots >= i ? Math.sin(i) * 5 : 0}px) ${highlight && i === dots ? 'scale(1.3)' : ''}`
            }}
          ></div>
        ))}
        <span className="text-blue-200 text-sm ml-2 tracking-wide flex items-center gap-1">
          {highlight && <Sparkles size={14} className="text-yellow-300 animate-pulse" />}
          Styvy237 réfléchit
          {'.'.repeat(dots)}
        </span>
      </div>
      
      {/* Enhanced animated background effect */}
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
        <div 
          className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 transition-opacity duration-1000 ${
            highlight ? 'opacity-50' : 'opacity-0'
          }`}
        ></div>
      </div>
    </Card>
  );
};

export default LoadingIndicator;
