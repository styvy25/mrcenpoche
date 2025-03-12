
import React from "react";
import SettingsTabs from "@/components/settings/SettingsTabs";

const SettingsPage = () => {
  return (
    <div className="container py-8 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Paramètres</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Gérez vos paramètres et préférences d'application
        </p>
      </div>

      <SettingsTabs />
    </div>
  );
};

export default SettingsPage;
