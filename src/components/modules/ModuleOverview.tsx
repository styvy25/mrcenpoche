
import { Button } from "@/components/ui/button";
import { Module } from "./types";

interface ModuleOverviewProps {
  module: Module;
  onTakeQuiz: () => void;
}

const ModuleOverview = ({ module, onTakeQuiz }: ModuleOverviewProps) => {
  return (
    <div className="pt-4">
      <div className="prose prose-sm max-w-none">
        <p>{module.overview}</p>
      </div>
      {module.quizLink && (
        <div className="mt-4">
          <Button onClick={onTakeQuiz} className="w-full bg-mrc-blue">
            Passer le quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default ModuleOverview;
