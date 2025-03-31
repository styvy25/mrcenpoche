
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Award, CheckCircle } from "lucide-react";
import { useScreenSize } from '@/hooks/useScreenSize';

const CertificateGenerator = () => {
  const { isMobile } = useScreenSize();
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
          <Award className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-amber-500`} />
          Générateur de Certificats
        </CardTitle>
        <CardDescription className={isMobile ? 'text-xs' : 'text-sm'}>
          Créez des certificats officiels pour les formations MRC
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className={`flex flex-col items-center justify-center ${isMobile ? 'p-4' : 'p-8'} border-2 border-dashed rounded-lg`}>
          <Award className={`${isMobile ? 'w-12 h-12' : 'w-16 h-16'} text-amber-500 mb-4`} />
          <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-center mb-2`}>Certificat de Completion</h3>
          <p className={`text-center text-muted-foreground mb-6 ${isMobile ? 'text-xs' : 'text-sm'}`}>
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
