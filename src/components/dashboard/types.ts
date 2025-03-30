
import { ReactNode } from 'react';
import { Download, ThumbsUp } from 'lucide-react';

export interface Widget {
  id: string;
  type: 'achievements' | 'videos' | 'documents' | 'activity' | 'stats';
  title: string;
  icon: ReactNode;
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
