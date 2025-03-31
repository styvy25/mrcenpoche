
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import AuthDialog from "@/components/auth/AuthDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import NavbarDropdownMenu from "./NavbarDropdownMenu";
import NavbarNavigationButtons from "./NavbarNavigationButtons";
import NavbarLinks from "./NavbarLinks";
import NavbarMobileMenu from "./NavbarMobileMenu";
import MRCLogoNew from "@/components/branding/MRCLogoNew";
import { Button } from "@/components/ui/button";
import { Download, MessageSquare, YoutubeIcon } from "lucide-react";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import { useNotificationsDemo } from "@/hooks/useNotificationsDemo";

const Navbar = () => {
  const location = useLocation();
  const { isApiKeySet } = useAppContext();
  const isMobile = useIsMobile();
  const [previousLocation, setPreviousLocation] = useState<string>("");
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(!isApiKeySet);
  const { createDemoNotifications } = useNotificationsDemo();

  // Load demo notifications
  useEffect(() => {
    createDemoNotifications();
  }, [createDemoNotifications]);

  // Track navigation history for back button
  useEffect(() => {
    if (location.pathname !== previousLocation && previousLocation !== "") {
      // Store last 5 locations
      const history = JSON.parse(localStorage.getItem('navigationHistory') || '[]');
      if (history.length >= 5) {
        history.shift(); // Remove oldest entry
      }
      history.push(previousLocation);
      localStorage.setItem('navigationHistory', JSON.stringify(history));
    }
    setPreviousLocation(location.pathname);
  }, [location.pathname, previousLocation]);

  return (
    <header className="fixed w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-1 mr-4">
            <NavbarDropdownMenu isApiKeySet={isApiKeySet} />
            
            <div className="hidden sm:flex">
              <NavbarNavigationButtons />
            </div>
          </div>
          
          <Link to="/" className="flex items-center">
            <MRCLogoNew size="small" />
            <span className="ml-2 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue via-mrc-red to-mrc-blue">
              MRC en Poche
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavbarLinks isApiKeySet={isApiKeySet} />
          
          <Link to="/forum">
            <Button variant="outline" size="sm" className="ml-2 text-purple-600 border-purple-200 hover:bg-purple-50">
              <MessageSquare className="mr-1 h-4 w-4" />
              Forum
            </Button>
          </Link>
          
          <Link to="/youtube-download">
            <Button variant="outline" size="sm" className="ml-2 text-red-600 border-red-200 hover:bg-red-50">
              <Download className="mr-1 h-4 w-4" />
              Télécharger Vidéos
            </Button>
          </Link>
          
          <NotificationCenter />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <NavbarMobileMenu isApiKeySet={isApiKeySet} />
        </div>

        <div className="flex items-center">
          <AuthDialog />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
