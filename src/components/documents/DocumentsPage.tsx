
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFGenerator from './PDFGenerator';
import CertificateGenerator from './CertificateGenerator';
import MRCContentManager from './MRCContentManager';
import YouTubeDownloader from './YouTubeDownloader';
import { useScreenSize } from '@/hooks/useScreenSize';

interface DocumentsPageProps {
  initialTab?: string;
}

const DocumentsPage = ({ initialTab }: DocumentsPageProps) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'generator');
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  return (
    <div className="container mx-auto py-3 sm:py-6 px-2 sm:px-4">
      <h1 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-6">Gestion des Documents</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid grid-cols-2 sm:grid-cols-4 mb-3 sm:mb-6 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="generator">Générateur de PDF</TabsTrigger>
          <TabsTrigger value="certificate">Certificats</TabsTrigger>
          <TabsTrigger value="mrc">Contenu MRC</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
        </TabsList>
        
        <div className="p-2 sm:p-4 bg-white rounded-lg shadow-sm">
          <TabsContent value="generator" className="mt-0">
            <PDFGenerator />
          </TabsContent>
          
          <TabsContent value="certificate" className="mt-0">
            <CertificateGenerator />
          </TabsContent>
          
          <TabsContent value="mrc" className="mt-0">
            <MRCContentManager />
          </TabsContent>
          
          <TabsContent value="youtube" className="mt-0">
            <YouTubeDownloader />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
