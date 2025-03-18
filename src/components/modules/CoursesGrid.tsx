
import React, { useState } from 'react';
import CourseList from "./course/CourseList";
import ModuleDetail from "./ModuleDetail";
import { modulesData } from "./data/modulesData";
import { useModuleSelection } from "./hooks/useModuleSelection";
import { usePlanLimits } from "@/hooks/usePlanLimits";
import PremiumDialog from "@/components/premium/PremiumDialog";
import PremiumBanner from "@/components/premium/PremiumBanner";

const CoursesGrid = () => {
  const { selectedModuleId, handleModuleClick, handleBackClick } = useModuleSelection();
  const { canAccessAllModules, userPlan } = usePlanLimits();
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  
  const selectedModule = modulesData.find(module => module.id === selectedModuleId);

  // Filtrer les modules en fonction du plan de l'utilisateur
  const accessibleModules = modulesData.map(module => ({
    ...module,
    isPremium: typeof module.id === 'number' && module.id > 3 && !canAccessAllModules() // Fix: ensure module.id is a number before comparison
  }));

  const handleModuleSelection = (moduleId: number) => { // Fix: Changed type from string to number
    const module = accessibleModules.find(m => m.id === moduleId);
    
    if (module?.isPremium) {
      setIsPremiumDialogOpen(true);
    } else {
      handleModuleClick(moduleId); // Fix: handleModuleClick expects a number
    }
  };

  if (selectedModule) {
    return <ModuleDetail module={selectedModule} onBack={handleBackClick} />;
  }

  return (
    <div className="space-y-6">
      {userPlan === 'free' && (
        <PremiumBanner type="modules" />
      )}
      
      <CourseList 
        modules={accessibleModules} 
        onModuleClick={handleModuleSelection} 
      />
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </div>
  );
};

export default CoursesGrid;
