
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavLinks from "./navbar/DesktopNavLinks";
import DesktopNavActions from "./navbar/DesktopNavActions";
import MobileNavButton from "./navbar/MobileNavButton";
import MobileNavMenu from "./navbar/MobileNavMenu";
import { useNavigation } from "./navigation/NavigationContext";

interface NavbarProps {
  navEndElement?: React.ReactNode;
}

const Navbar = ({ navEndElement }: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { isOpen, toggleMenu, closeMenu } = useNavigation();
  
  // Close mobile menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <nav className="bg-white/80 dark:bg-mrc-dark/80 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavbarLogo />
            <DesktopNavLinks />
          </div>
          
          <DesktopNavActions 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
            navEndElement={navEndElement} 
          />
          
          <MobileNavButton 
            isOpen={isOpen} 
            toggleMenu={toggleMenu} 
          />
        </div>
      </div>

      <MobileNavMenu 
        isOpen={isOpen} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        navEndElement={navEndElement} 
      />
    </nav>
  );
};

export default Navbar;
