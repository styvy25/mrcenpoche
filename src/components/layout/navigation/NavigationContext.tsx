
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextProps {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const NavigationContext = createContext<NavigationContextProps>({
  isOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <NavigationContext.Provider value={{ isOpen, toggleMenu, closeMenu }}>
      {children}
    </NavigationContext.Provider>
  );
};
