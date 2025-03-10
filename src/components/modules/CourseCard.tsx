
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Download, CheckCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  progress: number;
  duration: string;
  level: "Débutant" | "Intermédiaire" | "Avancé";
  isPdfAvailable: boolean;
  isCompleted: boolean;
}

const CourseCard = ({
  title,
  description,
  progress,
  duration,
  level,
  isPdfAvailable,
  isCompleted
}: CourseCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow w-full cursor-pointer">
      <div className={`h-2 ${
        level === "Débutant" ? "bg-mrc-green" :
        level === "Intermédiaire" ? "bg-mrc-blue" :
        "bg-mrc-red"
      }`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{title}</CardTitle>
          <Badge variant={
            level === "Débutant" ? "default" :
            level === "Intermédiaire" ? "secondary" :
            "destructive"
          }>
            {level}
          </Badge>
        </div>
        <CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-1" />
            <span>4 leçons</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
          {isCompleted ? 
            <CheckCircle className="h-4 w-4 mr-1 text-green-500" /> :
            <BookOpen className="h-4 w-4 mr-1" />
          }
          {isCompleted ? "Revoir" : "Continuer"}
        </Button>
        {isPdfAvailable && (
          <Button variant="outline" size="sm" className="text-xs" onClick={(e) => e.stopPropagation()}>
            <Download className="h-4 w-4 mr-1" />
            Support PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
