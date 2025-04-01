
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "@/components/layout/MainLayout";
import { motion } from 'framer-motion';
import TrainingModuleHeader from '@/components/training/TrainingModuleHeader';
import AdaptiveModuleContent from '@/components/training/AdaptiveModuleContent';
import TrainingProgress from '@/components/training/TrainingProgress';
import { useSubscription } from '@/hooks/useSubscription';
import PremiumUpsell from '@/components/premium/PremiumUpsell';

const TrainingModulePage: React.FC = () => {
  const { isPremium } = useSubscription();
  const [activeTab, setActiveTab] = useState<'modules' | 'progress' | 'certificates'>('modules');
  
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl overflow-hidden"
          >
            {activeTab === 'modules' && <AdaptiveModuleContent />}
            {activeTab === 'progress' && <TrainingProgress />}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TrainingModulePage;
