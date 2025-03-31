
import React from 'react';
import { FileText, MessageSquare, Brain, User, Youtube, Home } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Accueil',
      icon: <Home className="h-full w-full" />,
      href: '/',
      active: location.pathname === '/' || location.pathname === '/index',
      color: 'bg-palette-cyan-400 text-white'
    },
    {
      title: 'Assistant',
      icon: <MessageSquare className="h-full w-full" />,
      href: '/assistant',
      active: location.pathname === '/assistant',
      color: 'bg-palette-purple-400 text-white'
    },
    {
      title: 'Documents',
      icon: <FileText className="h-full w-full" />,
      href: '/documents',
      active: location.pathname === '/documents',
      color: 'bg-palette-green-400 text-white'
    },
    {
      title: 'Quiz',
      icon: <Brain className="h-full w-full" />,
      href: '/quiz',
      active: location.pathname === '/quiz',
      color: 'bg-palette-gold-400 text-white'
    },
    {
      title: 'YouTube',
      icon: <Youtube className="h-full w-full" />,
      href: '/youtube-download',
      active: location.pathname === '/youtube-download' || location.pathname === '/youtube-analyzer',
      color: 'bg-palette-red-400 text-white'
    },
    {
      title: 'Compte',
      icon: <User className="h-full w-full" />,
      href: '/dashboard',
      active: location.pathname === '/dashboard' || location.pathname === '/settings',
      color: 'bg-palette-orange-400 text-white'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Dock className="items-end pb-3">
        {navItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <DockItem
              className={`aspect-square rounded-full ${
                item.active 
                  ? item.color
                  : 'bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-300'
              }`}
            >
              <DockLabel>{item.title}</DockLabel>
              <DockIcon>{item.icon}</DockIcon>
            </DockItem>
          </Link>
        ))}
      </Dock>
    </div>
  );
};

export default Footer;
