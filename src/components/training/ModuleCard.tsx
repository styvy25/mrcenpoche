
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Star, CheckCircle, CircleCheck, Circle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Module } from '@/components/training/types';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  onClick: () => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, onClick }) => {
  // Helper function to get gradient based on module difficulty
  const getDifficultyGradient = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'from-green-600 to-green-400';
      case 'intermediate':
        return 'from-yellow-600 to-yellow-400';
      case 'advanced':
        return 'from-red-600 to-red-400';
      default:
        return 'from-blue-600 to-blue-400';
    }
  };
  
  // Helper function to get badge for module type
  const getModuleTypeInfo = (moduleType: string) => {
    switch (moduleType) {
      case 'core':
        return { label: 'Base', className: 'bg-blue-600' };
      case 'advanced':
        return { label: 'Avancé', className: 'bg-purple-600' };
      case 'special':
        return { label: 'Spécial', className: 'bg-amber-600' };
      case 'exam':
        return { label: 'Examen', className: 'bg-red-600' };
      default:
        return { label: 'Formation', className: 'bg-gray-600' };
    }
  };
  
  const typeInfo = getModuleTypeInfo(module.type);
  const difficultyGradient = getDifficultyGradient(module.difficulty);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
      }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        "relative bg-gray-800 rounded-xl overflow-hidden cursor-pointer border border-gray-700 shadow-lg h-full",
        module.completed && "border-green-500/30",
        module.locked && "opacity-80"
      )}
    >
      <div 
        className="h-32 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${module.image || ''})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        
        <div className="absolute top-2 left-2 flex flex-wrap gap-2">
          <Badge className={cn("text-xs", typeInfo.className)}>
            {typeInfo.label}
          </Badge>
          
          <Badge className={cn("text-xs bg-gradient-to-r", difficultyGradient)}>
            {module.difficulty === 'beginner' ? 'Débutant' : 
             module.difficulty === 'intermediate' ? 'Intermédiaire' : 'Avancé'}
          </Badge>
        </div>
        
        {module.isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500 text-xs">
            Nouveau
          </Badge>
        )}
        
        {module.locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <Lock className="w-10 h-10 text-white opacity-80" />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{module.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{module.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{module.duration}</span>
          </div>
          
          <div className="flex items-center">
            {module.rating && (
              <>
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
                <span>{module.rating}</span>
              </>
            )}
            
            {module.progress > 0 && (
              <div className="ml-2 w-8 h-8 relative">
                <Circle className="w-8 h-8 text-gray-700" />
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: module.progress === 100 ? "#10B981" : "#60A5FA" }}
                >
                  {module.progress === 100 ? (
                    <CheckCircle className="w-8 h-8" />
                  ) : (
                    <span className="text-xs font-medium">{module.progress}%</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleCard;
