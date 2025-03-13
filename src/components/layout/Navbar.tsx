
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Settings, MessageSquare, PenTool, CreditCard, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/auth/AuthDialog";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-mrc-blue dark:text-white">
              MRC <span className="text-mrc-green">LearnScape</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/modules" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/modules') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              Modules
            </Link>
            <Link to="/chat" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/chat') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Assistant
            </Link>
            <Link to="/quiz" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/quiz') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <PenTool className="h-4 w-4 mr-2" />
              Quiz
            </Link>
            <Link to="/payment" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/payment') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <CreditCard className="h-4 w-4 mr-2" />
              Paiement
            </Link>
            <Link to="/documents" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/documents') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </Link>
            <Link to="/settings" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/settings') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <AuthDialog />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/modules" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/modules') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <BookOpen className="h-4 w-4 mr-2" />
              Modules
            </Link>
            <Link to="/chat" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/chat') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Assistant
            </Link>
            <Link to="/quiz" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/quiz') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <PenTool className="h-4 w-4 mr-2" />
              Quiz
            </Link>
            <Link to="/payment" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/payment') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <CreditCard className="h-4 w-4 mr-2" />
              Paiement
            </Link>
            <Link to="/documents" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/documents') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </Link>
            <Link to="/settings" className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive('/settings') ? 'bg-mrc-blue/10 text-mrc-blue' : 'text-gray-700 dark:text-gray-300'}`} onClick={closeMenu}>
              <Settings className="h-4 w-4 mr-2" />
              Paramètres
            </Link>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <AuthDialog />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
