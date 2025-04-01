
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ModuleCard from '@/components/training/ModuleCard';
import NoModulesFound from './NoModulesFound';
import { Module } from '@/components/training/types';

interface ModulesListProps {
  modules: Module[];
  onModuleClick: (module: Module) => void;
  onResetCategory: () => void;
}

const ModulesList: React.FC<ModulesListProps> = ({ 
  modules, 
  onModuleClick,
  onResetCategory
}) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">Modules de formation</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="wait">
          {modules.map((module) => (
            <ModuleCard 
              key={module.id}
              module={module}
              onClick={() => onModuleClick(module)}
            />
          ))}
          
          {modules.length === 0 && (
            <NoModulesFound onResetCategory={onResetCategory} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModulesList;
