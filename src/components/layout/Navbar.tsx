
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Settings, Book, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthNavItem from "./AuthNavItem";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-8 w-8 bg-gradient-to-br from-mrc-blue to-mrc-green rounded-lg mr-2 flex items-center justify-center text-white font-bold text-lg">
                  M
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">MRC en Poche</span>
              </Link>
            </div>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/chat">
              <Button
                variant={isActive("/chat") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Assistant IA</span>
              </Button>
            </Link>
            <Link to="/documents">
              <Button
                variant={isActive("/documents") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Book className="h-4 w-4" />
                <span>Documents</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button
                variant={isActive("/settings") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Settings className="h-4 w-4" />
                <span>Paramètres</span>
              </Button>
            </Link>
            <AuthNavItem />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/chat"
              className={`${
                isActive("/chat")
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-500 hover:bg-gray-50"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Assistant IA</span>
              </div>
            </Link>
            <Link
              to="/documents"
              className={`${
                isActive("/documents")
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-500 hover:bg-gray-50"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Book className="h-5 w-5" />
                <span>Documents</span>
              </div>
            </Link>
            <Link
              to="/settings"
              className={`${
                isActive("/settings")
                  ? "bg-blue-50 text-blue-500"
                  : "text-gray-500 hover:bg-gray-50"
              } block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </div>
            </Link>
            <div className="px-3 py-2">
              <AuthNavItem />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
