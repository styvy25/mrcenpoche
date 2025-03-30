
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Module {
  id: number;
  title: string;
  category: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  completed: boolean;
  description: string;
  lessons: any[];
}

interface ModuleCategoryTabsProps {
  modules: Module[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const ModuleCategoryTabs: React.FC<ModuleCategoryTabsProps> = ({
  modules,
  activeCategory,
  setActiveCategory
}) => {
  // Get unique categories from modules
  const categories = Array.from(new Set(modules.map(module => module.category)));
  
  // Map between English and French level names if needed
  const getLocalizedLevel = (level: string): 'Débutant' | 'Intermédiaire' | 'Avancé' => {
    if (level === 'beginner') return 'Débutant';
    if (level === 'intermediate') return 'Intermédiaire';
    if (level === 'advanced') return 'Avancé';
    return level as 'Débutant' | 'Intermédiaire' | 'Avancé';
  };
  
  // Count modules by level in active category
  const levelCounts = modules
    .filter(module => module.category === activeCategory)
    .reduce((acc: Record<string, number>, module) => {
      const level = getLocalizedLevel(module.level as any);
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});
    
  // Count completed modules by level in active category
  const completedCounts = modules
    .filter(module => module.category === activeCategory && module.completed)
    .reduce((acc: Record<string, number>, module) => {
      const level = getLocalizedLevel(module.level as any);
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className="space-y-4">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "whitespace-nowrap rounded-full",
              activeCategory === category 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "text-gray-600 dark:text-gray-300"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {['Débutant', 'Intermédiaire', 'Avancé'].map(level => (
          <Card key={level} className="border border-gray-200 dark:border-gray-800">
            <CardContent className="p-3">
              <div className="text-sm font-medium">{level}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {completedCounts[level] || 0}/{levelCounts[level] || 0} modules
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModuleCategoryTabs;
