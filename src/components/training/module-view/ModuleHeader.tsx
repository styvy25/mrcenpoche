
import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Module } from '@/components/training/types';

interface ModuleHeaderProps {
  module: Module;
  onBack: () => void;
  onDownloadPdf: () => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ module, onBack, onDownloadPdf }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div>
          <h2 className="text-xl font-bold text-white">{module.title}</h2>
          {module.categoryName && (
            <p className="text-sm text-gray-400">{module.categoryName}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <Progress value={module.progress} className="w-24 h-2 bg-gray-700" />
          <span className="text-sm text-gray-400">{module.progress}%</span>
        </div>
        
        <Button 
          size="sm"
          variant="outline" 
          onClick={onDownloadPdf}
          className="gap-1.5"
        >
          <Download className="h-4 w-4" />
          <span>PDF</span>
        </Button>
      </div>
    </div>
  );
};

export default ModuleHeader;
