
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { scenarios } from "./scenariosData";
import TrainingHeader from "./TrainingHeader";
import TrainingScenarioCard from "./TrainingScenarioCard";
import ActiveScenario from "./ActiveScenario";

interface ImmersiveTrainingSpaceProps {
  onTrainingComplete?: () => void;
}

const ImmersiveTrainingSpace = ({ onTrainingComplete }: ImmersiveTrainingSpaceProps) => {
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const { toast } = useToast();
  const { points, level, nextLevelPoints, percentToNextLevel, addPoints } = usePoints();
  
  const handleStartScenario = (id: number) => {
    const scenario = scenarios.find(s => s.id === id);
    if (scenario && scenario.locked) {
      toast({
        title: "Scénario verrouillé",
        description: "Vous devez compléter les scénarios précédents pour débloquer celui-ci.",
        variant: "destructive"
      });
      return;
    }
    
    setActiveScenario(id);
    toast({
      title: "Scénario démarré",
      description: `Vous avez commencé le scénario: ${scenario?.title}`,
    });
  };
  
  const handleCompleteScenario = async () => {
    setActiveScenario(null);
    toast({
      title: "Scénario terminé",
      description: "Félicitations! Vous avez complété ce scénario de formation.",
    });
    
    // Add points for completing a scenario
    await addPoints(50);
    
    if (onTrainingComplete) {
      onTrainingComplete();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6">
        <TrainingHeader 
          level={level} 
          progressPercentage={percentToNextLevel} 
          currentPoints={points} 
          pointsToNextLevel={nextLevelPoints} 
        />
        
        {activeScenario ? (
          <ActiveScenario onCompleteScenario={handleCompleteScenario} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <TrainingScenarioCard 
                key={scenario.id} 
                scenario={scenario}
                onStartScenario={handleStartScenario}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImmersiveTrainingSpace;
