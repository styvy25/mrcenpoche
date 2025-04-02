
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
      className={`flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? 'bg-mrc-blue text-white'
          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
      }`}
    >
      {icon}
      <span className="ml-2">{label}</span>
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
      <h1 className="text-2xl font-bold text-white mb-2">Formation politique</h1>
      <p className="text-gray-400 mb-4">
        Renforcez vos compétences et connaissances politiques avec notre programme de formation complet.
      </p>
      
      <div className="flex flex-wrap gap-2 mt-4">
        <TabButton
          active={activeTab === 'modules'}
          onClick={() => onTabChange('modules')}
          icon={<Book size={16} />}
          label="Modules"
        />
        <TabButton
          active={activeTab === 'immersive'}
          onClick={() => onTabChange('immersive')}
          icon={<Youtube size={16} />}
          label="Formation immersive"
        />
        <TabButton
          active={activeTab === 'progress'}
          onClick={() => onTabChange('progress')}
          icon={<TrendingUp size={16} />}
          label="Progression"
        />
        <TabButton
          active={activeTab === 'certificates'}
          onClick={() => onTabChange('certificates')}
          icon={<Award size={16} />}
          label="Certificats"
        />
      </div>
    </div>
  );
};

export default TrainingModuleHeader;
