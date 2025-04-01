
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import FooterAPIManager from "./FooterAPIManager";
import { BookOpen, Users, Video, Award, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-mrc-blue">MRC en Poche</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Application officielle de formation interactive pour les militants et sympathisants du MRC.
            </p>
            <div className="flex items-center space-x-4">
              <a href="https://twitter.com/MrcOfficiel" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-mrc-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="https://facebook.com/MrcParti" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-mrc-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://youtube.com/channel/UCMRCOfficial" target="_blank" rel="noreferrer" className="text-gray-600 hover:text-mrc-blue transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Formation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modules" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Modules de formation
                </Link>
              </li>
              <li>
                <Link to="/modules/training" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Formation immersive
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Quiz et évaluations
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Documents PDF
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Communauté</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modules/reunions" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Réunions virtuelles
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1"></path>
                    <path d="M18 14v4h4v-4"></path>
                    <path d="M18 18h-5a2 2 0 0 1-2-2v-3"></path>
                  </svg>
                  Actualités
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-gray-600 hover:text-mrc-blue flex items-center">
                  <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Assistant Styvy237
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/legal" className="text-gray-600 hover:text-mrc-blue">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-mrc-blue">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-mrc-blue">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <a href="mailto:contact@mrc-enpoche.com" className="text-gray-600 hover:text-mrc-blue">
                  Nous contacter
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} MRC en Poche. Tous droits réservés.
          </p>
          <FooterAPIManager />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
