
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Smartphone } from "lucide-react";
import { Category } from "../types";
import { useMediaQuery } from "@/hooks/use-media-query";

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
  const { isMobile } = useMediaQuery("(max-width: 640px)");

  return (
    <div className="max-w-md mx-auto bg-white p-3 sm:p-6 rounded-xl shadow-lg animate-scale-in">
      <div className="relative">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold text-mrc-blue">
            {currentCategory.name}
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleCategorySelection}
            className="text-xs px-2 py-1 sm:text-sm sm:px-3 sm:py-1.5"
          >
            Changer
          </Button>
        </div>

        {isCategorySelectionOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow-lg p-2 sm:p-3 w-full mt-1 border border-gray-200 animate-fade-in">
            <h3 className="font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm text-gray-700">Catégories</h3>
            <div className="space-y-0.5 sm:space-y-1 max-h-36 sm:max-h-48 overflow-y-auto">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(index);
                    onToggleCategorySelection();
                  }}
                  className={`p-1.5 sm:p-2 rounded-md cursor-pointer transition-all ${
                    currentCategoryIndex === index 
                      ? 'bg-blue-100 text-mrc-blue font-medium' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${category.color || 'bg-gray-400'}`}></span>
                    <span className="text-[10px] sm:text-sm truncate">{category.name}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500 ml-auto">
                      {category.questions?.length || 0} q.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center p-2 sm:p-3 mb-3 sm:mb-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <p className="text-xs sm:text-sm text-gray-700 mb-1">
            Ce quiz contient <span className="font-bold">{currentCategory.questions.length}</span> questions.
          </p>
          {isTestCategory && (
            <div className="mt-1 flex items-center justify-center gap-1 text-[10px] sm:text-xs bg-purple-100 p-1.5 rounded-md">
              <Smartphone size={12} className="sm:h-3.5 sm:w-3.5" />
              <p className="text-purple-800">Épreuve test officielle</p>
            </div>
          )}
        </div>

        <Button 
          onClick={onStartQuiz} 
          className="w-full py-1.5 sm:py-2 bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-1 group text-xs sm:text-sm"
        >
          <Play className="h-3 w-3 sm:h-4 sm:w-4 group-hover:animate-pulse" />
          Commencer le Quiz
        </Button>
        
        <div className="mt-2 sm:mt-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            disabled={currentCategoryIndex === 0}
            onClick={onPreviousCategory}
            className="text-gray-500 flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs"
          >
            <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            Préc.
          </Button>
          <Button
            variant="ghost"
            size="sm"
            disabled={currentCategoryIndex === categoriesLength - 1}
            onClick={onNextCategory}
            className="text-gray-500 flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs"
          >
            Suiv.
            <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizWelcomeScreen;
