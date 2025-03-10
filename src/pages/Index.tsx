
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import PricingSection from "@/components/home/PricingSection";
import { Button } from "@/components/ui/button";
import { ChevronUp, Brain, Award, BookOpen, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <FeatureSection />
        
        {/* Nouvelle section de quiz culturel */}
        <section className="py-16 bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <Badge className="mb-2 bg-mrc-blue text-white px-3 py-1 text-xs uppercase tracking-wider">
                Nouveau
              </Badge>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
                Quiz Culturel Camerounais
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500">
                Testez vos connaissances sur la culture, l'histoire et les traditions du Cameroun,
                et gagnez des badges culturels exclusifs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 text-mrc-blue rounded-full mb-4">
                    <Brain className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Questions Variées</h3>
                  <p className="text-gray-600 flex-grow">
                    Explorez une variété de questions sur la culture, l'histoire et les traditions camerounaises.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-red-100 text-mrc-red rounded-full mb-4">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Badges Culturels</h3>
                  <p className="text-gray-600 flex-grow">
                    Collectionnez des badges pour chaque niveau de connaissance atteint.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 text-mrc-green rounded-full mb-4">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Apprentissage Ludique</h3>
                  <p className="text-gray-600 flex-grow">
                    Découvrez des anecdotes fascinantes et des explications détaillées pour chaque réponse.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/quiz">
                <Button className="bg-gradient-to-r from-mrc-blue to-blue-600 text-white hover:opacity-90 transition-opacity px-8 py-6 h-auto text-lg shadow-lg hover:shadow-xl">
                  Participer au Quiz
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <PricingSection />
      </main>
      
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-mrc-blue text-white rounded-md mr-2">
                  MRC
                </span>
                LearnScape
              </h3>
              <p className="text-gray-400 text-sm">
                Plateforme d'apprentissage immersive pour les militants du MRC avec assistance IA personnalisée.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/modules" className="hover:text-white transition-colors">Modules</Link></li>
                <li><Link to="/assistant" className="hover:text-white transition-colors">Assistant IA</Link></li>
                <li><Link to="/documents" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link to="/quiz" className="hover:text-white transition-colors">Quiz Culturel</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Légal</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5 text-mrc-red" />
                  <span>Yaoundé, Cameroun</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-mrc-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>contact@mrc-learnscape.com</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 mr-2 text-mrc-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+237 123 456 789</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p className="relative z-10">© 2023 MRC LearnScape. Tous droits réservés.</p>
            
            {/* Drapeau camerounais stylisé en arrière-plan */}
            <div className="absolute left-0 right-0 bottom-0 h-1.5 flex opacity-50 overflow-hidden">
              <div className="w-1/3 bg-mrc-green"></div>
              <div className="w-1/3 bg-mrc-red"></div>
              <div className="w-1/3 bg-mrc-yellow"></div>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-8 right-8 rounded-full bg-mrc-blue text-white hover:bg-blue-700 shadow-lg z-50"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default Index;
