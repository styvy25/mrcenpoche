
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavActions from "./navbar/DesktopNavActions";
import MobileNavButton from "./navbar/MobileNavButton";
import MobileNavMenu from "./navbar/MobileNavMenu";
import { useNavigation } from "./navigation/NavigationContext";
import { navigationItems } from "./navigation/navigationData";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

interface NavbarProps {
  navEndElement?: React.ReactNode;
}

const Navbar = ({
  navEndElement
}: NavbarProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    isOpen,
    toggleMenu,
    closeMenu
  } = useNavigation();

  // Close mobile menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Convert navigation items to expandable tabs format
  const navTabs = navigationItems.map(item => ({
    title: item.label,
    icon: item.getIcon().type,
  }));

  const handleNavChange = (index: number | null) => {
    if (index !== null) {
      navigate(navigationItems[index].path);
    }
  };

  return (
    <nav className="bg-white/80 dark:bg-mrc-dark/80 border-b border-gray-200 dark:border-gray-700 fixed w-full z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavbarLogo />
            <div className="hidden md:ml-6 md:flex">
              <ExpandableTabs
                tabs={navTabs}
                className="ml-4 bg-white/20 dark:bg-mrc-dark/20"
                activeColor="text-mrc-blue"
                onChange={handleNavChange}
              />
            </div>
          </div>
          
          <div className="flex items-center">
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
      </div>

      <MobileNavMenu isOpen={isOpen} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navEndElement={navEndElement} />
    </nav>
  );
};

export default Navbar;
