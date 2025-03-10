
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Key, Youtube, Bot } from "lucide-react";

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
    <Card className="p-6 mb-8 bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-cameroon opacity-10 pointer-events-none"></div>
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gradient">Configuration des API</h3>
        <p className="text-sm opacity-70">Entrez vos clés API pour activer toutes les fonctionnalités</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-1 gap-2">
            <Youtube size={16} className="text-mrc-red" />
            Clé API YouTube
          </label>
          <Input
            type="password"
            value={keys.youtube}
            onChange={(e) => setKeys({ ...keys, youtube: e.target.value })}
            placeholder="Entrez votre clé API YouTube"
            className="bg-gray-800/50 border-mrc-red/30 focus-visible:border-mrc-red"
          />
          <p className="text-xs text-gray-400 mt-1">Utilisée pour extraire le contenu des vidéos du MRC</p>
        </div>
        <div>
          <label className="flex items-center text-sm font-medium text-gray-200 mb-1 gap-2">
            <Bot size={16} className="text-mrc-blue" />
            Clé API Perplexity
          </label>
          <Input
            type="password"
            value={keys.perplexity}
            onChange={(e) => setKeys({ ...keys, perplexity: e.target.value })}
            placeholder="Entrez votre clé API Perplexity"
            className="bg-gray-800/50 border-mrc-blue/30 focus-visible:border-mrc-blue"
          />
          <p className="text-xs text-gray-400 mt-1">Permet à Styvy237 de répondre intelligemment à vos questions</p>
        </div>
        <Button type="submit" className="w-full bg-gradient-mrc hover:opacity-90 transition-opacity">
          <Key size={16} className="mr-2" /> Sauvegarder les clés API
        </Button>
      </form>
    </Card>
  );
};
