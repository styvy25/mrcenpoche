
import { Github, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-mrc-blue">MRC LearnScape</h3>
            <p className="text-sm text-gray-400 mb-4">
              Plateforme d'apprentissage immersive pour les militants du MRC avec assistance IA personnalisée.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </a>
              <a href="mailto:styvysam1@yahoo.fr" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Mail</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-mrc-blue">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/modules" className="text-gray-400 hover:text-white transition-colors">
                  Modules de Formation
                </Link>
              </li>
              <li>
                <Link to="/assistant" className="text-gray-400 hover:text-white transition-colors">
                  Assistant IA
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-gray-400 hover:text-white transition-colors">
                  Documents
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-gray-400 hover:text-white transition-colors">
                  Quiz et Challenges
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-mrc-blue">Contact</h3>
            <address className="text-sm text-gray-400 not-italic">
              <p className="mb-2">Mouvement pour la Renaissance du Cameroun</p>
              <p className="mb-2">Yaoundé, Cameroun</p>
              <p className="mb-2">
                <a href="mailto:styvysam1@yahoo.fr" className="hover:text-white transition-colors">
                  styvysam1@yahoo.fr
                </a>
              </p>
              <p>
                <a href="tel:+4915566334864" className="hover:text-white transition-colors">
                  +49 155 66334864
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            &copy; {currentYear} MRC LearnScape. Tous droits réservés.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
