
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Award, Flag, FlagTriangleLeft, Star, Users } from 'lucide-react';
import { ModuleCategory } from '@/components/training/types';

interface CategoryButtonsProps {
  selectedCategory: string;
  categories: ModuleCategory[];
  onCategorySelect: (id: string) => void;
}

export const getCategoryIcon = (category: string) => {
  switch(category) {
    case 'history':
      return <FlagTriangleLeft className="w-4 h-4" />;
    case 'strategy':
      return <Shield className="w-4 h-4" />;
    case 'leadership':
      return <Flag className="w-4 h-4" />;
    case 'organizing':
      return <Users className="w-4 h-4" />;
    default:
      return <Star className="w-4 h-4" />;
  }
};

const CategoryButton: React.FC<{
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}> = ({ children, isActive, onClick, color = "bg-blue-500" }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1.5 text-sm rounded-full transition-all ${
        isActive
          ? 'bg-gradient-to-r from-green-600 via-yellow-600 to-red-600 text-white'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  );
};

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ 
  selectedCategory, 
  categories, 
  onCategorySelect 
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">Catégories</h2>
      <div className="flex flex-wrap gap-2">
        <CategoryButton 
          isActive={selectedCategory === 'all'}
          onClick={() => onCategorySelect('all')}
        >
          <Star className="w-4 h-4 mr-1" /> Tous
        </CategoryButton>
        
        {categories.map((category) => (
          <CategoryButton 
            key={category.id}
            isActive={selectedCategory === category.id}
            onClick={() => onCategorySelect(category.id)}
            color={category.color}
          >
            {getCategoryIcon(category.id)}
            <span className="ml-1">{category.name}</span>
          </CategoryButton>
        ))}
      </div>
    </div>
  );
};

export default CategoryButtons;
