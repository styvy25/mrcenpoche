
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Key, Palette, UserCircle } from "lucide-react";
import APIKeysSection from "./sections/APIKeysSection";
import AccountSection from "./sections/AccountSection";
import NotificationsSection from "./sections/NotificationsSection";
import AppearanceSection from "./sections/AppearanceSection";

interface SettingsTabsProps {
  defaultTab?: string;
}

const SettingsTabs = ({ defaultTab = "api-keys" }: SettingsTabsProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="mb-4 flex flex-wrap">
        <TabsTrigger value="api-keys" className="flex items-center gap-2">
          <Key className="h-4 w-4" />
          Clés API
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <UserCircle className="h-4 w-4" />
          Compte
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          Apparence
        </TabsTrigger>
      </TabsList>

      <TabsContent value="api-keys">
        <APIKeysSection />
      </TabsContent>

      <TabsContent value="account">
        <AccountSection />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSection />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
