
import React from 'react';
import { FileText, MessageSquare, ScrollText } from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const navItems = [
    {
      title: 'Assistant',
      icon: <MessageSquare className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/assistant',
      active: location.pathname === '/assistant'
    },
    {
      title: 'Documents',
      icon: <FileText className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/documents',
      active: location.pathname === '/documents'
    },
    {
      title: 'Quiz',
      icon: <ScrollText className="h-full w-full text-neutral-600 dark:text-neutral-300" />,
      href: '/quiz',
      active: location.pathname === '/quiz'
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
                  ? 'bg-mrc-blue dark:bg-mrc-blue text-white'
                  : 'bg-gray-200 dark:bg-neutral-800'
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
