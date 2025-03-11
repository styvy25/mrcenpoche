
import React from "react";
import { MODULE_DESCRIPTIONS } from "../pdfUtils";

interface ModuleMetadataProps {
  selectedModule: string;
}

const ModuleMetadata = ({ selectedModule }: ModuleMetadataProps) => {
  if (!selectedModule) return null;
  
  return (
    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-900/20 mb-4">
      <h3 className="text-sm font-medium text-mrc-blue mb-2">À propos de ce module</h3>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {MODULE_DESCRIPTIONS[selectedModule as keyof typeof MODULE_DESCRIPTIONS]}
      </p>
    </div>
  );
};

export default ModuleMetadata;
