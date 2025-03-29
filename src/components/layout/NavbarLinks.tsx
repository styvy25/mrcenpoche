
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, BookOpen, HelpCircle, AlertTriangle } from 'lucide-react';

interface NavLink {
  path: string;
  icon: React.ReactNode;
  label: string;
  badge?: boolean;
  highlight?: boolean;
}

interface NavbarLinksProps {
  isApiKeySet: boolean;
  isMobile?: boolean;
  onNavClick?: () => void;
}

export const navLinks: NavLink[] = [
  { 
    path: "/assistant", 
    icon: <MessageSquare className="h-4 w-4" />, 
    label: "Assistant", 
    badge: true 
  },
  { 
    path: "/documents", 
    icon: <FileText className="h-4 w-4" />, 
    label: "Documents" 
  },
  { 
    path: "/news", 
    icon: <BookOpen className="h-4 w-4" />, 
    label: "Actualités" 
  },
  { 
    path: "/quiz", 
    icon: <HelpCircle className="h-4 w-4" />, 
    label: "Quiz" 
  },
  { 
    path: "/alerte-fraude", 
    icon: <AlertTriangle className="h-4 w-4" />, 
    label: "Signaler", 
    highlight: true 
  }
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

  return (
    <>
      {navLinks.map((link) => (
        <Link 
          to={link.path} 
          key={link.path}
          onClick={onNavClick}
          className={isMobile ? 'w-full' : ''}
        >
          <Button
            variant={isActive(link.path) ? "default" : link.highlight ? "destructive" : "ghost"}
            className={isMobile ? "w-full justify-start" : "flex items-center gap-1"}
          >
            {link.icon}
            <span className={isMobile ? "ml-2" : ""}>{link.label}</span>
            {link.badge && !isApiKeySet && (
              <Badge variant="outline" className={isMobile ? "ml-auto text-xs" : "ml-1 text-[10px] py-0"}>
                API Requise
              </Badge>
            )}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
