
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Tarifs simples et transparents
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choisissez l'offre qui correspond à vos besoins et commencez votre formation dès aujourd'hui.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border-t-4 border-t-gray-500">
            <CardHeader>
              <CardTitle className="text-xl">Gratuit</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">0€</span>
                <span className="text-gray-500 ml-2">/ mois</span>
              </div>
              <CardDescription className="mt-2">
                L'essentiel pour démarrer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accès à 3 modules de formation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Assistant IA (limité à 10 questions/jour)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Génération de PDF (limité à 3/mois)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Suivi de progression basique</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Commencer gratuitement
              </Button>
            </CardFooter>
          </Card>
          
          {/* Premium Plan */}
          <Card className="border-t-4 border-t-mrc-blue relative lg:scale-105 z-10 shadow-xl">
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-mrc-blue text-white text-xs py-1 px-2 rounded">
              Populaire
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Premium</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">9,99€</span>
                <span className="text-gray-500 ml-2">/ mois</span>
              </div>
              <CardDescription className="mt-2">
                L'offre complète pour les militants actifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accès illimité à tous les modules</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Assistant IA Styvy237 sans limite</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Génération de PDF illimitée</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Suivi de progression avancé</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Accès aux webinaires exclusifs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Certificats de formation</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-mrc-blue hover:bg-blue-700">
                S'abonner maintenant
              </Button>
            </CardFooter>
          </Card>
          
          {/* Groupe Plan */}
          <Card className="border-t-4 border-t-mrc-green">
            <CardHeader>
              <CardTitle className="text-xl">Groupe</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">99€</span>
                <span className="text-gray-500 ml-2">/ mois</span>
              </div>
              <CardDescription className="mt-2">
                Idéal pour les comités locaux du MRC
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Jusqu'à 15 utilisateurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tous les avantages Premium</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Espace de discussion collaboratif</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tableau de bord pour coordinateurs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Formation sur mesure pour votre région</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Support prioritaire</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Contacter pour groupe
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
