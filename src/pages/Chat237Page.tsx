
import React, { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import Chat237 from "@/components/chat/Chat237";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { Info, MessageCircle } from "lucide-react";
import { useNotificationsDemo } from "@/hooks/useNotificationsDemo";

const Chat237Page = () => {
  const { isAuthenticated } = useAuth();
  const { createDemoNotifications } = useNotificationsDemo();
  
  // Create demo notifications when visiting the chat page
  useEffect(() => {
    if (isAuthenticated) {
      createDemoNotifications();
    }
  }, [isAuthenticated, createDemoNotifications]);
  
  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
                Chat 237
              </span>
            </h1>
            <p className="text-muted-foreground">
              Discutez avec d'autres sympathisants et militants du MRC en temps réel
            </p>
          </div>
        </div>
        
        {isAuthenticated ? (
          <Chat237 containerClassName="min-h-[calc(100vh-13rem)]" />
        ) : (
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Connexion requise
              </CardTitle>
              <CardDescription>
                Vous devez être connecté pour accéder au chat
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-6 text-center">
                Rejoignez la communauté MRC pour échanger avec d'autres militants et sympathisants.
                Connectez-vous ou créez un compte pour commencer à discuter.
              </p>
              <AuthDialog />
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Chat237Page;
