
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Key } from "lucide-react";

const APIKeyManagerHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Key className="h-5 w-5 text-mrc-blue" />
        Gestionnaire de clés API
      </CardTitle>
      <CardDescription>
        Configurez vos clés API pour activer les fonctionnalités en ligne de MRC en Poche
      </CardDescription>
    </CardHeader>
  );
};

export default APIKeyManagerHeader;
