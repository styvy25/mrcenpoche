
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/services/newsService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PenTool, Clock } from "lucide-react";

interface EditorialCardProps {
  editorial: NewsArticle | null;
  isLoading: boolean;
  onRefresh?: () => void;
}

const EditorialCard: React.FC<EditorialCardProps> = ({ 
  editorial, 
  isLoading,
  onRefresh 
}) => {
  if (isLoading) {
    return (
      <Card className="h-full animate-pulse">
        <CardHeader>
          <div className="h-7 bg-gray-200 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/2 mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!editorial) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
        <PenTool className="h-12 w-12 text-mrc-blue mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Aucun éditorial disponible</h3>
        <p className="text-gray-500 mb-4">Impossible de charger l'éditorial en ce moment.</p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline">
            Réessayer
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col border-mrc-blue">
      <CardHeader className="bg-mrc-blue/5 border-b border-mrc-blue/20 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl text-mrc-blue">
            {editorial.title}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center text-sm gap-1">
          <Clock className="h-3 w-3" />
          {format(new Date(editorial.timestamp), "d MMMM yyyy à HH'h'mm", { locale: fr })}
          <span className="ml-2 font-medium text-mrc-blue">
            Par: {editorial.source || "Styvy237"}
          </span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="py-4 flex-grow overflow-auto">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {editorial.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4">
        {onRefresh && (
          <Button 
            onClick={onRefresh} 
            variant="outline" 
            size="sm" 
            className="ml-auto"
          >
            Actualiser l'éditorial
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EditorialCard;
