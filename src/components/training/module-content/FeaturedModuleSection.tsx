
import React from 'react';
import FeaturedModule from '@/components/training/FeaturedModule';
import { Award } from 'lucide-react';
import { Module } from '@/components/training/types';

interface FeaturedModuleSectionProps {
  featuredModule: Module;
  onClick: (module: Module) => void;
}

const FeaturedModuleSection: React.FC<FeaturedModuleSectionProps> = ({ 
  featuredModule, 
  onClick 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
        <Award className="w-5 h-5 mr-2 text-yellow-400" /> Module recommandé
      </h2>
      <FeaturedModule module={featuredModule} onClick={() => onClick(featuredModule)} />
    </div>
  );
};

export default FeaturedModuleSection;
