
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, CheckCircle } from "lucide-react";

const CertificateGenerator = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="text-amber-500" />
          Générateur de Certificats
        </CardTitle>
        <CardDescription>
          Créez des certificats officiels pour les formations MRC
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
          <Award className="w-16 h-16 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold text-center mb-2">Certificat de Completion</h3>
          <p className="text-center text-muted-foreground mb-6">
            Générez un certificat en validant vos modules de formation
          </p>
          <Button className="bg-amber-500 hover:bg-amber-600">
            <CheckCircle className="mr-2 h-4 w-4" />
            Vérifier mon éligibilité
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button variant="outline" className="border-amber-500 text-amber-700 hover:bg-amber-50">
          <Download className="mr-2 h-4 w-4" />
          Télécharger un exemple
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CertificateGenerator;
