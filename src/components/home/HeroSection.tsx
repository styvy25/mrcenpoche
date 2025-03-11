
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-mrc-blue via-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjMDM0OEEzIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMTgxIi8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMjY1Ii8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iMzUwIi8+PGNpcmNsZSBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMSIgY3g9IjcyMCIgY3k9IjM4MCIgcj0iNDMwIi8+PC9nPjwvc3ZnPg==')] opacity-20 bg-cover bg-center"></div>
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              <span className="block">MRC LearnScape</span>
              <span className="block text-red-400 mt-2">Formation Interactive</span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-200 max-w-3xl">
              Plateforme d'apprentissage immersive pour les militants du MRC avec assistance IA personnalisée, supports PDF et suivi de progression.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/modules">
                <Button className="w-full sm:w-auto bg-white text-mrc-blue hover:bg-gray-100">
                  Commencer la formation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/assistant">
                <Button variant="outline" className="w-full sm:w-auto border-white hover:bg-white/10 text-white">
                  Poser une question à Styvy237
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 md:mt-0 md:absolute md:right-12 md:top-1/2 md:-translate-y-1/2 max-w-sm mx-auto md:mx-0">
            <div className="relative w-full rounded-lg shadow-2xl overflow-hidden bg-white dark:bg-gray-800">
              <img 
                alt="MRC LearnScape" 
                src="/lovable-uploads/13009c82-2883-46e9-8cda-afd9d8e16ade.jpg" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-center">
                <h3 className="text-white text-lg font-semibold">Styvy237</h3>
                <p className="text-gray-200 text-sm">Votre assistant IA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
