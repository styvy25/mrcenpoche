
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import NewsSection from "@/components/home/NewsSection";
import PricingSection from "@/components/home/PricingSection";
import Footer from "@/components/layout/Footer";
import QuizSection from "@/components/home/QuizSection";
import ScrollTopButton from "@/components/common/ScrollTopButton";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  
  useEffect(() => {
    // Set page title and description for SEO
    setPageTitle("MRC en Poche | Application officielle du MRC");
    setPageDescription("L'application officielle du Mouvement pour la Renaissance du Cameroun (MRC). Découvrez nos modules de formation, actualités, quiz et plus encore.");
  }, [setPageTitle, setPageDescription]);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 bg-[#0d0d0d]/0">
        <HeroSection />
        <FeatureSection />
        <QuizSection />
        <NewsSection />
        <PricingSection />
      </main>
      
      <Footer />
      <ScrollTopButton />
    </div>
  );
};

export default Index;
