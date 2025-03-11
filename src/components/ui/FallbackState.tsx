
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, WifiOff, Key, RefreshCw } from "lucide-react";

interface FallbackStateProps {
  type: 'offline' | 'api-missing' | 'error';
  title?: string;
  description?: string;
  actionText?: string;
  actionPath?: string;
  onRetry?: () => void;
}

const FallbackState: React.FC<FallbackStateProps> = ({
  type,
  title,
  description,
  actionText,
  actionPath,
  onRetry
}) => {
  const navigate = useNavigate();
  
  const defaultProps = {
    offline: {
      icon: <WifiOff size={48} className="text-amber-500 mb-4" />,
      title: "Mode hors-ligne",
      description: "Certaines fonctionnalités ne sont pas disponibles sans connexion Internet. Veuillez vous reconnecter pour accéder à toutes les fonctionnalités.",
      actionText: "Réessayer",
    },
    'api-missing': {
      icon: <Key size={48} className="text-blue-500 mb-4" />,
      title: "Configuration requise",
      description: "Pour accéder à toutes les fonctionnalités, veuillez configurer vos clés API.",
      actionText: "Configurer",
      actionPath: "/settings"
    },
    error: {
      icon: <AlertTriangle size={48} className="text-red-500 mb-4" />,
      title: "Une erreur est survenue",
      description: "Nous ne pouvons pas charger cette fonctionnalité actuellement. Veuillez réessayer plus tard.",
      actionText: "Retour à l'accueil",
      actionPath: "/"
    }
  };
  
  const currentProps = defaultProps[type];
  
  const handleAction = () => {
    if (type === 'offline' && onRetry) {
      onRetry();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center">
          {currentProps.icon}
        </div>
        <CardTitle className="text-xl">
          {title || currentProps.title}
        </CardTitle>
        <CardDescription className="text-center">
          {description || currentProps.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-6">
        <Button 
          onClick={handleAction}
          variant={type === 'offline' ? "outline" : "default"}
          className={type === 'api-missing' ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          {type === 'offline' && <RefreshCw size={16} className="mr-2" />}
          {actionText || currentProps.actionText}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FallbackState;
