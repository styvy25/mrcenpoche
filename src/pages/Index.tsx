
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import NewsSection from "@/components/home/NewsSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ChevronUp, Brain, Award, BookOpen, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();
  const { setPageTitle, setPageDescription } = useSEO();
  
  useEffect(() => {
    // Set page title and description for SEO
    setPageTitle("MRC en Poche | Application officielle du MRC");
    setPageDescription("L'application officielle du Mouvement pour la Renaissance du Cameroun (MRC). Découvrez nos modules de formation, actualités, quiz et plus encore.");
    
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [setPageTitle, setPageDescription]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = "Quiz Culturel Camerounais - MRC LearnScape";
    const text = "Testez vos connaissances sur la culture camerounaise avec ce quiz interactif!";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' ' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => {
            toast({
              title: "Lien copié!",
              description: "Le lien a été copié dans votre presse-papiers.",
            });
          })
          .catch(err => {
            console.error('Erreur lors de la copie du lien: ', err);
            toast({
              title: "Erreur",
              description: "Impossible de copier le lien.",
              variant: "destructive",
            });
          });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 bg-[#0d0d0d]/0">
        <HeroSection />
        <FeatureSection />
        
        {/* Quiz culturel section */}
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
              
              {/* Social sharing buttons */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-blue-500 text-white hover:bg-blue-600 border-none"
                  onClick={() => handleShare('facebook')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-blue-400 text-white hover:bg-blue-500 border-none"
                  onClick={() => handleShare('twitter')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-green-500 text-white hover:bg-green-600 border-none"
                  onClick={() => handleShare('whatsapp')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
                  <path d="M5.3 12.3a10 10 0 1 1 14.3 8.8L13 21l1-4.4a9.8 9.8 0 0 1 5-10 10 10 0 0 1-10.5 5.7"/>
                  <path d="M15 14.5c.5 1.5 0 3-1 3.5H7.9"/>
                  <path d="M12 11v5.5"/>
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="bg-gray-700 text-white hover:bg-gray-800 border-none"
                  onClick={() => handleShare('copy')}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
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
        
        {/* Integrated News Section */}
        <NewsSection />
        
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
