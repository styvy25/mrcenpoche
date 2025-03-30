
import { ReactNode } from 'react';

export interface Widget {
  id: string;
  type: 'achievements' | 'videos' | 'documents' | 'activity' | 'stats';
  title: string;
  icon: ReactNode;
  height: 'sm' | 'md' | 'lg';
}
