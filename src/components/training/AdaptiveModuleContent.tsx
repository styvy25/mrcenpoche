
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ActiveModuleView from '@/components/training/ActiveModuleView';
import { Module } from '@/components/training/types';
import LoadingState from './module-content/LoadingState';
import CategoryButtons from './module-content/CategoryButtons';
import ModulesList from './module-content/ModulesList';
import FeaturedModuleSection from './module-content/FeaturedModuleSection';
import { useModuleData } from './hooks/useModuleData';

const AdaptiveModuleContent: React.FC = () => {
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  
  const { 
    loading, 
    modules, 
    categories, 
    featuredModule, 
    selectedCategory, 
    setSelectedCategory 
  } = useModuleData();
  
  const handleModuleClick = (module: Module) => {
    if (module.locked) {
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

  const handleResetCategory = () => {
    setSelectedCategory('all');
  };
  
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
            <FeaturedModuleSection 
              featuredModule={featuredModule} 
              onClick={handleModuleClick} 
            />
          )}
          
          <CategoryButtons
            selectedCategory={selectedCategory}
            categories={categories}
            onCategorySelect={setSelectedCategory}
          />
          
          <ModulesList 
            modules={modules}
            onModuleClick={handleModuleClick}
            onResetCategory={handleResetCategory}
          />
        </>
      )}
    </div>
  );
};

export default AdaptiveModuleContent;
