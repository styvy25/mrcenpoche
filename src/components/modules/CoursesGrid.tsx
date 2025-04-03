
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Clock, 
  Grid, 
  LayoutGrid, 
  List, 
  ListFilter, 
  Search, 
  Star, 
  Tag,
  Download,
  Play,
  Volume,
  RotateCcw,
  Menu,
  Layout,
  SquareStack
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Module } from './types';

// Icons mapping for replacing deprecated/missing icons
const iconMap = {
  Volume0: Volume,
  Stop: RotateCcw,
  Record: Play,
  LayoutColumns: LayoutGrid,
  LayoutRows: List,
  LayoutSections: Menu
};

interface CoursesGridProps {
  modules: Module[];
  onModuleClick: (module: Module) => void;
  showFilters?: boolean;
  initialView?: 'grid' | 'list';
  category?: string;
}

const CoursesGrid: React.FC<CoursesGridProps> = ({ 
  modules, 
  onModuleClick,
  showFilters = true,
  initialView = 'grid',
  category
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>(initialView);
  const [filterCategory, setFilterCategory] = useState<string | null>(category || null);
  
  // Filter modules based on search query and selected category
  const filteredModules = modules.filter(module => {
    const matchesSearch = !searchQuery || 
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filterCategory || module.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get unique categories for filter
  const categories = Array.from(new Set(modules.map(module => module.category)));
  
  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher des modules..."
              className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Tabs value={view} onValueChange={(v) => setView(v as 'grid' | 'list')}>
              <TabsList>
                <TabsTrigger value="grid" className="flex items-center gap-2">
                  <Grid className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Grille</span>
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only sm:inline-block">Liste</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button variant="outline" size="icon" title="Filtrer les modules">
              <ListFilter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      {categories.length > 0 && showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filterCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterCategory(null)}
            className="flex items-center gap-1"
          >
            <Tag className="h-3.5 w-3.5" />
            Tous
          </Button>
          
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filterCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterCategory(cat)}
              className="flex items-center gap-1"
            >
              <Tag className="h-3.5 w-3.5" />
              {cat}
            </Button>
          ))}
        </div>
      )}
      
      {filteredModules.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Search className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <h3 className="text-lg font-medium mb-1">Aucun module trouvé</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Essayez de modifier vos filtres ou votre recherche.
          </p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((module) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {module.duration}
                    </div>
                    {module.isNew && (
                      <Badge className="bg-blue-500">Nouveau</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold line-clamp-2 hover:text-primary cursor-pointer" onClick={() => onModuleClick(module)}>
                    {module.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="capitalize">
                      {module.category || module.categoryName}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs">{(3 + Math.random() * 2).toFixed(1)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {module.description}
                  </p>
                </CardContent>
                <CardFooter className="mt-auto pt-3 flex justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4" />
                    <span>
                      {module.lessons?.length || 0} leçons
                    </span>
                  </div>
                  {module.isPdfAvailable && (
                    <Button variant="ghost" size="icon" title="Télécharger PDF">
                      <Download className="h-4 w-4" onClick={() => module.pdfUrl && window.open(module.pdfUrl)} />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredModules.map((module) => (
            <motion.div 
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <div className="flex items-center p-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium hover:text-primary cursor-pointer" onClick={() => onModuleClick(module)}>
                        {module.title}
                      </h3>
                      {module.isNew && <Badge className="bg-blue-500">Nouveau</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {module.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {module.lessons?.length || 0} leçons
                      </div>
                      <Badge variant="outline" className="capitalize text-xs">
                        {module.category || module.categoryName}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => onModuleClick(module)}>
                    Voir
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoursesGrid;
