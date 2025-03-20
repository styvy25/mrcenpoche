
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HomeContent from "@/components/home/HomeContent";
import { useSEO } from "@/hooks/useSEO";
import { useEffect } from "react";

const Index = () => {
  const { setPageTitle, setPageDescription } = useSEO();

  useEffect(() => {
    setPageTitle("MRC en Poche - Votre application pour rester informé et engagé");
    setPageDescription("MRC en Poche vous permet de rester informé et engagé grâce à des outils interactifs et des ressources à jour.");
  }, [setPageTitle, setPageDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <HomeContent />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
