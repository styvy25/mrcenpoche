
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface Widget {
  id: string;
  type: 'achievements' | 'videos' | 'documents' | 'activity' | 'stats';
  title: string;
  icon: LucideIcon;
  height: 'sm' | 'md' | 'lg';
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: BadgeIcon;
  date: Date;
  category: string;
}

export interface BadgeIcon {
  icon: LucideIcon;
  className?: string;
}
