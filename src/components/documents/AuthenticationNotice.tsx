
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const AuthenticationNotice = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-mrc-blue">Générateur de Supports PDF</CardTitle>
        <CardDescription>
          Vous devez être connecté pour utiliser cette fonctionnalité
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-8">
        <AlertTriangle className="text-yellow-500 h-16 w-16 mb-4" />
      </CardContent>
    </Card>
  );
};

export default AuthenticationNotice;
