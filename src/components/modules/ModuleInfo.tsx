
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Module } from "./types";

interface ModuleInfoProps {
  module: Module;
}

const ModuleInfo = ({ module }: ModuleInfoProps) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>{module.description}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded ${
            module.level === "Débutant" ? "bg-green-100 text-green-800" :
            module.level === "Intermédiaire" ? "bg-blue-100 text-blue-800" :
            "bg-red-100 text-red-800"
          }`}>
            {module.level}
          </span>
          <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-800">
            {module.duration}
          </span>
        </div>
      </div>
      <div className="mb-4 space-y-1">
        <div className="flex justify-between text-sm">
          <span>Progression</span>
          <span>{module.progress}%</span>
        </div>
        <Progress value={module.progress} className="h-2" />
      </div>
    </>
  );
};

export default ModuleInfo;
