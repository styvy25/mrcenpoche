
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { fetchTrainingScenarios, TrainingScenario, updateScenarioProgress } from "@/services/training/trainingScenarioService";
import TrainingHeader from "./TrainingHeader";
import TrainingScenarioCard from "./TrainingScenarioCard";
import ActiveScenario from "./ActiveScenario";
import { Loader2 } from "lucide-react";

interface ImmersiveTrainingSpaceProps {
  onTrainingComplete?: () => void;
}

const ImmersiveTrainingSpace = ({ onTrainingComplete }: ImmersiveTrainingSpaceProps) => {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [scenarios, setScenarios] = useState<TrainingScenario[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { points, level, nextLevelPoints, percentToNextLevel, addPoints } = usePoints();
  
  useEffect(() => {
    const loadScenarios = async () => {
      setLoading(true);
      try {
        const data = await fetchTrainingScenarios();
        setScenarios(data);
      } catch (error) {
        console.error("Failed to load training scenarios:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les scénarios de formation.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadScenarios();
  }, [toast]);
  
  const handleStartScenario = (id: string) => {
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
    if (activeScenario) {
      try {
        // Update the scenario as completed
        await updateScenarioProgress(activeScenario, true);
        
        // Update local state
        setScenarios(prev => 
          prev.map(s => 
            s.id === activeScenario ? { ...s, completed: true } : s
          )
        );
        
        // Add points for completing a scenario
        await addPoints(50);
        
        toast({
          title: "Scénario terminé",
          description: "Félicitations! Vous avez complété ce scénario de formation.",
        });
        
        // Reset active scenario
        setActiveScenario(null);
        
        if (onTrainingComplete) {
          onTrainingComplete();
        }
      } catch (error) {
        console.error("Error completing scenario:", error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la sauvegarde de votre progression.",
          variant: "destructive"
        });
      }
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-mrc-blue" />
            <span className="ml-3 text-gray-400">Chargement des scénarios...</span>
          </div>
        </div>
      </div>
    );
  }
  
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
