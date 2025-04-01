
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, ChartBar, Sparkles } from 'lucide-react';

interface TrainingModuleHeaderProps {
  activeTab: 'modules' | 'progress' | 'certificates';
  onTabChange: (tab: 'modules' | 'progress' | 'certificates') => void;
}

const TrainingModuleHeader: React.FC<TrainingModuleHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 bg-clip-text text-transparent">
          Formation MRC Adaptive
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
          Un parcours de formation personnalisé qui évolue avec vos compétences et performances
        </p>
        
        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center px-2 py-1 bg-gray-800 bg-opacity-50 rounded-full text-xs text-gray-300">
            <Sparkles size={14} className="text-yellow-400 mr-1" />
            <span>Propulsé par l'IA</span>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-center mb-6">
        <div className="bg-gray-800 p-1 rounded-xl flex space-x-1">
          <TabButton 
            icon={<BookOpen size={18} />} 
            label="Modules" 
            isActive={activeTab === 'modules'} 
            onClick={() => onTabChange('modules')}
          />
          <TabButton 
            icon={<ChartBar size={18} />} 
            label="Progrès" 
            isActive={activeTab === 'progress'} 
            onClick={() => onTabChange('progress')}
          />
          <TabButton 
            icon={<Award size={18} />} 
            label="Certificats" 
            isActive={activeTab === 'certificates'} 
            onClick={() => onTabChange('certificates')}
          />
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      className={`relative flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive 
          ? 'bg-gradient-to-r from-green-600/80 via-yellow-600/80 to-red-600/80 text-white' 
          : 'hover:bg-gray-700 text-gray-400 hover:text-white'
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {isActive && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-600/20 via-yellow-600/20 to-red-600/20 -z-10"
          transition={{ duration: 0.3 }}
        />
      )}
    </button>
  );
};

export default TrainingModuleHeader;
