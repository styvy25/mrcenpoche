
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { TrainingScenario } from '@/services/training/trainingScenarioService';

interface TrainingScenarioCardProps {
  scenario: TrainingScenario;
  onStartScenario: (id: string) => void;
}

const TrainingScenarioCard: React.FC<TrainingScenarioCardProps> = ({ 
  scenario, 
  onStartScenario 
}) => {
  return (
    <Card 
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
          onClick={() => onStartScenario(scenario.id)}
        >
          {scenario.locked ? "Verrouillé" : (scenario.completed ? "Rejouer" : "Commencer")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TrainingScenarioCard;
