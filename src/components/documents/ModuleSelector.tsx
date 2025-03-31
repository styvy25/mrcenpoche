
import React from 'react';
import { Check } from 'lucide-react';
import { useScreenSize } from '@/hooks/useScreenSize';

interface ModuleSelectorProps {
  selected: string;
  onSelect: (moduleId: string) => void;
}

const ModuleSelector: React.FC<ModuleSelectorProps> = ({ selected, onSelect }) => {
  const { isMobile } = useScreenSize();
  
  const modules = [
    { id: 'histoire', name: 'Histoire et Valeurs' },
    { id: 'mobilisation', name: 'Techniques de Mobilisation' },
    { id: 'communication', name: 'Communication Politique' },
    { id: 'enjeux', name: 'Enjeux Politiques' },
    { id: 'campagne', name: 'Organisation de Campagne' }
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {modules.map((module) => (
        <div
          key={module.id}
          className={`
            flex items-center gap-2 p-3 rounded-lg border cursor-pointer
            ${selected === module.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-gray-300'}
          `}
          onClick={() => onSelect(module.id)}
        >
          <div className={`
            flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center
            ${selected === module.id ? 'bg-primary text-white' : 'border border-gray-300'}
          `}>
            {selected === module.id && <Check className="h-3 w-3" />}
          </div>
          <span className={`${isMobile ? 'text-sm' : ''}`}>{module.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ModuleSelector;
