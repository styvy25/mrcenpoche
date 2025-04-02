
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';

interface ModuleContentViewProps {
  content?: string;
}

const ModuleContentView: React.FC<ModuleContentViewProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="p-8 text-center text-gray-400">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-medium">Aucun contenu disponible</h3>
          <p className="text-sm text-gray-500">Ce module n'a pas encore de contenu disponible.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="prose prose-invert max-w-full p-6 animate-reveal"
      style={{
        color: "#e2e8f0" // text-gray-200 equivalent
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
};

// Loading placeholder for ModuleContentView
export const ModuleContentViewSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="py-2"></div>
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
};

export default React.memo(ModuleContentView);
