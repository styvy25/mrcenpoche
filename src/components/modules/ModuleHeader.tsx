
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Module } from "./types";

interface ModuleHeaderProps {
  module: Module;
  onBack: () => void;
}

const ModuleHeader = ({ module, onBack }: ModuleHeaderProps) => {
  return (
    <div className="flex items-center">
      <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Retour
      </Button>
      <h2 className="text-2xl font-bold">{module.title}</h2>
    </div>
  );
};

export default ModuleHeader;
