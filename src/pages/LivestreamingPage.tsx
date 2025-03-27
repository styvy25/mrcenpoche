
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSEO } from "@/hooks/useSEO";
import LivestreamingView from "@/components/streaming/LivestreamingView";

const LivestreamingPage = () => {
  const { setPageTitle, setPageDescription } = useSEO();
  
  React.useEffect(() => {
    setPageTitle("MRC en Poche - Livestreaming");
    setPageDescription("Suivez les livestreams du MRC en direct et participez aux discussions.");
  }, [setPageTitle, setPageDescription]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <main className="flex-grow relative mt-16 px-4 sm:px-8 py-6">
        <LivestreamingView />
      </main>
      <Footer />
    </div>
  );
};

export default LivestreamingPage;
