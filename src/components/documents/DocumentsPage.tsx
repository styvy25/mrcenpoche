
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PDFGenerator from './PDFGenerator';
import { CertificateGenerator } from './CertificateGenerator';
import MRCContentManager from './MRCContentManager';
import YouTubeDownloader from './YouTubeDownloader';

const DocumentsPage = () => {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Gestion des Documents</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="generator">Générateur de PDF</TabsTrigger>
          <TabsTrigger value="certificate">Certificats</TabsTrigger>
          <TabsTrigger value="mrc">Contenu MRC</TabsTrigger>
          <TabsTrigger value="youtube">YouTube</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator">
          <PDFGenerator />
        </TabsContent>
        
        <TabsContent value="certificate">
          <CertificateGenerator />
        </TabsContent>
        
        <TabsContent value="mrc">
          <MRCContentManager />
        </TabsContent>
        
        <TabsContent value="youtube">
          <YouTubeDownloader />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
