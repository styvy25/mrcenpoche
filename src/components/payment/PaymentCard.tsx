
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface PaymentCardProps {
  headerContent: React.ReactNode;
  mainContent: React.ReactNode;
  showFooter: boolean;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ 
  headerContent, 
  mainContent, 
  showFooter 
}) => {
  return (
    <Card className="overflow-hidden border-2 transition-all duration-300 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-mrc-blue/10 to-mrc-green/10 pb-6">
        {headerContent}
      </CardHeader>
      
      <CardContent className="pt-6">
        {mainContent}
      </CardContent>
      
      {showFooter && (
        <CardFooter className="bg-gray-50 border-t py-4">
          <div className="w-full text-sm text-gray-500 text-center">
            <p className="flex items-center justify-center">
              Besoin d'aide? <a href="mailto:support@mrcenpoche.com" className="text-mrc-blue hover:underline inline-flex items-center ml-1">
                Contacter le support <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default PaymentCard;
