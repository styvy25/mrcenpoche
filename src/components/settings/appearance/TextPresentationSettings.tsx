
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TextPresentationSettingsProps {
  fontStyle: string;
  textSize: string;
  onFontStyleChange: (value: string) => void;
  onTextSizeChange: (value: string) => void;
}

const TextPresentationSettings = ({ 
  fontStyle, 
  textSize, 
  onFontStyleChange, 
  onTextSizeChange 
}: TextPresentationSettingsProps) => {
  return (
    <div className="grid gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-medium">Présentation du texte</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="font-style">Style de police</Label>
          <Select value={fontStyle} onValueChange={onFontStyleChange}>
            <SelectTrigger id="font-style">
              <SelectValue placeholder="Choisir un style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Standard</SelectItem>
              <SelectItem value="serif">Académique (Serif)</SelectItem>
              <SelectItem value="academic">Éditorial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="text-size">Taille du texte</Label>
          <Select value={textSize} onValueChange={onTextSizeChange}>
            <SelectTrigger id="text-size">
              <SelectValue placeholder="Choisir une taille" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">Petit</SelectItem>
              <SelectItem value="default">Normal</SelectItem>
              <SelectItem value="large">Grand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TextPresentationSettings;
