
import React from "react";
import { Category } from "../types";

interface CategorySelectionDropdownProps {
  isOpen: boolean;
  categories: Category[];
  currentCategoryIndex: number;
  onCategoryChange: (index: number) => void;
  onClose: () => void;
}

const CategorySelectionDropdown: React.FC<CategorySelectionDropdownProps> = ({
  isOpen,
  categories,
  currentCategoryIndex,
  onCategoryChange,
  onClose,
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-full mt-2 border border-gray-200 animate-fade-in">
      <h3 className="font-semibold mb-2 text-gray-700">Catégories de quiz</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {categories.map((category, index) => (
          <div 
            key={category.id}
            onClick={() => {
              onCategoryChange(index);
              onClose();
            }}
            className={`p-2 rounded-md cursor-pointer transition-all ${
              currentCategoryIndex === index 
                ? 'bg-blue-100 text-mrc-blue font-medium' 
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${category.color || 'bg-gray-400'}`}></span>
              <span>{category.name}</span>
              <span className="text-xs text-gray-500 ml-auto">
                {category.questions?.length || 0} questions
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelectionDropdown;
