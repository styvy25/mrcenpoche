
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AppearanceSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Apparence</CardTitle>
        <CardDescription>
          Personnalisez l'apparence de l'application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode">Mode sombre</Label>
            <p className="text-sm text-gray-500">Activer le thème sombre</p>
          </div>
          <Switch id="dark-mode" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="animations">Animations</Label>
            <p className="text-sm text-gray-500">Activer les animations de l'interface</p>
          </div>
          <Switch id="animations" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="compact-mode">Mode compact</Label>
            <p className="text-sm text-gray-500">Réduire l'espacement entre les éléments</p>
          </div>
          <Switch id="compact-mode" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSection;
