
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg animate-scale-in">
      <div className="relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-mrc-blue">
            {currentCategory.name}
          </h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleCategorySelection}
            className="text-sm"
          >
            Changer de catégorie
          </Button>
        </div>

        {isCategorySelectionOpen && (
          <div className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-full mt-2 border border-gray-200 animate-fade-in">
            <h3 className="font-semibold mb-2 text-gray-700">Catégories de quiz</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
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
        )}

        <div className="text-center p-4 mb-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <p className="text-gray-700 mb-2">
            Ce quiz contient <span className="font-bold">{currentCategory.questions.length}</span> questions.
          </p>
          {isTestCategory && (
            <div className="mt-2 flex items-center justify-center gap-2 text-sm bg-purple-100 p-2 rounded-md">
              <Smartphone size={16} />
              <p className="text-purple-800">Épreuve test officielle</p>
            </div>
          )}
        </div>

        <Button 
          onClick={onStartQuiz} 
          className="w-full py-3 bg-mrc-blue hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
        >
          <Play className="h-5 w-5 group-hover:animate-pulse" />
          Commencer le Quiz
        </Button>
        
        <div className="mt-4 flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={currentCategoryIndex === 0}
            onClick={onPreviousCategory}
            className="text-gray-500 flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            variant="ghost"
            disabled={currentCategoryIndex === categoriesLength - 1}
            onClick={onNextCategory}
            className="text-gray-500 flex items-center gap-1"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizWelcomeScreen;
