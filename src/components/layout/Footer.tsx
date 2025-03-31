
import React from 'react';
import { FileText, MessageSquare, Brain, User, Youtube, Home, Video, BookOpen, Settings } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Accueil',
      icon: <Home className="h-full w-full" />,
      href: '/',
      active: location.pathname === '/' || location.pathname === '/index',
      color: 'bg-gradient-to-r from-palette-cyan-400 to-palette-cyan-600 text-white'
    },
    {
      title: 'Assistant',
      icon: <MessageSquare className="h-full w-full" />,
      href: '/assistant',
      active: location.pathname === '/assistant',
      color: 'bg-gradient-to-r from-palette-purple-400 to-palette-purple-600 text-white'
    },
    {
      title: 'Documents',
      icon: <FileText className="h-full w-full" />,
      href: '/documents',
      active: location.pathname === '/documents',
      color: 'bg-gradient-to-r from-palette-green-400 to-palette-green-600 text-white'
    },
    {
      title: 'Quiz',
      icon: <Brain className="h-full w-full" />,
      href: '/quiz',
      active: location.pathname === '/quiz',
      color: 'bg-gradient-to-r from-palette-gold-400 to-palette-gold-600 text-white'
    },
    {
      title: 'Streaming',
      icon: <Video className="h-full w-full" />,
      href: '/streaming',
      active: location.pathname === '/streaming',
      color: 'bg-gradient-to-r from-palette-pink-400 to-palette-pink-600 text-white'
    },
    {
      title: 'Formation',
      icon: <BookOpen className="h-full w-full" />,
      href: '/modules',
      active: location.pathname === '/modules',
      color: 'bg-gradient-to-r from-palette-teal-400 to-palette-teal-600 text-white'
    },
    {
      title: 'YouTube',
      icon: <Youtube className="h-full w-full" />,
      href: '/youtube-download',
      active: location.pathname === '/youtube-download' || location.pathname === '/youtube-analyzer',
      color: 'bg-gradient-to-r from-palette-red-400 to-palette-red-600 text-white'
    },
    {
      title: 'Compte',
      icon: <User className="h-full w-full" />,
      href: '/dashboard',
      active: location.pathname === '/dashboard' || location.pathname === '/settings',
      color: 'bg-gradient-to-r from-palette-orange-400 to-palette-orange-600 text-white'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <Dock className="items-end pb-3">
        {navItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <DockItem
                className={`aspect-square rounded-full ${
                  item.active 
                    ? item.color
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 dark:text-gray-300'
                }`}
              >
                <DockLabel>{item.title}</DockLabel>
                <DockIcon>{item.icon}</DockIcon>
              </DockItem>
            </motion.div>
          </Link>
        ))}
      </Dock>
    </div>
  );
};

export default Footer;
