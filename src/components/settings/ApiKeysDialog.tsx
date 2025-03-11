
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Key, Youtube, Bot, Info, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/custom-dialog";

interface ApiKeysProps {
  onApiKeysSet?: () => void;
  triggerButton?: React.ReactNode;
}

interface APIKeys {
  youtube: string;
  perplexity: string;
}

export const ApiKeysDialog = ({ onApiKeysSet, triggerButton }: ApiKeysProps) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<APIKeys>(() => {
    const savedKeys = localStorage.getItem("api_keys");
    return savedKeys ? JSON.parse(savedKeys) : { youtube: "", perplexity: "" };
  });
  const { toast } = useToast();
  const [keysConfigured, setKeysConfigured] = useState(false);

  useEffect(() => {
    const savedKeys = localStorage.getItem("api_keys");
    if (savedKeys) {
      const parsedKeys = JSON.parse(savedKeys);
      if (parsedKeys.youtube && parsedKeys.perplexity) {
        setKeysConfigured(true);
      }
    }
  }, []);

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
    setKeysConfigured(true);
    
    toast({
      title: "Clés API sauvegardées",
      description: "Vos clés API ont été enregistrées avec succès.",
    });
    
    setOpen(false);
    
    if (onApiKeysSet) {
      onApiKeysSet();
    }
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm" className="gap-2">
      {keysConfigured ? (
        <>
          <Check size={16} className="text-green-500" />
          <span>Clés API configurées</span>
        </>
      ) : (
        <>
          <Key size={16} />
          <span>Configurer les clés API</span>
        </>
      )}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configuration des clés API</DialogTitle>
          <DialogDescription>
            Entrez vos clés API pour activer toutes les fonctionnalités de l'application
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-200 mb-1 gap-2">
              <Youtube size={16} className="text-red-500" />
              Clé API YouTube
            </label>
            <Input
              type="password"
              value={keys.youtube}
              onChange={(e) => setKeys({ ...keys, youtube: e.target.value })}
              placeholder="Entrez votre clé API YouTube"
              className="bg-gray-800/50 border-red-500/30 focus-visible:border-red-500"
            />
            <div className="flex items-start gap-1 text-xs text-gray-400 mt-1">
              <Info size={12} className="mt-0.5 flex-shrink-0" />
              <p>Utilisée pour rechercher et analyser des vidéos. <a href="https://console.developers.google.com/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline">Obtenir une clé</a></p>
            </div>
          </div>
          
          <div>
            <label className="flex items-center text-sm font-medium text-gray-200 mb-1 gap-2">
              <Bot size={16} className="text-blue-500" />
              Clé API Perplexity
            </label>
            <Input
              type="password"
              value={keys.perplexity}
              onChange={(e) => setKeys({ ...keys, perplexity: e.target.value })}
              placeholder="Entrez votre clé API Perplexity"
              className="bg-gray-800/50 border-blue-500/30 focus-visible:border-blue-500"
            />
            <div className="flex items-start gap-1 text-xs text-gray-400 mt-1">
              <Info size={12} className="mt-0.5 flex-shrink-0" />
              <p>Permet à l'assistant IA de répondre intelligemment. <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Obtenir une clé</a></p>
            </div>
          </div>
          
          <div className="bg-yellow-500/10 p-3 rounded-md border border-yellow-500/20 text-xs text-gray-300">
            <p><strong>Note importante:</strong> Vos clés API sont stockées uniquement dans votre navigateur et ne sont jamais partagées. Pour protéger votre vie privée, elles ne sont pas envoyées à nos serveurs.</p>
          </div>
          
          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-green-500 hover:opacity-90 transition-opacity">
              <Key size={16} className="mr-2" /> Sauvegarder les clés API
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeysDialog;
