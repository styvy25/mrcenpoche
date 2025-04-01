
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useSubscription } from '@/hooks/useSubscription';
import { Module, ModuleCategory } from '@/components/training/types';
import * as AdaptiveModuleService from '@/services/adaptiveModuleService';
import { usePoints } from '@/hooks/usePoints';

export const useModuleData = () => {
  const { toast } = useToast();
  const { isPremium } = useSubscription();
  const { level } = usePoints();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [categories, setCategories] = useState<ModuleCategory[]>([]);
  const [featuredModule, setFeaturedModule] = useState<Module | null>(null);
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

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(m => m.category === selectedCategory);

  return {
    loading,
    modules: filteredModules,
    categories,
    featuredModule,
    selectedCategory,
    setSelectedCategory
  };
};
