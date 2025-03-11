
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, UserCircle, Download, Trash2 } from "lucide-react";

const AccountSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Compte
        </CardTitle>
        <CardDescription>
          Gérez les paramètres de votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Profil</h3>
            <p className="text-sm text-gray-500">Modifiez vos informations personnelles</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings2 className="h-4 w-4" />
            Modifier
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Données personnelles</h3>
            <p className="text-sm text-gray-500">Téléchargez ou supprimez vos données</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exporter
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSection;
