
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, FileText, Bell } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const ModulesFeaturedCard = () => {
  const { toast } = useToast();
  
  const handleNotification = () => {
    toast({
      title: "Notification activée",
      description: "Vous recevrez des notifications pour les nouveaux contenus",
      variant: "default",
    });
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-medium text-lg mb-3 text-mrc-blue">Parcours recommandé</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Suivez cette séquence de modules pour une formation optimale:
          </p>
          <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-300">
            <motion.li 
              className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="font-medium">Histoire et Valeurs du MRC</span>
              <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 py-1 px-2 rounded-full">Complété</span>
            </motion.li>
            <motion.li 
              className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <span className="font-medium">Techniques de Mobilisation</span>
              <span className="ml-auto text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 py-1 px-2 rounded-full">En cours</span>
            </motion.li>
            <motion.li 
              className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Communication Politique
            </motion.li>
            <motion.li 
              className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              Enjeux Politiques au Cameroun
            </motion.li>
            <motion.li 
              className="p-2 bg-gray-50 dark:bg-gray-800 rounded-md"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              Organisation de Campagne
            </motion.li>
          </ol>
          
          <div className="mt-4 flex justify-between">
            <Button className="bg-mrc-blue hover:bg-blue-700 text-white">
              <FileText className="mr-2 h-4 w-4" />
              Télécharger le programme
            </Button>
            
            <Button 
              onClick={handleNotification} 
              variant="outline" 
              className="border-mrc-blue text-mrc-blue"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h3 className="font-medium text-lg mb-3 text-mrc-blue">Modules par niveau</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Sympathisant:</span>
                <span className="text-xs text-green-600 dark:text-green-400">100% complété</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <motion.div 
                  className="h-2 bg-green-500 rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Modules 1-2 • Formation de base</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Militant:</span>
                <span className="text-xs text-mrc-blue">35% complété</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <motion.div 
                  className="h-2 bg-mrc-blue rounded-full" 
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 1, delay: 0.7 }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Modules 3-4 • Formation intermédiaire</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Cadre:</span>
                <span className="text-xs text-gray-500">Non commencé</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-mrc-red rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Modules 5-6 • Formation avancée</p>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Cadre Sup.:</span>
                <span className="text-xs text-gray-500">Non commencé</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">Modules 7-8 • Formation de leadership</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="border-mrc-blue text-mrc-blue">
              <Award className="mr-2 h-4 w-4" />
              Voir mes certifications
            </Button>
          </div>
        </motion.div>
      </div>
    </Card>
  );
};

export default ModulesFeaturedCard;
