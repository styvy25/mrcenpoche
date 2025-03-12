
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Lock } from 'lucide-react';

const PaymentSummary: React.FC = () => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <h3 className="text-lg font-semibold">Récapitulatif</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Abonnement</span>
              <span className="font-medium">Premium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Période</span>
              <span className="font-medium">Mensuel</span>
            </div>
            <Separator />
            <div className="flex justify-between pt-2">
              <span className="font-medium">Total</span>
              <span className="font-bold">9,99 €</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t text-xs text-gray-500 flex justify-center">
          <Lock className="h-3 w-3 mr-1" /> Transaction sécurisée
        </CardFooter>
      </Card>
      
      <Card>
        <CardContent className="pt-4">
          <h3 className="font-medium mb-2 text-sm">Nous acceptons</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-gray-50">Visa</Badge>
            <Badge variant="outline" className="bg-gray-50">Mastercard</Badge>
            <Badge variant="outline" className="bg-gray-50">PayPal</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummary;
