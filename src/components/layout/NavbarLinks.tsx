
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageSquare,
  FileText,
  BrainCircuit,
  YoutubeIcon,
  Settings,
} from "lucide-react";

interface NavbarLinksProps {
  isApiKeySet: boolean;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ isApiKeySet }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Link
        to="/"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/")
            ? "bg-mrc-blue text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <Home size={16} />
        <span className="hidden lg:inline">Accueil</span>
      </Link>

      <Link
        to="/assistant"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/assistant")
            ? "bg-mrc-blue text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <MessageSquare size={16} />
        <span className="hidden lg:inline">Assistant</span>
      </Link>

      <Link
        to="/documents"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/documents")
            ? "bg-mrc-blue text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <FileText size={16} />
        <span className="hidden lg:inline">Documents</span>
      </Link>

      <Link
        to="/quiz"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/quiz")
            ? "bg-mrc-blue text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <BrainCircuit size={16} />
        <span className="hidden lg:inline">Quiz</span>
      </Link>

      <Link
        to="/youtube-analyzer"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/youtube-analyzer")
            ? "bg-red-500 text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <YoutubeIcon size={16} />
        <span className="hidden lg:inline">YouTube</span>
      </Link>

      <Link
        to="/settings"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md ${
          isActive("/settings")
            ? "bg-mrc-blue text-white"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
      >
        <Settings size={16} />
        <span className="hidden lg:inline">Paramètres</span>
      </Link>
    </>
  );
};

export default NavbarLinks;
