
import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Award, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  isPdfAvailable?: boolean;
  isCompleted?: boolean;
}

const CourseCard = ({
  title,
  description,
  progress,
  duration,
  level,
  isPdfAvailable = false,
  isCompleted = false
}: CourseCardProps) => {
  const levelColorMap = {
    "Débutant": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "Intermédiaire": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "Avancé": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
    "Expert": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="p-6 h-full cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white dark:bg-gray-800 overflow-hidden relative">
        {isCompleted && (
          <div className="absolute top-0 right-0 w-16 h-16">
            <div className="absolute transform rotate-45 bg-green-500 text-white text-xs font-semibold py-1 right-[-35px] top-[20px] w-[140px] text-center">
              Complété
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
          {isPdfAvailable && (
            <div className="text-mrc-blue">
              <FileText size={18} />
            </div>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className={`text-xs ${levelColorMap[level]}`}>
            {level}
          </Badge>
          <Badge variant="outline" className="text-xs flex items-center gap-1 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            <Clock className="h-3 w-3" /> {duration}
          </Badge>
        </div>
        
        {progress > 0 && !isCompleted && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                <BarChart3 className="h-3 w-3" /> Progression
              </span>
              <span className="text-mrc-blue font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-mrc-blue rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {isCompleted && (
          <div className="mt-4 flex items-center text-green-600 dark:text-green-400">
            <CheckCircle className="h-4 w-4 mr-1" />
            <span className="text-xs font-medium">Module terminé</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default CourseCard;
