
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Smartphone } from "lucide-react";
import { Category } from "../types";

interface QuizWelcomeScreenProps {
  currentCategory: Category;
  isTestCategory: boolean;
  onStartQuiz: () => void;
  onPreviousCategory: () => void;
  onNextCategory: () => void;
  currentCategoryIndex: number;
  categoriesLength: number;
  isCategorySelectionOpen: boolean;
  onToggleCategorySelection: () => void;
  categories: Category[];
  onCategoryChange: (index: number) => void;
}

const QuizWelcomeScreen: React.FC<QuizWelcomeScreenProps> = ({
  currentCategory,
  isTestCategory,
  onStartQuiz,
  onPreviousCategory,
  onNextCategory,
  currentCategoryIndex,
  categoriesLength,
  isCategorySelectionOpen,
  onToggleCategorySelection,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white p-4 sm:p-6 rounded-xl shadow-lg animate-scale-in">
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-mrc-blue">
            {currentCategory.name}
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleCategorySelection}
            className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5"
          >
            Changer
          </Button>
        </div>

        {isCategorySelectionOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow-lg p-3 w-full mt-1 border border-gray-200 animate-fade-in">
            <h3 className="font-semibold mb-2 text-sm text-gray-700">Catégories</h3>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(index);
                    onToggleCategorySelection();
                  }}
                  className={`p-2 rounded-md cursor-pointer transition-all ${
                    currentCategoryIndex === index 
                      ? 'bg-blue-100 text-mrc-blue font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${category.color || 'bg-gray-400'}`}></span>
                    <span className="text-xs sm:text-sm truncate">{category.name}</span>
                    <span className="text-[10px] text-gray-500 ml-auto">
                      {category.questions?.length || 0} q.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center p-3 mb-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <p className="text-sm text-gray-700 mb-1">
            Ce quiz contient <span className="font-bold">{currentCategory.questions.length}</span> questions.
          </p>
          {isTestCategory && (
            <div className="mt-1 flex items-center justify-center gap-1 text-xs bg-purple-100 p-1.5 rounded-md">
              <Smartphone size={14} />
              <p className="text-purple-800">Épreuve test officielle</p>
            </div>
          )}
        </div>

        <Button 
          onClick={onStartQuiz} 
          className="w-full py-2 bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 group text-sm sm:text-base"
        >
          <Play className="h-4 w-4 group-hover:animate-pulse" />
          Commencer le Quiz
        </Button>
        
        <div className="mt-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentCategoryIndex === 0}
            onClick={onPreviousCategory}
            className="text-gray-500 flex items-center gap-1 text-xs"
          >
            <ChevronLeft className="h-3 w-3" />
            Préc.
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentCategoryIndex === categoriesLength - 1}
            onClick={onNextCategory}
            className="text-gray-500 flex items-center gap-1 text-xs"
          >
            Suiv.
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizWelcomeScreen;
