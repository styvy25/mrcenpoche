
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface LessonEmptyStateProps {
  title: string;
  content: string;
}

const LessonEmptyState: React.FC<LessonEmptyStateProps> = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
      <h3 className="text-xl font-medium text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{content}</p>
    </div>
  );
};

export default LessonEmptyState;
