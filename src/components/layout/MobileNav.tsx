
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Newspaper, 
  Award, 
  Video, 
  Settings, 
  LogIn, 
  LogOut 
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import Logo from "@/components/branding/Logo";
import { usePlanLimits } from "@/hooks/usePlanLimits";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { userPlan } = usePlanLimits();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  const menuItems = [
    { to: "/", label: "Accueil", icon: <Home className="h-5 w-5" /> },
    { to: "/modules", label: "Modules", icon: <BookOpen className="h-5 w-5" /> },
    { to: "/news", label: "Actualités", icon: <Newspaper className="h-5 w-5" /> },
    { to: "/quiz", label: "Quiz", icon: <Award className="h-5 w-5" /> },
    { to: "/livestreaming", label: "Livestreaming", icon: <Video className="h-5 w-5" /> },
    { to: "/settings", label: "Paramètres", icon: <Settings className="h-5 w-5" /> }
  ];

  return (
    <>
      <div className="block md:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center">
            <Logo size="small" />
          </Link>
          
          {userPlan === 'premium' && (
            <div className="mx-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-green-500 text-white text-xs rounded-full">
              Premium
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-6 px-4 overflow-y-auto">
          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.to
                    ? "bg-mrc-blue/10 text-mrc-blue"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                onClick={closeMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-200">
            {user ? (
              <div className="space-y-3">
                <div className="px-4 py-2">
                  <p className="font-medium">{user.email}</p>
                  <p className="text-sm text-gray-500">
                    {userPlan === 'premium' ? 'Abonnement Premium' : 'Plan Gratuit'}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button
                className="w-full flex items-center justify-center gap-2 bg-mrc-blue"
                onClick={() => {
                  closeMenu();
                }}
                asChild
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
