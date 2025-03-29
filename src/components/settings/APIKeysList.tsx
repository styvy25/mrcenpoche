
import React from "react";
import { CardContent } from "@/components/ui/card";
import APIKeyInput from "./APIKeyInput";
import { useApiKeys } from "@/hooks/useApiKeys";

interface ApiKeyStatus {
  perplexity: boolean;
  youtube: boolean;
  stripe: boolean;
}

interface APIKeysListProps {
  perplexityKey: string;
  youtubeKey: string;
  stripeKey: string;
  keyStatus: ApiKeyStatus;
  onPerplexityKeyChange: (value: string) => void;
  onYoutubeKeyChange: (value: string) => void;
  onStripeKeyChange: (value: string) => void;
}

const APIKeysList = ({
  perplexityKey,
  youtubeKey,
  stripeKey,
  keyStatus,
  onPerplexityKeyChange,
  onYoutubeKeyChange,
  onStripeKeyChange
}: APIKeysListProps) => {
  return (
    <CardContent className="space-y-4">
      <APIKeyInput
        id="perplexity-key"
        label="Clé API Perplexity"
        value={perplexityKey}
        onChange={onPerplexityKeyChange}
        isValid={keyStatus.perplexity}
        placeholder="Clé API Perplexity pour l'assistant IA"
        infoText="Utilisée pour l'assistant IA et la génération de contenu. Obtenir une clé sur"
        linkText="perplexity.ai/settings/api"
        linkUrl="https://www.perplexity.ai/settings/api"
      />
      
      <APIKeyInput
        id="youtube-key"
        label="Clé API YouTube"
        value={youtubeKey}
        onChange={onYoutubeKeyChange}
        isValid={keyStatus.youtube}
        placeholder="Clé API YouTube pour les vidéos"
        infoText="Utilisée pour les vidéos et formations. Obtenir une clé sur"
        linkText="console.cloud.google.com"
        linkUrl="https://console.cloud.google.com/apis/credentials"
      />
      
      <APIKeyInput
        id="stripe-key"
        label="Clé API Stripe"
        value={stripeKey}
        onChange={onStripeKeyChange}
        isValid={keyStatus.stripe}
        placeholder="Clé API Stripe pour les paiements"
        infoText="Utilisée pour les paiements et abonnements. Obtenir une clé sur"
        linkText="dashboard.stripe.com/apikeys"
        linkUrl="https://dashboard.stripe.com/apikeys"
      />
    </CardContent>
  );
};

export default APIKeysList;
