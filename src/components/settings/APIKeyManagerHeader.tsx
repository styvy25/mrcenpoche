
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield } from "lucide-react";

const APIKeyManagerHeader = () => {
  return (
    <CardHeader>
      <div className="flex items-center gap-2">
        <Shield className="h-5 w-5 text-primary" />
        <CardTitle>Clés API</CardTitle>
      </div>
      <CardDescription>
        Configurez vos clés API pour accéder à toutes les fonctionnalités de l'application.
        Les clés sont stockées en local et ne sont jamais partagées.
      </CardDescription>
    </CardHeader>
  );
};

export default APIKeyManagerHeader;
