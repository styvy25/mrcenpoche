
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AIChat from "@/components/assistant/AIChat";
import VoiceAssistantButton from "@/components/assistant/VoiceAssistantButton";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);
  const { setPageTitle, setPageDescription } = useSEO();
  
  // Set SEO metadata
  useEffect(() => {
    setPageTitle("MRC en Poche - Assistant IA pour militants");
    setPageDescription("Votre assistant IA proactif pour tout apprendre sur le MRC et la politique camerounaise.");
  }, [setPageTitle, setPageDescription]);
  
  // Check for pending assistant question
  useEffect(() => {
    const question = localStorage.getItem('pending_assistant_question');
    if (question) {
      setPendingQuestion(question);
      localStorage.removeItem('pending_assistant_question');
    }
  }, []);
  
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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
        
        {/* AI Assistant Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
                Assistant IA Styvy237
              </h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300">
                Votre guide politique personnel pour tout apprendre sur le MRC, répondre à vos questions et vous accompagner dans votre engagement militant.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-full max-w-4xl">
                <AIChat />
              </div>
              
              <div className="mt-8 flex justify-center">
                <VoiceAssistantButton />
              </div>
            </div>
          </div>
        </section>
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
