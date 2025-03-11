
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NewsArticle } from "@/services/newsService";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { PenTool, Clock, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditorialCardProps {
  editorial: NewsArticle | null;
  isLoading: boolean;
  onRefresh?: () => void;
}

const staticContent = {
  title: "Édition spéciale: Le MRC et l'avenir politique du Cameroun",
  content: `Le Mouvement pour la Renaissance du Cameroun (MRC) continue de se positionner comme une force politique majeure au Cameroun, proposant une alternative crédible pour l'avenir du pays.

Sous la direction de Maurice Kamto, le parti a élaboré un programme de gouvernance qui met l'accent sur la réforme des institutions, le développement économique et social, et la promotion d'une démocratie véritable.

Le MRC se distingue par sa vision d'un Cameroun uni, où toutes les composantes socioculturelles du pays participent harmonieusement au développement national. Cette approche inclusive vise à transcender les clivages ethniques et régionaux qui ont souvent caractérisé la politique camerounaise.

La stratégie du parti s'articule autour de plusieurs axes prioritaires : la réforme constitutionnelle pour un équilibre des pouvoirs, le redressement économique pour créer des emplois et réduire la pauvreté, l'amélioration des services publics de base (éducation, santé, eau, électricité), et le renforcement de l'état de droit.

Face aux défis auxquels le Cameroun est confronté, le MRC propose des solutions concrètes, basées sur une analyse rigoureuse des problèmes et une vision claire de l'avenir. Le parti met en avant l'importance de la bonne gouvernance, de la transparence et de la lutte contre la corruption comme conditions essentielles pour un développement durable.

Le MRC appelle également à une révision du système électoral pour garantir des élections libres, transparentes et équitables, permettant ainsi une véritable expression de la volonté populaire. Cette revendication reflète l'engagement du parti pour une démocratie authentique, où le pouvoir émane réellement du peuple.

En conclusion, le MRC se présente comme un acteur incontournable du paysage politique camerounais, porteur d'espoir pour un changement positif et durable dans le pays. À travers son programme et ses actions, le parti contribue à l'éveil des consciences et à la mobilisation citoyenne pour un Cameroun meilleur.`,
  summary: "Analyse de la vision politique du MRC pour l'avenir du Cameroun",
  timestamp: new Date(),
  source: "Rédaction MRC en Poche",
  tags: ["Éditorial", "Politique", "Vision"]
};

const EditorialCard: React.FC<EditorialCardProps> = ({ 
  editorial, 
  isLoading,
  onRefresh 
}) => {
  const [useStaticContent, setUseStaticContent] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  
  const displayedEditorial = useStaticContent ? staticContent : editorial;
  
  const handleRegenerateContent = async () => {
    try {
      setIsRegenerating(true);
      
      // Check if API key exists
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).perplexity) {
        toast({
          title: "Clé API requise",
          description: "Veuillez configurer votre clé API Perplexity pour regénérer du contenu",
          variant: "destructive",
        });
        setUseStaticContent(true);
        return;
      }
      
      // If onRefresh is available, use it to regenerate content
      if (onRefresh) {
        onRefresh();
      }
      
      toast({
        title: "Contenu régénéré",
        description: "L'éditorial a été mis à jour avec succès",
      });
    } catch (error) {
      console.error("Error regenerating content:", error);
      toast({
        title: "Erreur",
        description: "Impossible de régénérer le contenu. Contenu statique affiché.",
        variant: "destructive",
      });
      setUseStaticContent(true);
    } finally {
      setIsRegenerating(false);
    }
  };

  const toggleContentSource = () => {
    setUseStaticContent(!useStaticContent);
    toast({
      title: useStaticContent ? "Contenu dynamique" : "Contenu statique",
      description: useStaticContent ? "Affichage du contenu généré par l'IA" : "Affichage du contenu prédéfini",
    });
  };

  if (isLoading || isRegenerating) {
    return (
      <Card className="h-full animate-pulse">
        <CardHeader>
          <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2 mt-2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!displayedEditorial) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-6 text-center">
        <PenTool className="h-12 w-12 text-mrc-blue mb-4 opacity-50" />
        <h3 className="text-xl font-semibold mb-2">Aucun éditorial disponible</h3>
        <p className="text-gray-500 mb-4">Impossible de charger l'éditorial en ce moment.</p>
        <div className="flex gap-2">
          <Button onClick={toggleContentSource} variant="outline">
            Utiliser contenu statique
          </Button>
          {onRefresh && (
            <Button onClick={onRefresh} variant="default">
              Réessayer
            </Button>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col border-mrc-blue">
      <CardHeader className="bg-mrc-blue/5 border-b border-mrc-blue/20 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl text-mrc-blue">
            {displayedEditorial.title}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center text-sm gap-1">
          <Clock className="h-3 w-3" />
          {format(new Date(displayedEditorial.timestamp), "d MMMM yyyy à HH'h'mm", { locale: fr })}
          <span className="ml-2 font-medium text-mrc-blue">
            Par: {displayedEditorial.source || "Styvy237"}
          </span>
          {useStaticContent && (
            <span className="ml-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-xs px-2 py-0.5 rounded">
              Contenu statique
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="py-4 flex-grow overflow-auto">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {displayedEditorial.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-sm md:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
        <Button
          onClick={toggleContentSource}
          variant="outline"
          size="sm"
        >
          {useStaticContent ? "Voir contenu dynamique" : "Voir contenu statique"}
        </Button>
        
        <Button 
          onClick={handleRegenerateContent} 
          variant="default" 
          size="sm"
          className="flex items-center gap-1"
          disabled={isRegenerating}
        >
          <RefreshCw className="h-4 w-4" />
          Régénérer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditorialCard;
