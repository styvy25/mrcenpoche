
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import FooterAPIManager from "./FooterAPIManager";
import { BookOpen, Users, Video, Award, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8 mt-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-mrc-blue">MRC Formation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Plateforme d'apprentissage et d'éducation politique pour les membres et sympathisants du MRC.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mrc-blue transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mrc-blue transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-mrc-blue transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Formation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/modules" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Modules de formation
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  Quiz politiques
                </Link>
              </li>
              <li>
                <Link to="/modules/training" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Formation immersive
                </Link>
              </li>
              <li>
                <Link to="/modules/reunions" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Réunions virtuelles
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/documents" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Télécharger des documents
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  Assistant IA
                </Link>
              </li>
              <li>
                <a href="https://mrcparty.org" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Site officiel du MRC
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Aide et support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-600 dark:text-gray-400 hover:text-mrc-blue dark:hover:text-mrc-blue">
                  Mentions légales
                </Link>
              </li>
            </ul>
            
            <div className="mt-6">
              <FooterAPIManager />
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Mouvement pour la Renaissance du Cameroun. Tous droits réservés.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 md:mt-0">
            Plateforme de formation politique
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
