
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavActions from "./navbar/DesktopNavActions";
import MobileNavButton from "./navbar/MobileNavButton";
import MobileNavMenu from "./navbar/MobileNavMenu";
import { useNavigation } from "./navigation/NavigationContext";
import { navigationItems, navIcons } from "./navigation/navigationData";
import { ExpandableTabs, TabItem } from "@/components/ui/expandable-tabs";

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
  const navTabs: TabItem[] = navigationItems.map(item => ({
    title: item.label,
    icon: navIcons[item.path.replace('/', '') || 'home']
  }));

  // Add a separator between main nav and other sections if needed
  if (navTabs.length > 3) {
    navTabs.splice(3, 0, {
      type: "separator"
    });
  }
  
  const handleNavChange = (index: number | null) => {
    if (index !== null && index < navigationItems.length) {
      navigate(navigationItems[index].path);
    }
  };
  
  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <NavbarLogo />
          <MobileNavButton isOpen={isOpen} onToggle={toggleMenu} />
        </div>
        
        <div className="hidden md:flex items-center">
          <ExpandableTabs tabs={navTabs} onChange={handleNavChange} />
        </div>
        
        <div className="flex items-center">
          <DesktopNavActions isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          {navEndElement}
        </div>
        
        <MobileNavMenu isOpen={isOpen} onCloseMenu={closeMenu} />
      </div>
    </header>
  );
};

export default Navbar;
