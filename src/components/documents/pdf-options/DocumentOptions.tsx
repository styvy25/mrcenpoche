
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface DocumentOptionsProps {
  options: {
    includeExercises: boolean;
    includeImages: boolean;
    includeSummary: boolean;
  };
  setOptions: React.Dispatch<React.SetStateAction<{
    includeExercises: boolean;
    includeImages: boolean;
    includeSummary: boolean;
  }>>;
}

const DocumentOptions = ({ options, setOptions }: DocumentOptionsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">
        Options du document
      </label>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="include-exercises" 
          checked={options.includeExercises}
          onCheckedChange={(checked) => 
            setOptions(prev => ({...prev, includeExercises: checked as boolean}))
          }
          className="mt-1"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="include-exercises"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Inclure les exercices pratiques
          </label>
          <p className="text-xs text-gray-500">
            Ajoute des exercices pour mettre en pratique les concepts
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="include-images" 
          checked={options.includeImages}
          onCheckedChange={(checked) => 
            setOptions(prev => ({...prev, includeImages: checked as boolean}))
          }
          className="mt-1"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="include-images"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Inclure les illustrations et schémas
          </label>
          <p className="text-xs text-gray-500">
            Ajoute des visuels pour faciliter la compréhension
          </p>
        </div>
      </div>
      
      <div className="flex items-start space-x-2">
        <Checkbox 
          id="include-summary" 
          checked={options.includeSummary}
          onCheckedChange={(checked) => 
            setOptions(prev => ({...prev, includeSummary: checked as boolean}))
          }
          className="mt-1"
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="include-summary"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Inclure un résumé exécutif
          </label>
          <p className="text-xs text-gray-500">
            Ajoute une synthèse des points clés à la fin du document
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentOptions;
