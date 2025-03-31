
import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Award } from "lucide-react";
import { Module } from "../types";

interface ModuleDetailActionsProps {
  module: Module;
  onOpenPdf: () => void;
  onOpenCertificate: () => void;
  onMarkComplete: () => void;
}

const ModuleDetailActions: React.FC<ModuleDetailActionsProps> = ({
  module,
  onOpenPdf,
  onOpenCertificate,
  onMarkComplete
}) => {
  return (
    <div className="flex flex-wrap gap-3 sm:flex-row justify-between">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onMarkComplete}
          disabled={module.isCompleted}
        >
          <BookOpen className="h-4 w-4 mr-1" />
          {module.isCompleted ? "Terminé" : "Marquer comme terminé"}
        </Button>
        
        {module.isPdfAvailable && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={onOpenPdf}
          >
            <Download className="h-4 w-4 mr-1" />
            Support PDF
          </Button>
        )}
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onOpenCertificate}
        className={module.isCompleted ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800" : ""}
      >
        <Award className="h-4 w-4 mr-1" />
        Certificat
      </Button>
    </div>
  );
};

export default ModuleDetailActions;
