
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface DisplayModeSettingsProps {
  darkMode: boolean;
  onDarkModeChange: (checked: boolean) => void;
}

const DisplayModeSettings = ({ darkMode, onDarkModeChange }: DisplayModeSettingsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label htmlFor="dark-mode">Mode sombre</Label>
        <p className="text-sm text-gray-500">Activer le thème sombre</p>
      </div>
      <Switch 
        id="dark-mode" 
        checked={darkMode}
        onCheckedChange={onDarkModeChange}
      />
    </div>
  );
};

export default DisplayModeSettings;
