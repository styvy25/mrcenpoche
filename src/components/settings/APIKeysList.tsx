
import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, EyeOff, Bot, Youtube, CreditCard, InfoIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { ApiKeyStatus } from "@/hooks/api-keys/types";

interface APIKeysListProps {
  perplexityKey: string;
  youtubeKey: string;
  stripeKey: string;
  keyStatus: ApiKeyStatus;
  onPerplexityKeyChange: (value: string) => void;
  onYoutubeKeyChange: (value: string) => void;
  onStripeKeyChange: (value: string) => void;
}

const APIKeysList: React.FC<APIKeysListProps> = ({
  perplexityKey,
  youtubeKey,
  stripeKey,
  keyStatus,
  onPerplexityKeyChange,
  onYoutubeKeyChange,
  onStripeKeyChange
}) => {
  const [showPerplexity, setShowPerplexity] = useState(false);
  const [showYoutube, setShowYoutube] = useState(false);
  const [showStripe, setShowStripe] = useState(false);

  return (
    <CardContent className="space-y-6">
      {/* Perplexity API Key */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-base font-medium">
            <Bot className="h-4 w-4 text-blue-500" />
            Clé API Perplexity
            {keyStatus.perplexity && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                Actif
              </Badge>
            )}
          </Label>
          <a 
            href="https://www.perplexity.ai/settings/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline flex items-center gap-1"
          >
            Obtenir une clé
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showPerplexity ? "text" : "password"}
              value={perplexityKey}
              onChange={(e) => onPerplexityKeyChange(e.target.value)}
              placeholder="pk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPerplexity(!showPerplexity)}
              className="absolute right-0 top-0 h-full px-3 py-2"
            >
              {showPerplexity ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPerplexity ? "Masquer" : "Afficher"}
              </span>
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-start gap-1">
          <InfoIcon className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>Permet d'utiliser l'assistant IA pour des réponses précises et contextuelles.</span>
        </p>
      </div>

      {/* YouTube API Key */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-base font-medium">
            <Youtube className="h-4 w-4 text-red-500" />
            Clé API YouTube
            {keyStatus.youtube && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                Actif
              </Badge>
            )}
          </Label>
          <a 
            href="https://console.cloud.google.com/apis/credentials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-red-500 hover:underline flex items-center gap-1"
          >
            Obtenir une clé
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showYoutube ? "text" : "password"}
              value={youtubeKey}
              onChange={(e) => onYoutubeKeyChange(e.target.value)}
              placeholder="AIza..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowYoutube(!showYoutube)}
              className="absolute right-0 top-0 h-full px-3 py-2"
            >
              {showYoutube ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showYoutube ? "Masquer" : "Afficher"}
              </span>
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-start gap-1">
          <InfoIcon className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>Nécessaire pour l'analyse et le téléchargement de vidéos YouTube.</span>
        </p>
      </div>

      {/* Stripe API Key (Optional) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2 text-base font-medium">
            <CreditCard className="h-4 w-4 text-purple-500" />
            Clé API Stripe (Optionnelle)
            {keyStatus.stripe && (
              <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-100">
                Actif
              </Badge>
            )}
          </Label>
          <a 
            href="https://dashboard.stripe.com/apikeys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-purple-500 hover:underline flex items-center gap-1"
          >
            Obtenir une clé
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type={showStripe ? "text" : "password"}
              value={stripeKey}
              onChange={(e) => onStripeKeyChange(e.target.value)}
              placeholder="pk_test_..."
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowStripe(!showStripe)}
              className="absolute right-0 top-0 h-full px-3 py-2"
            >
              {showStripe ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showStripe ? "Masquer" : "Afficher"}
              </span>
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground flex items-start gap-1">
          <InfoIcon className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <span>Pour les fonctionnalités premium et les paiements (facultatif).</span>
        </p>
      </div>
    </CardContent>
  );
};

export default APIKeysList;
