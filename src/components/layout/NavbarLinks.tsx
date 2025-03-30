
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MessageSquare, 
  FileText, 
  Brain, 
  MessageCircle, 
  Youtube as YoutubeIcon, 
  LayoutDashboard 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface NavLinkItem {
  path: string;
  icon: React.ReactNode;
  label: string;
  highlight?: boolean;
  badge?: boolean | string;
  requiresApiKey?: boolean;
}

export const navLinks: NavLinkItem[] = [
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
    badge: false,
    requiresApiKey: true
  },
  {
    path: '/dashboard',
    icon: <LayoutDashboard className="h-4 w-4" />,
    label: 'Tableau de bord',
    highlight: false,
    badge: false
  }
];

interface NavbarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: boolean | string;
  highlight?: boolean;
  onClick?: () => void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ 
  to, 
  icon, 
  label, 
  badge,
  highlight, 
  onClick 
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
        isActive ? 'text-primary' : highlight ? 'text-mrc-red' : 'text-gray-500 dark:text-gray-400'
      }`
    }
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
    {badge && (
      <Badge variant="outline" className="ml-2 text-xs py-0 px-1">
        {typeof badge === 'string' ? badge : 'New'}
      </Badge>
    )}
  </NavLink>
);

interface NavbarLinksProps {
  isApiKeySet: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ 
  isApiKeySet, 
  isMobile = false, 
  onNavClick 
}) => {
  // Filter out links that require API keys if they're not set
  const filteredLinks = isApiKeySet 
    ? navLinks 
    : navLinks.filter(link => !link.requiresApiKey);

  return (
    <>
      {filteredLinks.map((link) => (
        <NavbarLink 
          key={link.path}
          to={link.path} 
          icon={link.icon} 
          label={link.label}
          badge={link.badge}
          highlight={link.highlight}
          onClick={onNavClick}
        />
      ))}
    </>
  );
};

export default NavbarLinks;
