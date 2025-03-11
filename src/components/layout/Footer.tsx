
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-mrc-blue text-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MRC LearnScape</h3>
            <p className="text-gray-200">
              Votre plateforme d'apprentissage politique pour comprendre et soutenir le MRC.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-blue-300" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-blue-300" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
                <Youtube className="h-5 w-5 hover:text-blue-300" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-300 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/modules" className="hover:text-blue-300 transition-colors">Modules</Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-blue-300 transition-colors">Quiz</Link>
              </li>
              <li>
                <Link to="/assistant" className="hover:text-blue-300 transition-colors">Assistant IA</Link>
              </li>
              <li>
                <Link to="/documents" className="hover:text-blue-300 transition-colors">Documents</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:text-blue-300 transition-colors">Conditions d'utilisation</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-300 transition-colors">Politique de confidentialité</Link>
              </li>
              <li>
                <Link to="/legal-notices" className="hover:text-blue-300 transition-colors">Mentions légales</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-300" />
                <span>Yaoundé, Cameroun</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-300" />
                <a href="mailto:styvysam1@yahoo.fr" className="hover:text-blue-300 transition-colors">
                  styvysam1@yahoo.fr
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-300" />
                <a href="tel:+4915566334864" className="hover:text-blue-300 transition-colors">
                  +49 155 66334864
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 text-center md:text-left">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} MRC LearnScape. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
