
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Book, Newspaper, Bot, FileText, Key, Sun, Moon } from "lucide-react";

interface MobileNavMenuProps {
  isOpen: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navEndElement?: React.ReactNode;
}

const MobileNavMenu = ({ isOpen, isDarkMode, toggleDarkMode, navEndElement }: MobileNavMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="sm:hidden bg-white dark:bg-mrc-dark animate-fade-in">
      <div className="pt-2 pb-3 space-y-1">
        <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-2" />
            Accueil
          </div>
        </Link>
        <Link to="/modules" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
          <div className="flex items-center">
            <Book className="h-4 w-4 mr-2" />
            Modules
          </div>
        </Link>
        <Link to="/news" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
          <div className="flex items-center">
            <Newspaper className="h-4 w-4 mr-2" />
            Actualités
          </div>
        </Link>
        <Link to="/chat" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
          <div className="flex items-center">
            <Bot className="h-4 w-4 mr-2" />
            Assistant IA
          </div>
        </Link>
        <Link to="/quiz" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Quiz
          </div>
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
    </div>
  );
};

export default MobileNavMenu;
