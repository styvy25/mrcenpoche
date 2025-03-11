
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CourseCategory } from "@/services/courseService";

interface CourseCategoryFilterProps {
  categories: CourseCategory[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CourseCategoryFilter: React.FC<CourseCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory
}) => {
  return (
    <div className="mb-6">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-1">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onSelectCategory(null)}
            className="rounded-full"
          >
            Tous
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectCategory(category.id)}
              className="rounded-full"
            >
              {category.name} 
              <span className="ml-1 text-xs">({category.count})</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CourseCategoryFilter;
