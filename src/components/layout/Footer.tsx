
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import FooterAPIManager from "./FooterAPIManager";
import { BookOpen, Users, Video, Award, FileText, Github, Twitter, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Branding */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">MRC Formation</h3>
            <p className="text-sm opacity-80">
              Plateforme officielle de formation politique du Mouvement pour la Renaissance du Cameroun.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-mrc-blue">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-mrc-blue">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-mrc-blue">
                <Youtube size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-mrc-blue">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white">Navigation</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                Accueil
              </Link>
              <Link to="/modules" className="block text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                Modules
              </Link>
              <Link to="/quiz" className="block text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                Quiz
              </Link>
              <Link to="/dashboard" className="block text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                Tableau de bord
              </Link>
              <Link to="/settings" className="block text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                Paramètres
              </Link>
            </div>
          </div>
          
          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white">Ressources</h3>
            <div className="space-y-2">
              <Link to="/resources/documents" className="flex items-center text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                <FileText size={16} className="mr-2" />
                <span>Documents</span>
              </Link>
              <Link to="/resources/videos" className="flex items-center text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                <Video size={16} className="mr-2" />
                <span>Vidéos</span>
              </Link>
              <Link to="/resources/courses" className="flex items-center text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                <BookOpen size={16} className="mr-2" />
                <span>Cours</span>
              </Link>
              <Link to="/resources/certificates" className="flex items-center text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                <Award size={16} className="mr-2" />
                <span>Certificats</span>
              </Link>
              <Link to="/resources/community" className="flex items-center text-sm opacity-80 hover:text-mrc-blue hover:opacity-100">
                <Users size={16} className="mr-2" />
                <span>Communauté</span>
              </Link>
            </div>
          </div>
          
          {/* Column 4: API Key Management */}
          <div className="space-y-4">
            <h3 className="text-md font-semibold text-white">Configuration</h3>
            <FooterAPIManager />
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-75">
          <p>&copy; {currentYear} MRC Formation. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-mrc-blue">Mentions légales</Link>
            <Link to="/privacy" className="hover:text-mrc-blue">Politique de confidentialité</Link>
            <Link to="/contact" className="hover:text-mrc-blue">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
