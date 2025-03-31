
import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationBadgeProps {
  count: number;
  className?: string;
  variant?: 'default' | 'small';
  max?: number;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count,
  className,
  variant = 'default',
  max = 99
}) => {
  if (count <= 0) return null;
  
  const displayCount = count > max ? `${max}+` : count.toString();
  
  return (
    <div
      className={cn(
        'absolute -top-1 -right-1 flex items-center justify-center bg-red-500 text-white font-medium rounded-full',
        variant === 'default' ? 'min-w-[1.25rem] h-[1.25rem] text-xs' : 'min-w-[1rem] h-[1rem] text-[0.625rem]',
        className
      )}
    >
      {displayCount}
    </div>
  );
};

export default NotificationBadge;
