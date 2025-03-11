
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AppearanceSection = () => {
  const [fontStyle, setFontStyle] = useState("default");
  const [textSize, setTextSize] = useState("default");
  const [darkMode, setDarkMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [immersiveBackground, setImmersiveBackground] = useState(false);
  const { toast } = useToast();

  // Charger les préférences depuis localStorage au chargement
  useEffect(() => {
    const savedFontStyle = localStorage.getItem("fontStyle") || "default";
    const savedTextSize = localStorage.getItem("textSize") || "default";
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const savedAnimations = localStorage.getItem("animations") !== "false";
    const savedCompactMode = localStorage.getItem("compactMode") === "true";
    const savedImmersiveBackground = localStorage.getItem("immersiveBackground") === "true";

    setFontStyle(savedFontStyle);
    setTextSize(savedTextSize);
    setDarkMode(savedDarkMode);
    setAnimations(savedAnimations);
    setCompactMode(savedCompactMode);
    setImmersiveBackground(savedImmersiveBackground);

    // Appliquer les classes au document
    updateDocumentClasses(savedDarkMode, savedAnimations, savedTextSize, savedFontStyle, savedImmersiveBackground);
  }, []);

  const updateDocumentClasses = (
    isDark: boolean,
    hasAnimations: boolean,
    size: string,
    font: string,
    hasImmersiveBackground: boolean
  ) => {
    // Gestion du mode sombre
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Gestion des animations
    if (hasAnimations) {
      document.documentElement.classList.remove("no-animations");
    } else {
      document.documentElement.classList.add("no-animations");
    }

    // Gestion de la taille du texte
    document.documentElement.classList.remove("text-sm", "text-base", "text-lg");
    switch (size) {
      case "small":
        document.documentElement.classList.add("text-sm");
        break;
      case "large":
        document.documentElement.classList.add("text-lg");
        break;
      default:
        document.documentElement.classList.add("text-base");
    }

    // Gestion de la police
    document.documentElement.classList.remove("font-serif", "font-sans", "font-academic");
    switch (font) {
      case "serif":
        document.documentElement.classList.add("font-serif");
        break;
      case "academic":
        document.documentElement.classList.add("font-academic");
        break;
      default:
        document.documentElement.classList.add("font-sans");
    }

    // Gestion de l'arrière-plan immersif
    if (hasImmersiveBackground) {
      document.body.classList.add("immersive-background");
    } else {
      document.body.classList.remove("immersive-background");
    }
  };

  const handleDarkModeChange = (checked: boolean) => {
    setDarkMode(checked);
    localStorage.setItem("darkMode", checked.toString());
    updateDocumentClasses(checked, animations, textSize, fontStyle, immersiveBackground);
    
    toast({
      title: checked ? "Mode sombre activé" : "Mode sombre désactivé",
      description: checked ? "L'interface est maintenant en mode sombre." : "L'interface est maintenant en mode clair.",
    });
  };

  const handleAnimationsChange = (checked: boolean) => {
    setAnimations(checked);
    localStorage.setItem("animations", checked.toString());
    updateDocumentClasses(darkMode, checked, textSize, fontStyle, immersiveBackground);
  };

  const handleCompactModeChange = (checked: boolean) => {
    setCompactMode(checked);
    localStorage.setItem("compactMode", checked.toString());
    
    if (checked) {
      document.documentElement.classList.add("compact-mode");
    } else {
      document.documentElement.classList.remove("compact-mode");
    }
  };

  const handleFontStyleChange = (value: string) => {
    setFontStyle(value);
    localStorage.setItem("fontStyle", value);
    updateDocumentClasses(darkMode, animations, textSize, value, immersiveBackground);
    
    toast({
      title: "Style de police modifié",
      description: "Le style de police a été mis à jour.",
    });
  };

  const handleTextSizeChange = (value: string) => {
    setTextSize(value);
    localStorage.setItem("textSize", value);
    updateDocumentClasses(darkMode, animations, value, fontStyle, immersiveBackground);
  };

  const handleImmersiveBackgroundChange = (checked: boolean) => {
    setImmersiveBackground(checked);
    localStorage.setItem("immersiveBackground", checked.toString());
    updateDocumentClasses(darkMode, animations, textSize, fontStyle, checked);
    
    toast({
      title: checked ? "Arrière-plan immersif activé" : "Arrière-plan immersif désactivé",
      description: checked 
        ? "L'arrière-plan immersif est maintenant actif." 
        : "L'arrière-plan standard est maintenant actif.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apparence</CardTitle>
        <CardDescription>
          Personnalisez l'apparence et l'ergonomie de l'application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode">Mode sombre</Label>
            <p className="text-sm text-gray-500">Activer le thème sombre</p>
          </div>
          <Switch 
            id="dark-mode" 
            checked={darkMode}
            onCheckedChange={handleDarkModeChange}
          />
        </div>

        <div className="grid gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-medium">Présentation du texte</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="font-style">Style de police</Label>
              <Select value={fontStyle} onValueChange={handleFontStyleChange}>
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
              <Select value={textSize} onValueChange={handleTextSizeChange}>
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

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <div>
            <Label htmlFor="animations">Animations</Label>
            <p className="text-sm text-gray-500">Activer les animations de l'interface</p>
          </div>
          <Switch 
            id="animations" 
            checked={animations}
            onCheckedChange={handleAnimationsChange}
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
            onCheckedChange={handleImmersiveBackgroundChange}
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
            onCheckedChange={handleCompactModeChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSection;
