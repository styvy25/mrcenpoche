
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
      className="prose prose-invert max-w-full p-6"
      style={{
        color: "#e2e8f0" // text-gray-200 equivalent
      }}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </motion.div>
  );
};

export default ModuleContentView;
