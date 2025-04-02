
import React, { useState, useEffect, Suspense } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { motion, AnimatePresence } from 'framer-motion';
import TrainingModuleHeader from '@/components/training/TrainingModuleHeader';
import AdaptiveModuleContent from '@/components/training/AdaptiveModuleContent';
import TrainingProgress from '@/components/training/TrainingProgress';
import { useSubscription } from '@/hooks/useSubscription';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingFallback = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-12 w-3/4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} className="h-48 w-full rounded-lg" />
      ))}
    </div>
  </div>
);

const TrainingModulePage: React.FC = () => {
  const { isPremium } = useSubscription();
  const [activeTab, setActiveTab] = useState<'modules' | 'progress' | 'certificates'>('modules');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate page content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleTabChange = (tab: 'modules' | 'progress' | 'certificates') => {
    setActiveTab(tab);
  };
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-950 text-white pt-20 pb-12">
        <div className="container mx-auto px-4">
          <TrainingModuleHeader activeTab={activeTab} onTabChange={handleTabChange} />
          
          {!isPremium && (
            <div className="mb-6">
              <PremiumUpsell 
                title="Accédez à toutes les formations" 
                description="Débloquez des modules de formation avancés, des examens personnalisés et plus encore."
                featureList={[
                  "Formations complètes et avancées",
                  "Examens et certificats officiels",
                  "Téléchargement de PDF et vidéos",
                  "Parcours personnalisé par IA"
                ]}
              />
            </div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <LoadingFallback />
                </motion.div>
              ) : (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'modules' && <AdaptiveModuleContent />}
                  {activeTab === 'progress' && <TrainingProgress />}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainingModulePage;
