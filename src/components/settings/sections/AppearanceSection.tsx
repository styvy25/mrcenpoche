
import React from "react";
import { Separator } from "@/components/ui/separator";
import DisplayModeSettings from "../appearance/DisplayModeSettings";
import InterfaceSettings from "../appearance/InterfaceSettings";
import TextPresentationSettings from "../appearance/TextPresentationSettings";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useTour } from "@/components/tour/TourContext";
import { useAppearanceSettings } from "@/hooks/useAppearanceSettings";

const AppearanceSection = () => {
  const { resetTour } = useTour();
  const {
    darkMode, 
    setDarkMode,
    animations,
    setAnimations,
    immersiveBackground,
    setImmersiveBackground,
    compactMode,
    setCompactMode,
    fontStyle,
    setFontStyle,
    textSize,
    setTextSize
  } = useAppearanceSettings();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Apparence</h3>
        <p className="text-sm text-muted-foreground">
          Personnalisez l'apparence et le comportement de l'application
        </p>
      </div>
      <Separator />
      
      <DisplayModeSettings 
        darkMode={darkMode} 
        onDarkModeChange={setDarkMode} 
      />
      <Separator />
      
      <InterfaceSettings 
        animations={animations}
        immersiveBackground={immersiveBackground}
        compactMode={compactMode}
        onAnimationsChange={setAnimations}
        onImmersiveBackgroundChange={setImmersiveBackground}
        onCompactModeChange={setCompactMode}
      />
      <Separator />
      
      <TextPresentationSettings 
        fontStyle={fontStyle}
        textSize={textSize}
        onFontStyleChange={setFontStyle}
        onTextSizeChange={setTextSize}
      />
      <Separator />
      
      <div>
        <h3 className="text-base font-medium mb-2">Guide d'utilisation</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Relancez le guide d'utilisation pour redécouvrir les fonctionnalités de l'application
        </p>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={resetTour}
        >
          <HelpCircle className="h-4 w-4" />
          Relancer le guide d'utilisation
        </Button>
      </div>
    </div>
  );
};

export default AppearanceSection;
