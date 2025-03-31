
import React from 'react';
import { motion } from 'framer-motion';
import { Award, ChevronUp, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { usePoints } from '@/hooks/usePoints';
import { Badge } from '@/components/ui/badge';

interface PointsDisplayProps {
  compact?: boolean;
  showHistory?: boolean;
  className?: string;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({ 
  compact = false, 
  showHistory = false,
  className = ""
}) => {
  const { points, level, recentActivity, getLevelProgress, getPointsForNextLevel } = usePoints();
  const navigate = useNavigate();
  const progress = getLevelProgress();
  const pointsToNextLevel = getPointsForNextLevel();

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="p-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
          <Award className="h-4 w-4 text-white" />
        </div>
        <div className="text-sm font-medium">{points} pts</div>
        <Badge variant="outline" className="flex items-center gap-1 text-xs bg-purple-50 text-purple-700 border-purple-200">
          <TrendingUp className="h-3 w-3" />
          Niv. {level}
        </Badge>
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5,
                repeatDelay: 2
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
            >
              <Award className="h-6 w-6 text-white" />
            </motion.div>
            
            <div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">{points}</h3>
                <span className="text-gray-500 text-sm">points</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Niveau {level}
                </Badge>
                
                <span className="text-xs text-gray-500">
                  {pointsToNextLevel} pts pour niveau {level + 1}
                </span>
              </div>
            </div>
          </div>
          
          <Button 
            size="sm" 
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
          >
            Gagner plus de points
          </Button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progression</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-100" indicatorClassName="bg-gradient-to-r from-indigo-500 to-purple-600" />
        </div>
        
        {showHistory && recentActivity.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Activité récente
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
              {recentActivity.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-0"
                >
                  <span className="text-gray-600">{activity.message}</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <ChevronUp className="h-3 w-3 mr-0.5" />
                    {activity.points}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PointsDisplay;
