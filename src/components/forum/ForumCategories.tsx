
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Plus } from 'lucide-react';
import { ForumCategory } from './Forum';

interface ForumCategoriesProps {
  categories: ForumCategory[];
  onCategorySelect: (categoryId: string) => void;
}

const ForumCategories: React.FC<ForumCategoriesProps> = ({ categories, onCategorySelect }) => {
  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'green': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'red': return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Catégories de discussion</h2>
        <Button variant="outline" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className="transition-all hover:shadow-md cursor-pointer border-l-4"
            style={{ borderLeftColor: category.color === 'blue' ? '#3b82f6' : 
                                     category.color === 'green' ? '#10b981' : 
                                     category.color === 'red' ? '#ef4444' : 
                                     category.color === 'purple' ? '#8b5cf6' : 
                                     category.color === 'orange' ? '#f97316' : 
                                     category.color === 'yellow' ? '#f59e0b' : '#9ca3af' }}
            onClick={() => onCategorySelect(category.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{category.icon}</span>
                  <CardTitle>{category.name}</CardTitle>
                </div>
                <Badge className={getCategoryColor(category.color)}>
                  {category.topicsCount} {category.topicsCount > 1 ? 'sujets' : 'sujet'}
                </Badge>
              </div>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 flex justify-end">
              <Button variant="ghost" size="sm" className="gap-1">
                Voir les sujets
                <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ForumCategories;
