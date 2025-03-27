
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Video } from "lucide-react";

const ApiKeyMissing = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-mrc-red" />
          StreamYard MRC
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Configuration requise</h3>
        <p className="text-center text-muted-foreground mb-4">
          Vous devez configurer votre clé API YouTube pour accéder aux livestreams.
        </p>
        <Button 
          variant="default" 
          onClick={() => window.location.href = "/settings"}
        >
          Configurer l'API YouTube
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiKeyMissing;
