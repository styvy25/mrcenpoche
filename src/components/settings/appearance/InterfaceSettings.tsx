
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface InterfaceSettingsProps {
  animations: boolean;
  immersiveBackground: boolean;
  compactMode: boolean;
  onAnimationsChange: (checked: boolean) => void;
  onImmersiveBackgroundChange: (checked: boolean) => void;
  onCompactModeChange: (checked: boolean) => void;
}

const InterfaceSettings = ({
  animations,
  immersiveBackground,
  compactMode,
  onAnimationsChange,
  onImmersiveBackgroundChange,
  onCompactModeChange
}: InterfaceSettingsProps) => {
  return (
    <>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
        <div>
          <Label htmlFor="animations">Animations</Label>
          <p className="text-sm text-gray-500">Activer les animations de l'interface</p>
        </div>
        <Switch 
          id="animations" 
          checked={animations}
          onCheckedChange={onAnimationsChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="immersive-background">Arrière-plan immersif</Label>
          <p className="text-sm text-gray-500">Afficher un arrière-plan dynamique</p>
        </div>
        <Switch 
          id="immersive-background" 
          checked={immersiveBackground}
          onCheckedChange={onImmersiveBackgroundChange}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label htmlFor="compact-mode">Mode compact</Label>
          <p className="text-sm text-gray-500">Réduire l'espacement entre les éléments</p>
        </div>
        <Switch 
          id="compact-mode" 
          checked={compactMode}
          onCheckedChange={onCompactModeChange}
        />
      </div>
    </>
  );
};

export default InterfaceSettings;
