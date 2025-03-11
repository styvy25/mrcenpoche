
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/layout/Footer";
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
      <main className="pt-16 bg-[#0d0d0d]/0">
        <HeroSection />
        <FeatureSection />
        
        {/* Nouvelle section de quiz culturel */}
        <section className="bg-gradient-to-br from-mrc-blue/5 to-mrc-yellow/10 py-0 px-0 mx-[4px]">
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
      
      <Footer />
      
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
