
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="text-center max-w-md mx-auto p-6 bg-gray-800/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
        <div className="flex justify-center mb-4">
          <FileQuestion className="h-20 w-20 text-mrc-blue" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-mrc-blue to-mrc-green bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-300 mb-6">Cette page n'existe pas</p>
        <p className="text-gray-400 mb-8">
          L'URL <span className="font-mono bg-gray-700/50 px-2 py-1 rounded text-sm">{location.pathname}</span> n'a pas été trouvée.
        </p>
        <div className="flex justify-center">
          <Button asChild className="bg-mrc-blue hover:bg-mrc-blue/90">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
