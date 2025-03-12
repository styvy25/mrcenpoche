
import React from "react";
import { Separator } from "@/components/ui/separator";
import APIKeyManager from "@/components/settings/APIKeyManager";
import OfflineFeaturesCard from "@/components/settings/OfflineFeaturesCard";

const APIKeysSection = () => {
  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Configuration des API</h2>
      </div>
      <Separator className="my-2" />
      <APIKeyManager />
      <OfflineFeaturesCard />
    </div>
  );
};

export default APIKeysSection;
