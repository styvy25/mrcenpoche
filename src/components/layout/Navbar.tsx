
import { useState, useEffect, useRef } from "react";
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
  const [activeTab, setActiveTab] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Set active tab based on location
    const path = location.pathname;
    if (path === "/") setActiveTab("home");
    else if (path === "/modules") setActiveTab("modules");
    else if (path === "/news") setActiveTab("news");
    else if (path === "/chat") setActiveTab("chat");
    else if (path === "/quiz") setActiveTab("quiz");
    else setActiveTab("");
  }, [location]);
  
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
    <nav className="bg-white/80 dark:bg-mrc-dark/80 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green">
                MRC en Poche
              </Link>
            </div>
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
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleAPIButtonClick}
              className="flex items-center gap-2 text-mrc-blue border-mrc-blue/30 hover:bg-mrc-blue/10 transition-all duration-300"
            >
              <Key className="h-4 w-4" />
              API
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode} 
              className="rounded-full transition-all duration-300 hover:scale-110"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {navEndElement}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
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
      )}
    </nav>
  );
}

export default Navbar;
