
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Key, Sun, Moon } from "lucide-react";
import { navigationItems } from "../navigation/navigationData";

interface MobileNavMenuProps {
  isOpen: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  navEndElement?: React.ReactNode;
}

const MobileNavMenu = ({ isOpen, isDarkMode, toggleDarkMode, navEndElement }: MobileNavMenuProps) => {
  if (!isOpen) return null;
  
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="sm:hidden bg-white dark:bg-mrc-dark animate-fade-in">
      <div className="pt-2 pb-3 space-y-1">
        {navigationItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`block pl-3 pr-4 py-2 border-l-4 ${
              isActive(item.path) 
                ? "border-mrc-blue text-mrc-blue dark:text-mrc-blue font-medium bg-blue-50 dark:bg-blue-900/10" 
                : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center">
              {item.icon}
              {item.label}
            </div>
          </Link>
        ))}
        
        <Link to="/settings" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-300 hover:text-gray-800">
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
