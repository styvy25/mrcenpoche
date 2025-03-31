
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import FooterAPIManager from "./FooterAPIManager";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-mrc-blue">MRC en Poche</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Application mobile d'éducation politique et de formation citoyenne
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-mrc-blue">Liens rapides</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/modules" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Modules de formation
              </Link>
              <Link to="/quiz" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Quiz et défis
              </Link>
              <Link to="/assistant" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Assistant IA
              </Link>
              <Link to="/news" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Actualités
              </Link>
              <Link to="/settings" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Paramètres
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-bold text-mrc-blue">Mentions légales</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Conditions d'utilisation
              </Link>
              <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Politique de confidentialité
              </Link>
              <Link to="/legal" className="text-sm text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue transition-colors duration-200">
                Mentions légales
              </Link>
            </nav>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {currentYear} MRC en Poche. Tous droits réservés.
          </p>
          
          <FooterAPIManager />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
