
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import FooterAPIManager from "./FooterAPIManager";
import { BookOpen, Users, Video, Award, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-950 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-white text-lg mb-4">MRC en Poche</h3>
            <p className="text-sm text-gray-400 mb-4">
              La plateforme officielle du Mouvement pour la Renaissance du Cameroun.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Formation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/modules" className="text-gray-400 hover:text-white flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Modules standards</span>
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-gray-400 hover:text-white flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span>Formation adaptive</span>
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-400 hover:text-white flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Quiz et examens</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Communauté</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/modules/reunions" className="text-gray-400 hover:text-white flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Réunions virtuelles</span>
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  <span>Chat communautaire</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white text-lg mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/news" className="text-gray-400 hover:text-white">
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-400 hover:text-white">
                  Paramètres
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-800" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} MRC en Poche. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-gray-300">
              Confidentialité
            </Link>
            <Link to="/terms" className="hover:text-gray-300">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
        
        <FooterAPIManager />
      </div>
    </footer>
  );
};

export default Footer;
