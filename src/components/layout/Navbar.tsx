
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, Newspaper, Home, Book, FileText, Bot, User, Key } from "lucide-react";

interface NavbarProps {
  navEndElement?: React.ReactNode;
}

const Navbar = ({
  navEndElement
}: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleAPIButtonClick = () => {
    navigate('/settings');
  };
  
  return (
    <nav className="bg-white dark:bg-mrc-dark border-b border-gray-200 dark:border-gray-700 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-mrc-blue">MRC en Poche</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={`border-transparent ${isActive('/') ? 'text-mrc-blue border-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                <Home className="h-4 w-4 mr-1" />
                Accueil
              </Link>
              <Link to="/modules" className={`border-transparent ${isActive('/modules') ? 'text-mrc-blue border-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                <Book className="h-4 w-4 mr-1" />
                Modules
              </Link>
              <Link to="/news" className={`border-transparent ${isActive('/news') ? 'text-mrc-blue border-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                <Newspaper className="h-4 w-4 mr-1" />
                Actualités
              </Link>
              <Link to="/assistant" className={`border-transparent ${isActive('/assistant') ? 'text-mrc-blue border-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                <Bot className="h-4 w-4 mr-1" />
                Assistant IA
              </Link>
              <Link to="/documents" className={`border-transparent ${isActive('/documents') ? 'text-mrc-blue border-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                <FileText className="h-4 w-4 mr-1" />
                Documents
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAPIButtonClick}
              className="flex items-center gap-2 text-mrc-blue border-mrc-blue/30 hover:bg-mrc-blue/10"
            >
              <Key className="h-4 w-4" />
              API
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {navEndElement}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && <div className="sm:hidden bg-white dark:bg-mrc-dark animate-fade-in">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              Accueil
            </Link>
            <Link to="/modules" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              Modules
            </Link>
            <Link to="/news" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              <div className="flex items-center">
                <Newspaper className="h-4 w-4 mr-2" />
                Actualités
              </div>
            </Link>
            <Link to="/assistant" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              Assistant IA
            </Link>
            <Link to="/documents" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              Documents
            </Link>
            <Link to="/settings" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
              <div className="flex items-center">
                <Key className="h-4 w-4 mr-2" />
                API & Paramètres
              </div>
            </Link>
            <div className="flex items-center justify-between px-3 py-2">
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              {navEndElement}
            </div>
          </div>
        </div>}
    </nav>
  );
};

export default Navbar;
