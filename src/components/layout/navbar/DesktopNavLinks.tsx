import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const baseStyles = `
  group
  relative
  inline-flex
  items-center
  justify-center
  rounded-md
  py-2
  px-4
  text-sm
  font-medium
  transition-colors
  focus:outline-none
  focus:ring-2
  focus:ring-ring
  focus:ring-offset-2
  disabled:opacity-50
  data-[state=open]:bg-secondary
  dark:bg-gray-900
  dark:text-gray-50
`;

const activeStyles = `
  bg-mrc-blue
  text-white
  dark:bg-mrc-blue
  dark:text-gray-50
`;

const inactiveStyles = `
  text-gray-500
  hover:text-gray-300
  dark:text-gray-400
  dark:hover:text-gray-50
`;

export default function DesktopNavLinks() {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center gap-1">
      <Link
        to="/"
        className={`${baseStyles} ${
          location.pathname === '/' ? activeStyles : inactiveStyles
        }`}
      >
        Accueil
      </Link>
      <Link
        to="/modules"
        className={`${baseStyles} ${
          location.pathname === '/modules' ? activeStyles : inactiveStyles
        }`}
      >
        Modules
      </Link>
      <Link
        to="/training"
        className={`${baseStyles} ${
          location.pathname === '/training' ? activeStyles : inactiveStyles
        }`}
      >
        Formation
      </Link>
      <Link
        to="/quiz"
        className={`${baseStyles} ${
          location.pathname === '/quiz' ? activeStyles : inactiveStyles
        }`}
      >
        Quiz
      </Link>
      <Link
        to="/chat"
        className={`${baseStyles} ${
          location.pathname === '/chat' ? activeStyles : inactiveStyles
        }`}
      >
        Assistant IA
      </Link>
    </nav>
  );
}
