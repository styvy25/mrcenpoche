
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Key, Youtube, Bot, Info } from "lucide-react";

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
    
    // Validation basique
    if (!keys.youtube || !keys.perplexity) {
      toast({
        title: "Clés manquantes",
        description: "Veuillez renseigner les deux clés API pour activer toutes les fonctionnalités.",
        variant: "destructive"
      });
      return;
    }
    
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
          <div className="flex items-start gap-1 text-xs text-gray-400 mt-1">
            <Info size={12} className="mt-0.5 flex-shrink-0" />
            <p>Utilisée pour rechercher et analyser des vidéos du MRC. Pour obtenir une clé: <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-mrc-red hover:underline">console Google</a></p>
          </div>
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
          <div className="flex items-start gap-1 text-xs text-gray-400 mt-1">
            <Info size={12} className="mt-0.5 flex-shrink-0" />
            <p>Permet à Styvy237 de répondre intelligemment à vos questions. Obtenir une clé: <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-mrc-blue hover:underline">Perplexity AI</a></p>
          </div>
        </div>
        <div className="bg-yellow-500/10 p-3 rounded-md border border-yellow-500/20 text-xs text-gray-300">
          <p><strong>Note importante:</strong> Vos clés API sont stockées uniquement dans votre navigateur et ne sont jamais partagées. Pour protéger votre vie privée, elles ne sont pas envoyées à nos serveurs.</p>
        </div>
        <Button type="submit" className="w-full bg-gradient-mrc hover:opacity-90 transition-opacity">
          <Key size={16} className="mr-2" /> Sauvegarder les clés API
        </Button>
      </form>
    </Card>
  );
};
