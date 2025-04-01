
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NoModulesFoundProps {
  onResetCategory: () => void;
}

const NoModulesFound: React.FC<NoModulesFoundProps> = ({ onResetCategory }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="col-span-full flex flex-col items-center justify-center p-8 rounded-lg bg-gray-800/50 text-center"
    >
      <p className="text-gray-400 mb-4">Aucun module trouvé dans cette catégorie.</p>
      <Button variant="outline" onClick={onResetCategory}>
        Voir tous les modules
      </Button>
    </motion.div>
  );
};

export default NoModulesFound;
