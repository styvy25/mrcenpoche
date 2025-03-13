
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, KeyRound, User2, Brush, Shield } from "lucide-react";
import AccountSection from "./sections/AccountSection";
import APIKeysSection from "./sections/APIKeysSection";
import AppearanceSection from "./sections/AppearanceSection";
import NotificationsSection from "./sections/NotificationsSection";
import AuditAndTestSection from "./sections/AuditAndTestSection";

const SettingsTabs = () => {
  return (
    <Tabs defaultValue="api-keys" className="w-full">
      <TabsList className="w-full sm:w-auto mb-8 grid grid-cols-3 sm:grid-cols-5 gap-2">
        <TabsTrigger value="api-keys" className="flex items-center gap-2">
          <KeyRound className="h-4 w-4" />
          <span className="hidden sm:inline-block">API Keys</span>
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User2 className="h-4 w-4" />
          <span className="hidden sm:inline-block">Compte</span>
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Brush className="h-4 w-4" />
          <span className="hidden sm:inline-block">Apparence</span>
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          <span className="hidden sm:inline-block">Notifications</span>
        </TabsTrigger>
        <TabsTrigger value="audit" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline-block">Audit</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="api-keys">
        <APIKeysSection />
      </TabsContent>

      <TabsContent value="account">
        <AccountSection />
      </TabsContent>

      <TabsContent value="appearance">
        <AppearanceSection />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsSection />
      </TabsContent>
      
      <TabsContent value="audit">
        <AuditAndTestSection />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
