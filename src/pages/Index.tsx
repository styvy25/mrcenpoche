
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, FileText, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-2 text-center">MRC en Poche</h1>
        <p className="text-center text-muted-foreground mb-8">
          Votre assistant politique personnel
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 flex flex-col items-center hover:shadow-md transition-shadow">
            <MessageSquare className="h-12 w-12 text-mrc-blue mb-4" />
            <h2 className="text-xl font-semibold mb-3">Assistant IA</h2>
            <p className="text-center mb-6 text-muted-foreground">
              Posez vos questions sur le MRC, la politique camerounaise et obtenez des réponses instantanées.
            </p>
            <Link to="/assistant" className="mt-auto">
              <Button className="w-full">
                Discuter avec l'assistant
              </Button>
            </Link>
          </Card>
          
          <Card className="p-6 flex flex-col items-center hover:shadow-md transition-shadow">
            <FileText className="h-12 w-12 text-mrc-green mb-4" />
            <h2 className="text-xl font-semibold mb-3">Documents</h2>
            <p className="text-center mb-6 text-muted-foreground">
              Générez des documents officiels, des rapports et des formulaires personnalisés.
            </p>
            <Link to="/documents" className="mt-auto">
              <Button className="w-full">
                Créer un document
              </Button>
            </Link>
          </Card>
          
          <Card className="p-6 flex flex-col items-center hover:shadow-md transition-shadow md:col-span-2">
            <CreditCard className="h-12 w-12 text-amber-500 mb-4" />
            <h2 className="text-xl font-semibold mb-3">Premium</h2>
            <p className="text-center mb-6 text-muted-foreground">
              Accédez à toutes les fonctionnalités sans limite avec notre abonnement premium.
            </p>
            <Link to="/payment" className="mt-auto">
              <Button variant="outline" className="w-full border-amber-500 text-amber-700 hover:bg-amber-50">
                Découvrir les avantages
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
