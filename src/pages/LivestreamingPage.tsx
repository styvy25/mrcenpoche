
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSEO } from "@/hooks/useSEO";
import LivestreamingView from "@/components/streaming/LivestreamingView";

const LivestreamingPage = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  
  React.useEffect(() => {
    setPageTitle("MRC en Poche - Studio de Diffusion en Direct");
    setPageDescription("Accédez à notre studio de diffusion en direct pour créer, gérer et participer aux livestreams du MRC.");
  }, [setPageTitle, setPageDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-grow relative mt-16 px-4 sm:px-8 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Studio de Diffusion</h1>
          <p className="text-gray-600 dark:text-gray-400">Créez et gérez vos diffusions en direct</p>
        </div>
        <LivestreamingView />
      </main>
      <Footer />
    </div>
  );
};

export default LivestreamingPage;
