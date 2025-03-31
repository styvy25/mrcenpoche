
import React from 'react';
import { MessageSquare, Brain, User, Youtube, Home, Video, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';

const Footer = () => {
  const location = useLocation();
  const { matches: isMobile } = useMediaQuery("(max-width: 768px)");

  // If on mobile, don't render the footer since we have the MobileNotificationDock
  if (isMobile) {
    return null;
  }

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
      title: 'Formation',
      icon: <BookOpen className="h-full w-full" />,
      href: '/modules',
      active: location.pathname === '/modules',
      color: 'bg-gradient-to-r from-palette-teal-400 to-palette-teal-600 text-white'
    },
    {
      title: 'Chat 237',
      icon: <MessageSquare className="h-full w-full" />,
      href: '/chat-237',
      active: location.pathname === '/chat-237',
      color: 'bg-gradient-to-r from-palette-blue-400 to-palette-blue-600 text-white'
    },
    {
      title: 'Quiz',
      icon: <Brain className="h-full w-full" />,
      href: '/quiz',
      active: location.pathname === '/quiz',
      color: 'bg-gradient-to-r from-palette-gold-400 to-palette-gold-600 text-white'
    },
    {
      title: 'Compte',
      icon: <User className="h-full w-full" />,
      href: '/dashboard',
      active: location.pathname === '/dashboard',
      color: 'bg-gradient-to-r from-palette-orange-400 to-palette-orange-600 text-white'
    }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:block">
      <div className="flex items-center justify-center gap-2 p-2 bg-black/20 backdrop-blur-lg rounded-full border border-white/10">
        {navItems.map((item, idx) => (
          <Link to={item.href} key={idx}>
            <motion.div
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative"
            >
              <div
                className={`p-3 rounded-full aspect-square ${
                  item.active 
                    ? item.color
                    : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 dark:text-gray-300'
                }`}
              >
                {item.icon}
              </div>
              <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap ${
                item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                {item.title}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
