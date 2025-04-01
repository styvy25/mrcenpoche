
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ResponsiveContainer from './ResponsiveContainer';
import ApplicationStatus from './ApplicationStatus';
import { NavigationProvider } from './navigation/NavigationContext';
import AuthNavItem from './AuthNavItem';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <NavigationProvider>
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar navEndElement={<AuthNavItem />} />
        <main className="flex-grow py-8">
          <ResponsiveContainer>
            <ApplicationStatus />
            {children}
          </ResponsiveContainer>
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  );
};

export default MainLayout;
