
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import Forum from "@/components/forum/Forum";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import AuthDialog from "@/components/auth/AuthDialog";
import { Info, MessageSquare } from "lucide-react";

const ForumPage = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <MainLayout>
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-purple-600" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                Forum MRC
              </span>
            </h1>
            <p className="text-muted-foreground">
              Échangez des idées et participez aux discussions avec la communauté MRC
            </p>
          </div>
        </div>
        
        {isAuthenticated ? (
          <Forum containerClassName="min-h-[calc(100vh-13rem)]" />
        ) : (
          <Card className="border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950">
            <CardContent className="flex flex-col items-center p-8">
              <MessageSquare className="h-12 w-12 text-purple-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Connexion requise</h2>
              <p className="mb-6 text-center max-w-md">
                Rejoignez la communauté MRC pour participer aux discussions et échanger des idées avec d'autres militants et sympathisants.
              </p>
              <AuthDialog />
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ForumPage;
