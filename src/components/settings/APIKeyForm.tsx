
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Save } from "lucide-react";

interface APIKeyFormProps {
  serviceKey: string;
  serviceLabel: string;
  serviceDescription: string;
}

export function APIKeyForm({ serviceKey, serviceLabel, serviceDescription }: APIKeyFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load the API key from localStorage
    const savedKey = localStorage.getItem(serviceKey);
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, [serviceKey]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving with a short delay
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem(serviceKey, apiKey);
      
      // Show success toast
      toast({
        title: "Clé API enregistrée",
        description: "Votre clé API a été enregistrée avec succès.",
        variant: "default"
      });
      
      setIsSaving(false);
    }, 500);
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {serviceDescription}
      </p>
      
      <div className="flex flex-col space-y-2">
        <Label htmlFor="api-key">{serviceLabel}</Label>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              id="api-key"
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Entrez votre clé API ici"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2"
              onClick={toggleShowKey}
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !apiKey}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
