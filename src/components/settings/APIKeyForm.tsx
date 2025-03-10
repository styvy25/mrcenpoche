
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface APIKeys {
  youtube: string;
  perplexity: string;
}

export const APIKeyForm = () => {
  const [keys, setKeys] = useState<APIKeys>(() => {
    const savedKeys = localStorage.getItem("api_keys");
    return savedKeys ? JSON.parse(savedKeys) : { youtube: "", perplexity: "" };
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("api_keys", JSON.stringify(keys));
    toast({
      title: "Clés API sauvegardées",
      description: "Vos clés API ont été enregistrées avec succès.",
    });
  };

  return (
    <Card className="p-6 mb-8 bg-white/5 backdrop-blur-lg border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Clé API YouTube
          </label>
          <Input
            type="password"
            value={keys.youtube}
            onChange={(e) => setKeys({ ...keys, youtube: e.target.value })}
            placeholder="Entrez votre clé API YouTube"
            className="bg-gray-800/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Clé API Perplexity
          </label>
          <Input
            type="password"
            value={keys.perplexity}
            onChange={(e) => setKeys({ ...keys, perplexity: e.target.value })}
            placeholder="Entrez votre clé API Perplexity"
            className="bg-gray-800/50"
          />
        </div>
        <Button type="submit" className="w-full bg-mrc-blue hover:bg-blue-700">
          Sauvegarder les clés API
        </Button>
      </form>
    </Card>
  );
};
