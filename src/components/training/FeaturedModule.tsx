
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, Clock, Star, ShieldCheck, Users, FlagTriangleLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Module } from '@/components/training/types';

interface FeaturedModuleProps {
  module: Module;
  onClick: () => void;
}

const FeaturedModule: React.FC<FeaturedModuleProps> = ({ module, onClick }) => {
  // Get appropriate icon based on module category
  const getCategoryIcon = () => {
    switch(module.category) {
      case 'history':
        return <FlagTriangleLeft className="w-5 h-5 text-red-400" />;
      case 'organizing':
        return <Users className="w-5 h-5 text-blue-400" />;
      case 'leadership':
        return <Award className="w-5 h-5 text-purple-400" />;
      case 'strategy':
        return <ShieldCheck className="w-5 h-5 text-green-400" />;
      default:
        return <Star className="w-5 h-5 text-yellow-400" />;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-xl"
    >
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-red-500/10 opacity-30"></div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-800/80 to-transparent"></div>
      </div>
      
      <div className="relative p-6 md:p-8 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            {getCategoryIcon()}
            <Badge className="bg-gray-700 text-gray-200">
              {module.categoryName || 'Formation'}
            </Badge>
            {module.isNew && <Badge className="bg-green-600">Nouveau</Badge>}
          </div>
          
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {module.title}
          </h2>
          
          <p className="text-gray-400 mb-4">
            {module.description}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-gray-500 mr-1.5" />
              <span className="text-sm text-gray-300">{module.duration}</span>
            </div>
            
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1.5" />
              <span className="text-sm text-gray-300">{module.rating}/5</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-2">
            <Button 
              onClick={onClick}
              className="bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-white hover:opacity-90 transition-opacity"
            >
              Commencer
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="hidden md:block w-1/3 relative">
          {module.image && (
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-lg overflow-hidden"
              style={{ backgroundImage: `url(${module.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedModule;
