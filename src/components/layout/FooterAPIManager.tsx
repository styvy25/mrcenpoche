
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Settings2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { testYouTubeApiKey } from "@/components/assistant/services/youtubeService";
import { testPerplexityApiKey } from "@/components/assistant/services/perplexityService";

const FooterAPIManager = () => {
  const [open, setOpen] = useState(false);
  const [youtubeKey, setYoutubeKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      // Load keys from localStorage
      const storedKeys = localStorage.getItem('api_keys');
      if (storedKeys) {
        try {
          const parsedKeys = JSON.parse(storedKeys);
          setYoutubeKey(parsedKeys.youtube || "");
          setPerplexityKey(parsedKeys.perplexity || "");
        } catch (error) {
          console.error("Error parsing stored keys:", error);
        }
      }
    }
    setOpen(open);
  };

  const handleSave = async () => {
    setIsTesting(true);
    
    let youtubeValid = true;
    let perplexityValid = true;
    
    // Test YouTube API key if provided
    if (youtubeKey) {
      youtubeValid = await testYouTubeApiKey(youtubeKey);
      if (!youtubeValid) {
        toast({
          title: "Clé YouTube API invalide",
          description: "La clé YouTube API fournie est invalide ou a expiré.",
          variant: "destructive",
        });
      }
    }
    
    // Test Perplexity API key if provided
    if (perplexityKey) {
      perplexityValid = await testPerplexityApiKey(perplexityKey);
      if (!perplexityValid) {
        toast({
          title: "Clé Perplexity API invalide",
          description: "La clé Perplexity API fournie est invalide ou a expiré.",
          variant: "destructive",
        });
      }
    }
    
    // Save keys if both are valid or empty
    if ((youtubeValid || !youtubeKey) && (perplexityValid || !perplexityKey)) {
      const apiKeys = {
        youtube: youtubeKey || null,
        perplexity: perplexityKey || null
      };
      
      localStorage.setItem('api_keys', JSON.stringify(apiKeys));
      
      // Try to save to Supabase if user is authenticated
      try {
        const { saveApiKeysToSupabase } = await import('@/services/supabaseService');
        await saveApiKeysToSupabase(apiKeys);
      } catch (error) {
        console.error("Error saving keys to Supabase:", error);
        // Continue even if Supabase save fails, as we've already saved to localStorage
      }
      
      toast({
        title: "Configuration sauvegardée",
        description: "Vos clés API ont été enregistrées avec succès.",
      });
      
      setOpen(false);
    }
    
    setIsTesting(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300"
        onClick={() => handleOpenChange(true)}
      >
        <Settings2 size={16} />
        <span>Configurer les API</span>
      </Button>
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configuration des API</DialogTitle>
            <DialogDescription>
              Entrez vos clés API pour débloquer toutes les fonctionnalités de la plateforme.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="youtube-key">Clé YouTube API</Label>
              <Input
                id="youtube-key"
                placeholder="AIza..."
                value={youtubeKey}
                onChange={(e) => setYoutubeKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Utilisée pour la recherche de vidéos et l'intégration avec YouTube.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="perplexity-key">Clé Perplexity API</Label>
              <Input
                id="perplexity-key"
                placeholder="pplx-..."
                value={perplexityKey}
                onChange={(e) => setPerplexityKey(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Utilisée pour l'assistant IA et la génération de contenu.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              disabled={isTesting}
            >
              Annuler
            </Button>
            <Button 
              type="button" 
              onClick={handleSave}
              disabled={isTesting}
            >
              {isTesting ? "Test en cours..." : "Enregistrer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FooterAPIManager;
