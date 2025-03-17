
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import PDFGenerator from "@/components/documents/PDFGenerator";
import AuthenticationNotice from "@/components/documents/AuthenticationNotice";
import PremiumBanner from "@/components/documents/PremiumBanner";
import { useAuth } from "@/components/auth/AuthContext";
import { useAppContext } from '@/App';

const DocumentsPage = () => {
  const { isAuthenticated } = useAuth();
  const { isPremium } = useAppContext();

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center md:text-start">Générateur de Documents</h1>
        
        {/* Show premium banner for free authenticated users */}
        {isAuthenticated && !isPremium && <PremiumBanner />}
        
        {isAuthenticated ? (
          <PDFGenerator />
        ) : (
          <AuthenticationNotice />
        )}
      </div>
    </MainLayout>
  );
};

export default DocumentsPage;
