
import React from 'react';
import { Book, Award, TrendingUp, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? 'bg-mrc-blue text-white shadow-lg shadow-blue-500/20'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:text-white'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement, { 
        size: 18,
        className: `mr-2 ${active ? 'text-white' : 'text-gray-400'}`
      })}
      <span>{label}</span>
    </motion.button>
  );
};

interface TrainingModuleHeaderProps {
  activeTab: 'modules' | 'immersive' | 'progress' | 'certificates';
  onTabChange: (tab: 'modules' | 'immersive' | 'progress' | 'certificates') => void;
}

const TrainingModuleHeader: React.FC<TrainingModuleHeaderProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="mb-6">
      <motion.h1 
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Formation politique
      </motion.h1>
      <motion.p 
        className="text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        Renforcez vos compétences et connaissances politiques avec notre programme de formation complet.
      </motion.p>
      
      <motion.div 
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <TabButton
          active={activeTab === 'modules'}
          onClick={() => onTabChange('modules')}
          icon={<Book />}
          label="Modules"
        />
        <TabButton
          active={activeTab === 'immersive'}
          onClick={() => onTabChange('immersive')}
          icon={<Youtube />}
          label="Formation immersive"
        />
        <TabButton
          active={activeTab === 'progress'}
          onClick={() => onTabChange('progress')}
          icon={<TrendingUp />}
          label="Progression"
        />
        <TabButton
          active={activeTab === 'certificates'}
          onClick={() => onTabChange('certificates')}
          icon={<Award />}
          label="Certificats"
        />
      </motion.div>
    </div>
  );
};

export default TrainingModuleHeader;
