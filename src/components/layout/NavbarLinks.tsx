
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  FileText,
  BrainCircuit,
  YoutubeIcon,
  Settings,
  Users,
} from "lucide-react";

interface NavbarLinksProps {
  isApiKeySet: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

export const navLinks = [
  { path: "/", label: "Accueil", icon: <Home size={16} />, highlight: false },
  { path: "/assistant", label: "Assistant", icon: <MessageSquare size={16} />, highlight: false },
  { path: "/chat-237", label: "Chat 237", icon: <Users size={16} />, highlight: true, badge: true },
  { path: "/documents", label: "Documents", icon: <FileText size={16} />, highlight: false },
  { path: "/quiz", label: "Quiz", icon: <BrainCircuit size={16} />, highlight: false },
  { 
    path: "/youtube-analyzer", 
    label: "YouTube", 
    icon: <YoutubeIcon size={16} />, 
    highlight: true, 
    badge: true 
  },
  { path: "/settings", label: "Paramètres", icon: <Settings size={16} />, highlight: false }
];

const NavbarLinks: React.FC<NavbarLinksProps> = ({ 
  isApiKeySet,
  isMobile = false,
  onNavClick
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleClick = () => {
    if (onNavClick) {
      onNavClick();
    }
  };

  return (
    <>
      {navLinks.map(link => (
        <Link
          key={link.path}
          to={link.path}
          onClick={handleClick}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
            isActive(link.path)
              ? link.path === "/youtube-analyzer" 
                ? "bg-red-500 text-white"
                : link.path === "/chat-237"
                  ? "bg-purple-600 text-white"
                  : "bg-mrc-blue text-white"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          } ${isMobile ? "w-full justify-start" : ""}`}
        >
          {link.icon}
          <span className={isMobile ? "inline" : "hidden lg:inline"}>{link.label}</span>
          {link.badge && (
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-green-500 text-white rounded-full">
              New
            </span>
          )}
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
