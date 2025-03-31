
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
  icon: ReactNode;
  date: Date;
  category: string;
}

export interface BadgeIcon {
  icon: LucideIcon;
  className?: string;
}

export interface WidgetProps {
  widget: Widget;
  onRemove: (id: string) => void;
}
