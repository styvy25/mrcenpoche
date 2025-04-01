
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navigationItems } from '../navigation/navigationData';

const baseStyles = "group relative inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 data-[state=open]:bg-secondary dark:bg-gray-900 dark:text-gray-50";

const activeStyles = "bg-mrc-blue text-white dark:bg-mrc-blue dark:text-gray-50";

const inactiveStyles = "text-gray-500 hover:text-gray-300 dark:text-gray-400 dark:hover:text-gray-50";

export default function DesktopNavLinks() {
  const location = useLocation();
  
  // Function to determine if a path is active
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="hidden md:flex items-center gap-1">
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`${baseStyles} ${
            isActive(item.path) ? activeStyles : inactiveStyles
          }`}
        >
          {item.getIcon()}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
