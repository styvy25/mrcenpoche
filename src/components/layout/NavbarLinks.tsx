
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Brain, MessageCircle, YoutubeIcon, LayoutDashboard } from 'lucide-react';

interface NavbarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const NavbarLink = ({ to, icon, label, onClick }: NavbarLinkProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
        isActive ? 'text-primary' : 'text-gray-500 dark:text-gray-400'
      }`
    }
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
);

export const navLinks = [
  {
    path: '/assistant',
    icon: <MessageSquare className="h-4 w-4" />,
    label: 'Assistant',
    highlight: false,
    badge: false
  },
  {
    path: '/documents',
    icon: <FileText className="h-4 w-4" />,
    label: 'Documents',
    highlight: false,
    badge: false
  },
  {
    path: '/quiz',
    icon: <Brain className="h-4 w-4" />,
    label: 'Quiz',
    highlight: false,
    badge: false
  },
  {
    path: '/chat-237',
    icon: <MessageCircle className="h-4 w-4" />,
    label: 'Chat 237',
    highlight: false,
    badge: false
  },
  {
    path: '/youtube-analysis',
    icon: <YoutubeIcon className="h-4 w-4 text-red-600" />,
    label: 'Analyse YouTube',
    highlight: false,
    badge: false
  },
  {
    path: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: 'Tableau de bord',
    highlight: false,
    badge: false
  }
];

interface NavbarLinksProps {
  isApiKeySet: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

const NavbarLinks = ({ isApiKeySet, isMobile = false, onNavClick }: NavbarLinksProps) => {
  return (
    <>
      {navLinks.map((link) => (
        <NavbarLink 
          key={link.path}
          to={link.path} 
          icon={link.icon} 
          label={link.label}
          onClick={onNavClick}
        />
      ))}
    </>
  );
};

export default NavbarLinks;
