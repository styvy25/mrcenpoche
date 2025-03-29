
import React from "react";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useApiKeys } from "@/hooks/useApiKeys";

const APIKeyManagerHeader = () => {
  const { keyStatus } = useApiKeys();
  
  // Count active services
  const activeServiceCount = Object.values(keyStatus).filter(Boolean).length;
  const totalServices = Object.keys(keyStatus).length;
  
  return (
    <div className="p-6 pb-2 border-b">
      <CardTitle className="mb-2">Clés API</CardTitle>
      <CardDescription>
        Configurez vos clés API pour activer toutes les fonctionnalités. 
        {activeServiceCount > 0 ? (
          <span className="ml-1">
            {activeServiceCount}/{totalServices} services actifs.
          </span>
        ) : (
          <span className="ml-1">
            Aucun service n'est actuellement activé.
          </span>
        )}
      </CardDescription>
    </div>
  );
};

export default APIKeyManagerHeader;
