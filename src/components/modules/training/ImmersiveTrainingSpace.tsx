
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Icons
const Trophy = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

interface TrainingScenario {
  id: number;
  title: string;
  level: number;
  description: string;
  image: string;
  completed: boolean;
  locked?: boolean;
}

interface ImmersiveTrainingSpaceProps {
  onTrainingComplete?: () => void;
}

const ImmersiveTrainingSpace = ({ onTrainingComplete }: ImmersiveTrainingSpaceProps) => {
  const [level, setLevel] = useState(1);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const { toast } = useToast();
  
  const scenarios: TrainingScenario[] = [
    {
      id: 1,
      title: "Initiation au porte-à-porte",
      level: 1,
      description: "Apprenez à présenter efficacement les idées du MRC lors de visites porte-à-porte.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      completed: true
    },
    {
      id: 2,
      title: "Argumentaire politique",
      level: 1,
      description: "Maîtrisez l'art de débattre et défendre les positions du MRC face à l'opposition.",
      image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
      completed: false
    },
    {
      id: 3,
      title: "Organisation d'événements locaux",
      level: 2,
      description: "Apprenez à planifier et exécuter des événements MRC dans votre communauté.",
      image: "https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      completed: false,
      locked: true
    }
  ];
  
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
  
  const handleCompleteScenario = () => {
    setActiveScenario(null);
    toast({
      title: "Scénario terminé",
      description: "Félicitations! Vous avez complété ce scénario de formation.",
    });
    
    if (onTrainingComplete) {
      onTrainingComplete();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Formation politique immersive</h2>
          <p className="text-gray-300">Développez vos compétences politiques à travers des scénarios virtuels interactifs</p>
          
          <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="bg-mrc-blue rounded-full p-2 h-10 w-10 flex items-center justify-center animate-pulse-border">
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Niveau actuel: <span className="text-mrc-blue font-semibold">Militant niveau {level}</span></p>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-mrc-blue to-mrc-green animate-gradient" 
                    style={{ width: "35%" }}
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">1500 XP / 4000 XP pour le niveau suivant</p>
              </div>
            </div>
          </div>
        </div>
        
        {activeScenario ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-4 text-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{scenarios.find(s => s.id === activeScenario)?.title}</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveScenario(null)} className="text-xs h-7">
                Retour aux scénarios
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="animate-float"
                >
                  <BookOpen size={48} className="text-mrc-blue" />
                </motion.div>
                <h3 className="text-lg font-semibold">Scénario virtuel en cours</h3>
                <p className="text-sm text-gray-400">
                  Explorez ce scénario interactif pour développer vos compétences politiques. 
                  Prenez des décisions, interagissez avec des personnages virtuels et voyez les conséquences 
                  de vos choix en temps réel.
                </p>
                
                <motion.div 
                  className="mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleCompleteScenario} className="bg-mrc-green hover:bg-mrc-green/90">
                    Terminer le scénario
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className={`overflow-hidden transition-all duration-300 scenario-card ${
                  scenario.locked ? 'opacity-60 locked' : 'hover:shadow-lg hover:shadow-mrc-blue/10'
                }`}
              >
                <div className="relative h-32">
                  <img 
                    src={scenario.image} 
                    alt={scenario.title} 
                    className="w-full h-full object-cover" 
                  />
                  {scenario.locked && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center scenario-locked-overlay">
                      <Lock size={24} className="text-gray-400" />
                    </div>
                  )}
                  {scenario.completed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-mrc-green">Complété</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <Badge variant="outline" className="bg-mrc-blue/20 text-white border-none">
                      Niveau {scenario.level}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{scenario.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{scenario.description}</p>
                  <Button 
                    variant={scenario.locked ? "outline" : "default"}
                    className={!scenario.locked ? "bg-mrc-blue hover:bg-mrc-blue/90 w-full" : "w-full"}
                    disabled={scenario.locked}
                    onClick={() => handleStartScenario(scenario.id)}
                  >
                    {scenario.locked ? "Verrouillé" : (scenario.completed ? "Rejouer" : "Commencer")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImmersiveTrainingSpace;
