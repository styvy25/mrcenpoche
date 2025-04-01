
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSubscription } from '@/hooks/useSubscription';
import ModuleCard from '@/components/training/ModuleCard';
import FeaturedModule from '@/components/training/FeaturedModule';
import AdaptiveModuleService from '@/services/adaptiveModuleService';
import { usePoints } from '@/hooks/usePoints';
import { Shield, Award, Flag, FlagTriangleLeft, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import ActiveModuleView from '@/components/training/ActiveModuleView';
import { Module, ModuleCategory } from '@/components/training/types';

const AdaptiveModuleContent: React.FC = () => {
  const { toast } = useToast();
  const { isPremium } = useSubscription();
  const { level } = usePoints();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<ModuleCategory[]>([]);
  const [featuredModule, setFeaturedModule] = useState<Module | null>(null);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  useEffect(() => {
    const loadModules = async () => {
      try {
        setLoading(true);
        const moduleData = await AdaptiveModuleService.getModules(level, isPremium);
        const moduleCategories = await AdaptiveModuleService.getCategories();
        
        setModules(moduleData.modules);
        setCategories(moduleCategories);
        setFeaturedModule(moduleData.featuredModule);
      } catch (error) {
        console.error("Error loading modules:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les modules de formation.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadModules();
  }, [level, isPremium, toast]);
  
  const handleModuleClick = (module: Module) => {
    if (module.locked && !isPremium) {
      toast({
        title: "Module Premium",
        description: "Passez à l'abonnement Premium pour accéder à ce module.",
        variant: "default"
      });
      return;
    }
    
    setActiveModule(module);
  };
  
  const handleBackToModules = () => {
    setActiveModule(null);
  };
  
  const getCategoryIcon = (category: string) => {
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
  
  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);
  
  // If a module is active, display that instead
  if (activeModule) {
    return <ActiveModuleView module={activeModule} onBack={handleBackToModules} />;
  }
  
  return (
    <div className="p-6">
      {loading ? (
        <LoadingState />
      ) : (
        <>
          {featuredModule && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-300">
                <Award className="w-5 h-5 mr-2 text-yellow-400" /> Module recommandé
              </h2>
              <FeaturedModule module={featuredModule} onClick={() => handleModuleClick(featuredModule)} />
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              <CategoryButton 
                isActive={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
              >
                <Star className="w-4 h-4 mr-1" /> Tous
              </CategoryButton>
              
              {categories.map((category) => (
                <CategoryButton 
                  key={category.id}
                  isActive={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  color={category.color}
                >
                  {getCategoryIcon(category.id)}
                  <span className="ml-1">{category.name}</span>
                </CategoryButton>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-300">Modules de formation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="wait">
                {filteredModules.map((module) => (
                  <ModuleCard 
                    key={module.id}
                    module={module}
                    onClick={() => handleModuleClick(module)}
                  />
                ))}
                
                {filteredModules.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-full flex flex-col items-center justify-center p-8 rounded-lg bg-gray-800/50 text-center"
                  >
                    <p className="text-gray-400 mb-4">Aucun module trouvé dans cette catégorie.</p>
                    <Button variant="outline" onClick={() => setSelectedCategory('all')}>
                      Voir tous les modules
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      )}
    </div>
  );
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

const LoadingState: React.FC = () => {
  return (
    <div>
      <div className="mb-8">
        <Skeleton className="h-4 w-32 mb-4 bg-gray-800" />
        <Skeleton className="h-48 w-full rounded-xl bg-gray-800" />
      </div>
      
      <div className="mb-6">
        <Skeleton className="h-4 w-24 mb-4 bg-gray-800" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-8 w-20 rounded-full bg-gray-800" />
          ))}
        </div>
      </div>
      
      <div>
        <Skeleton className="h-4 w-40 mb-4 bg-gray-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-xl bg-gray-800" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdaptiveModuleContent;
