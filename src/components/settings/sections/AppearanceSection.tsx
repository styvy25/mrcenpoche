
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppearanceSettings } from "@/hooks/useAppearanceSettings";
import DisplayModeSettings from "../appearance/DisplayModeSettings";
import TextPresentationSettings from "../appearance/TextPresentationSettings";
import InterfaceSettings from "../appearance/InterfaceSettings";

const AppearanceSection = () => {
  const {
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
    handleImmersiveBackgroundChange
  } = useAppearanceSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apparence</CardTitle>
        <CardDescription>
          Personnalisez l'apparence et l'ergonomie de l'application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <DisplayModeSettings 
          darkMode={darkMode} 
          onDarkModeChange={handleDarkModeChange}
        />

        <TextPresentationSettings 
          fontStyle={fontStyle}
          textSize={textSize}
          onFontStyleChange={handleFontStyleChange}
          onTextSizeChange={handleTextSizeChange}
        />

        <InterfaceSettings 
          animations={animations}
          immersiveBackground={immersiveBackground}
          compactMode={compactMode}
          onAnimationsChange={handleAnimationsChange}
          onImmersiveBackgroundChange={handleImmersiveBackgroundChange}
          onCompactModeChange={handleCompactModeChange}
        />
      </CardContent>
    </Card>
  );
};

export default AppearanceSection;
