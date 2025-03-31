
import { Link, useLocation } from "react-router-dom";
import { Home, Book, Newspaper, Bot, FileText } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface DesktopNavLinksProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DesktopNavLinks = ({ activeTab, setActiveTab }: DesktopNavLinksProps) => {
  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    // Move indicator based on active tab
    if (navRef.current && activeTab) {
      const activeEl = navRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const navRect = navRef.current.getBoundingClientRect();
        
        setIndicatorStyle({
          width: `${rect.width}px`,
          transform: `translateX(${rect.left - navRect.left}px)`,
          opacity: 1
        });
      }
    } else {
      setIndicatorStyle({ opacity: 0 });
    }
  }, [activeTab]);

  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8 relative" ref={navRef}>
      <Link 
        to="/" 
        data-tab="home"
        className={`${isActive('/') ? 'text-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
      >
        <Home className="h-4 w-4 mr-1" />
        Accueil
      </Link>
      <Link 
        to="/modules" 
        data-tab="modules"
        className={`${isActive('/modules') ? 'text-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
      >
        <Book className="h-4 w-4 mr-1" />
        Modules
      </Link>
      <Link 
        to="/news" 
        data-tab="news"
        className={`${isActive('/news') ? 'text-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
      >
        <Newspaper className="h-4 w-4 mr-1" />
        Actualités
      </Link>
      <Link 
        to="/chat" 
        data-tab="chat"
        className={`${isActive('/chat') ? 'text-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
      >
        <Bot className="h-4 w-4 mr-1" />
        Assistant IA
      </Link>
      <Link 
        to="/quiz" 
        data-tab="quiz"
        className={`${isActive('/quiz') ? 'text-mrc-blue' : 'text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'} inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200`}
      >
        <FileText className="h-4 w-4 mr-1" />
        Quiz
      </Link>
      
      {/* Animated indicator */}
      <div 
        className="absolute bottom-0 h-1 bg-gradient-to-r from-mrc-blue to-mrc-green rounded-t-lg transition-all duration-300 ease-out"
        style={indicatorStyle}
      />
    </div>
  );
};

export default DesktopNavLinks;
