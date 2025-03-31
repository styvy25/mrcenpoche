
import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
}

const NotificationBadge = ({ count, max = 99, className }: NotificationBadgeProps) => {
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return count > 0 ? (
    <span 
      className={cn(
        "absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full text-[10px] font-bold text-white bg-red-500",
        className
      )}
    >
      {displayCount}
    </span>
  ) : null;
};

export default NotificationBadge;
