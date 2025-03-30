import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Brain, MessageCircle, YoutubeIcon, LayoutDashboard } from 'lucide-react';

interface NavbarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavbarLink = ({ to, icon, label }: NavbarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
        isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
      }`
    }
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

interface NavbarLinksProps {
  isApiKeySet: boolean;
}

const NavbarLinks = ({ isApiKeySet }: NavbarLinksProps) => {

  return (
    <>
      <NavbarLink to="/assistant" icon={<MessageSquare className="h-4 w-4" />} label="Assistant" />
      <NavbarLink to="/documents" icon={<FileText className="h-4 w-4" />} label="Documents" />
      <NavbarLink to="/quiz" icon={<Brain className="h-4 w-4" />} label="Quiz" />
      <NavbarLink 
        to="/chat-237" 
        icon={<MessageCircle className="h-4 w-4" />}
        label="Chat 237" 
      />
      <NavbarLink
        to="/youtube-analysis"
        icon={<YoutubeIcon className="h-4 w-4 text-red-600" />}
        label="Analyse YouTube"
      />
      <NavbarLink
        to="/dashboard"
        icon={<LayoutDashboard className="h-4 w-4" />}
        label="Tableau de bord"
      />
    </>
  );
};

export default NavbarLinks;
