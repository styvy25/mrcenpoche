
import { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface MenuCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  color: 'purple' | 'green' | 'yellow' | 'pink' | 'blue' | 'orange' | 'red' | 'teal' | 'cyan' | 'gold';
  onClick?: () => void;
  className?: string;
}

const colorMap = {
  purple: {
    bg: 'bg-palette-purple-400',
    light: 'bg-palette-purple-100/50',
  },
  green: {
    bg: 'bg-palette-green-400',
    light: 'bg-palette-green-100/50',
  },
  yellow: {
    bg: 'bg-palette-gold-400',
    light: 'bg-palette-gold-100/50',
  },
  pink: {
    bg: 'bg-palette-pink-400',
    light: 'bg-palette-pink-100/50',
  },
  blue: {
    bg: 'bg-palette-royalblue-400',
    light: 'bg-palette-royalblue-100/50',
  },
  orange: {
    bg: 'bg-palette-orange-400',
    light: 'bg-palette-orange-100/50',
  },
  red: {
    bg: 'bg-palette-red-400',
    light: 'bg-palette-red-100/50',
  },
  teal: {
    bg: 'bg-palette-teal-400',
    light: 'bg-palette-teal-100/50',
  },
  cyan: {
    bg: 'bg-palette-cyan-400',
    light: 'bg-palette-cyan-100/50',
  },
  gold: {
    bg: 'bg-palette-gold-400',
    light: 'bg-palette-gold-100/50',
  },
};

export function MenuCard({ title, value, subtitle, icon, color, onClick, className }: MenuCardProps) {
  const colorStyles = colorMap[color] || colorMap.blue;
  
  return (
    <div 
      className={cn(
        `${colorStyles.bg} relative rounded-xl p-4 text-white cursor-pointer shadow-md 
         transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`,
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col mb-6">
          <div className="flex items-center text-lg font-medium mb-2">
            <span className="mr-2">{icon}</span>
            {title}
          </div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-sm opacity-80">{subtitle}</div>
        </div>
        <div className="p-2 bg-white/20 rounded-full">
          <ArrowRight size={16} />
        </div>
      </div>
      
      {/* Abstract shapes in the background */}
      <div className={`absolute bottom-0 right-0 w-16 h-16 rounded-full ${colorStyles.light} opacity-40 -mr-4 -mb-4`}></div>
      <div className={`absolute top-10 right-10 w-8 h-8 rounded-full ${colorStyles.light} opacity-30`}></div>
    </div>
  );
}
