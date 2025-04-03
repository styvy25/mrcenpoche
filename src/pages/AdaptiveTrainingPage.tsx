
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSubscription } from '@/hooks/useSubscription';
import { BookOpen, Target, BarChart, TrendingUp } from 'lucide-react';
import PremiumUpsell from '@/components/premium/PremiumUpsell';
import AdaptiveTrainingRecommendations from '@/components/adaptive-training/AdaptiveTrainingRecommendations';
import { useAuth } from '@/components/auth/AuthContext';

const AdaptiveTrainingPage: React.FC = () => {
  const { isPremium } = useSubscription();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('recommendations');
  
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-950 text-white pt-20 pb-12">
        <div className="container mx-auto px-4 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold">Formation Politique Adaptative</h1>
              <p className="text-gray-400 mt-2">
                Un parcours de formation personnalisé pour développer vos compétences politiques
              </p>
            </div>
            <Badge className="bg-mrc-blue hover:bg-blue-700">
              Powered by Styvy-237
            </Badge>
          </motion.div>
          
          {!isPremium && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <PremiumUpsell 
                title="Débloquez votre formation politique complète" 
                description="Accédez à l'analyse avancée de vos résultats et à un parcours entièrement personnalisé"
                featureList={[
                  "Analyse détaillée de vos points forts et faiblesses politiques",
                  "Parcours de formation adapté à votre profil",
                  "Plus de 50 modules de formation exclusifs",
                  "Suivi de progression avancé avec statistiques"
                ]}
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="recommendations" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Recommandations</span>
                </TabsTrigger>
                <TabsTrigger value="objectives" className="flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Objectifs</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center space-x-2">
                  <BarChart className="w-4 h-4" />
                  <span>Statistiques</span>
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Progression</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-xl p-6">
                <TabsContent value="recommendations">
                  <AdaptiveTrainingRecommendations />
                </TabsContent>
                
                <TabsContent value="objectives">
                  <div className="p-6 text-center">
                    <Target className="h-16 w-16 mx-auto text-mrc-blue" />
                    <h3 className="text-xl font-semibold mt-4">Objectifs de formation</h3>
                    <p className="text-gray-400 mt-2">
                      Cette fonctionnalité sera bientôt disponible. Vous pourrez définir des objectifs politiques personnels.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="analytics">
                  <div className="p-6 text-center">
                    <BarChart className="h-16 w-16 mx-auto text-mrc-blue" />
                    <h3 className="text-xl font-semibold mt-4">Statistiques de formation</h3>
                    <p className="text-gray-400 mt-2">
                      Cette fonctionnalité sera bientôt disponible. Vous pourrez visualiser vos statistiques de progression.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="progress">
                  <div className="p-6 text-center">
                    <TrendingUp className="h-16 w-16 mx-auto text-mrc-blue" />
                    <h3 className="text-xl font-semibold mt-4">Progression globale</h3>
                    <p className="text-gray-400 mt-2">
                      Cette fonctionnalité sera bientôt disponible. Vous pourrez suivre votre progression politique.
                    </p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdaptiveTrainingPage;
