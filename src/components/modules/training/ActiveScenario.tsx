
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface ActiveScenarioProps {
  onCompleteScenario: () => void;
}

const ActiveScenario: React.FC<ActiveScenarioProps> = ({ onCompleteScenario }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-4">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="animate-float"
        >
          <BookOpen size={48} className="text-mrc-blue" />
        </motion.div>
        <h3 className="text-lg font-semibold">Scénario virtuel en cours</h3>
        <p className="text-sm text-gray-400">
          Explorez ce scénario interactif pour développer vos compétences politiques. 
          Prenez des décisions, interagissez avec des personnages virtuels et voyez les conséquences 
          de vos choix en temps réel.
        </p>
        
        <motion.div 
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button onClick={onCompleteScenario} className="bg-mrc-green hover:bg-mrc-green/90">
            Terminer le scénario
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveScenario;
