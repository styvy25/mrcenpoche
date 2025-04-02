
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BookOpen } from 'lucide-react';
import LoadingState from './module-view/LoadingState';

interface ModuleContentViewProps {
  content?: string;
  isLoading?: boolean;
}

const ModuleContentView: React.FC<ModuleContentViewProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!content) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 text-center bg-gray-800/30 rounded-lg"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800/70 flex items-center justify-center">
            <BookOpen className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-300">Aucun contenu disponible</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Ce module n'a pas encore de contenu disponible. Veuillez choisir un autre module ou revenir ultérieurement.
          </p>
        </div>
      </motion.div>
    );
  }

  if (typeof content !== 'string' || content.trim() === '') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 text-center bg-gray-800/30 rounded-lg"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-800/70 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-amber-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-300">Erreur de chargement du contenu</h3>
          <p className="text-sm text-gray-400 max-w-md">
            Le contenu de ce module n'a pas pu être chargé correctement. Veuillez réessayer ou contacter l'assistance.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="prose prose-invert max-w-full p-6"
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold mb-4 text-white"
            >
              {children}
            </motion.h1>
          ),
          h2: ({ children }) => (
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xl font-semibold mt-6 mb-3 text-blue-300"
            >
              {children}
            </motion.h2>
          ),
          p: ({ children }) => (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mb-4 text-gray-200"
            >
              {children}
            </motion.p>
          ),
          ul: ({ children }) => (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="list-disc pl-6 mb-4 space-y-1 text-gray-200"
            >
              {children}
            </motion.ul>
          ),
          ol: ({ children }) => (
            <motion.ol
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="list-decimal pl-6 mb-4 space-y-1 text-gray-200"
            >
              {children}
            </motion.ol>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
};

// Loading placeholder for ModuleContentView
export const ModuleContentViewSkeleton = () => {
  return <LoadingState />;
};

export default React.memo(ModuleContentView);
