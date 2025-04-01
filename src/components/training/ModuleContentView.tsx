
import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface ModuleContentViewProps {
  content?: string;
}

const ModuleContentView: React.FC<ModuleContentViewProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="p-8 text-center text-gray-400">
        Aucun contenu disponible pour ce module.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="prose prose-invert max-w-full prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-300 prose-li:text-gray-300"
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
};

export default ModuleContentView;
