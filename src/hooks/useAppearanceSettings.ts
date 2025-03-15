
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAppearanceSettings = () => {
  const [fontStyle, setFontStyle] = useState("default");
  const [textSize, setTextSize] = useState("default");
  const [darkMode, setDarkMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [immersiveBackground, setImmersiveBackground] = useState(false);
  const { toast } = useToast();

  // Load preferences from localStorage on component mount
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

    // Apply classes to document
    updateDocumentClasses(
      savedDarkMode,
      savedAnimations,
      savedTextSize,
      savedFontStyle,
      savedImmersiveBackground
    );
  }, []);

  const updateDocumentClasses = (
    isDark: boolean,
    hasAnimations: boolean,
    size: string,
    font: string,
    hasImmersiveBackground: boolean
  ) => {
    // Dark mode management
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Animation management
    if (hasAnimations) {
      document.documentElement.classList.remove("no-animations");
    } else {
      document.documentElement.classList.add("no-animations");
    }

    // Text size management
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

    // Font management
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

    // Immersive background management
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

  return {
    fontStyle,
    textSize,
    darkMode,
    animations,
    compactMode,
    immersiveBackground,
    handleDarkModeChange,
    handleAnimationsChange,
    handleCompactModeChange,
    handleFontStyleChange,
    handleTextSizeChange,
    handleImmersiveBackgroundChange,
  };
};
