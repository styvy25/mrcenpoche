
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
  index?: number;  // pour l'animation
}

const colorMap = {
  purple: {
    bg: 'bg-gradient-to-br from-palette-purple-500 to-palette-purple-700',
    light: 'bg-palette-purple-100/50',
    iconBg: 'bg-palette-purple-400/30',
  },
  green: {
    bg: 'bg-gradient-to-br from-palette-green-500 to-palette-green-700',
    light: 'bg-palette-green-100/50',
    iconBg: 'bg-palette-green-400/30',
  },
  yellow: {
    bg: 'bg-gradient-to-br from-palette-gold-500 to-palette-gold-700',
    light: 'bg-palette-gold-100/50',
    iconBg: 'bg-palette-gold-400/30',
  },
  pink: {
    bg: 'bg-gradient-to-br from-palette-pink-500 to-palette-pink-700',
    light: 'bg-palette-pink-100/50',
    iconBg: 'bg-palette-pink-400/30',
  },
  blue: {
    bg: 'bg-gradient-to-br from-palette-royalblue-500 to-palette-royalblue-700',
    light: 'bg-palette-royalblue-100/50',
    iconBg: 'bg-palette-royalblue-400/30',
  },
  orange: {
    bg: 'bg-gradient-to-br from-palette-orange-500 to-palette-orange-700',
    light: 'bg-palette-orange-100/50',
    iconBg: 'bg-palette-orange-400/30',
  },
  red: {
    bg: 'bg-gradient-to-br from-palette-red-500 to-palette-red-700',
    light: 'bg-palette-red-100/50',
    iconBg: 'bg-palette-red-400/30',
  },
  teal: {
    bg: 'bg-gradient-to-br from-palette-teal-500 to-palette-teal-700',
    light: 'bg-palette-teal-100/50',
    iconBg: 'bg-palette-teal-400/30',
  },
  cyan: {
    bg: 'bg-gradient-to-br from-palette-cyan-500 to-palette-cyan-700',
    light: 'bg-palette-cyan-100/50',
    iconBg: 'bg-palette-cyan-400/30',
  },
  gold: {
    bg: 'bg-gradient-to-br from-palette-gold-500 to-palette-gold-700',
    light: 'bg-palette-gold-100/50',
    iconBg: 'bg-palette-gold-400/30',
  },
};

export function MenuCard({ title, value, subtitle, icon, color, onClick, className, index = 0 }: MenuCardProps) {
  const colorStyles = colorMap[color] || colorMap.blue;
  const animationDelay = `delay-${(index + 1) * 100}`;
  
  return (
    <div 
      className={cn(
        `${colorStyles.bg} menu-card text-white cursor-pointer opacity-0 animate-fade-in-up ${animationDelay}`,
        className
      )}
      onClick={onClick}
    >
      <div className="relative p-5 z-10">
        <div className="flex justify-between items-start mb-4">
          <div className={`menu-icon ${colorStyles.iconBg}`}>
            {icon}
          </div>
          <div className="p-2 bg-white/20 rounded-full">
            <ArrowRight size={16} />
          </div>
        </div>
        
        <div className="menu-value">{value}</div>
        <div className="menu-title">{title}</div>
        <div className="menu-subtitle">{subtitle}</div>
      </div>
      
      {/* Abstract shapes in the background */}
      <div className="menu-bubble menu-bubble-1" style={{ background: `url('/lovable-uploads/bubble-${color}.svg')` }}></div>
      <div className="menu-bubble menu-bubble-2" style={{ background: `url('/lovable-uploads/bubble-small-${color}.svg')` }}></div>
      
      <div className="menu-gradient-overlay"></div>
    </div>
  );
}
