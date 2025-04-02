
import React, { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import ActiveModuleView from '@/components/training/ActiveModuleView';
import { Module } from '@/components/training/types';
import LoadingState from './module-content/LoadingState';
import CategoryButtons from './module-content/CategoryButtons';
import ModulesList from './module-content/ModulesList';
import FeaturedModuleSection from './module-content/FeaturedModuleSection';
import { useModuleData } from './hooks/useModuleData';
import { motion } from 'framer-motion';
import PageTransitionWrapper from '@/components/ui/page-transition-wrapper';

const AdaptiveModuleContent: React.FC = () => {
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { 
    loading, 
    modules, 
    categories, 
    featuredModule, 
    selectedCategory, 
    setSelectedCategory 
  } = useModuleData();
  
  // Prevent multiple rapid clicks
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);
  
  const handleModuleClick = useCallback((module: Module) => {
    if (isTransitioning) return;
    
    if (module.locked) {
      toast({
        title: "Module Premium",
        description: "Passez à l'abonnement Premium pour accéder à ce module.",
        variant: "default"
      });
      return;
    }
    
    setIsTransitioning(true);
    // Slight delay to allow for animation
    setTimeout(() => {
      setActiveModule(module);
      setIsTransitioning(false);
    }, 200);
  }, [toast, isTransitioning]);
  
  const handleBackToModules = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    // Slight delay to allow for animation
    setTimeout(() => {
      setActiveModule(null);
      setIsTransitioning(false);
    }, 200);
  }, [isTransitioning]);

  const handleResetCategory = useCallback(() => {
    setSelectedCategory('all');
  }, [setSelectedCategory]);
  
  // If a module is active, display that instead
  if (activeModule) {
    return (
      <PageTransitionWrapper>
        <ActiveModuleView module={activeModule} onBack={handleBackToModules} />
      </PageTransitionWrapper>
    );
  }
  
  return (
    <PageTransitionWrapper>
      <div className="p-6">
        {loading ? (
          <LoadingState />
        ) : (
          <>
            {featuredModule && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <FeaturedModuleSection 
                  featuredModule={featuredModule} 
                  onClick={handleModuleClick} 
                />
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <CategoryButtons
                selectedCategory={selectedCategory}
                categories={categories}
                onCategorySelect={setSelectedCategory}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <ModulesList 
                modules={modules}
                onModuleClick={handleModuleClick}
                onResetCategory={handleResetCategory}
              />
            </motion.div>
          </>
        )}
      </div>
    </PageTransitionWrapper>
  );
};

export default React.memo(AdaptiveModuleContent);
