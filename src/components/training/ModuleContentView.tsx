
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, BookOpen } from 'lucide-react';

interface ModuleContentViewProps {
  content?: string;
  isLoading?: boolean;
}

const ModuleContentView: React.FC<ModuleContentViewProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return <ModuleContentViewSkeleton />;
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
