
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthNavItem from './AuthNavItem';

interface MainLayoutProps {
  children: React.ReactNode;
  navEndElement?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, navEndElement = <AuthNavItem /> }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar navEndElement={navEndElement} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
