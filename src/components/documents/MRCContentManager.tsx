
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type ContentItem = {
  id: string;
  title: string;
  content_type: string;
  url: string;
  created_at: string;
  indexed: boolean;
}

type PDFDocument = {
  id: string;
  title: string;
  document_type: string;
  file_url: string;
  created_at: string;
  indexed: boolean;
}

const MRCContentManager = () => {
  const [loading, setLoading] = useState(false);
  const [scrapingUrl, setScrapingUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [content, setContent] = useState<ContentItem[]>([]);
  const [pdfDocuments, setPdfDocuments] = useState<PDFDocument[]>([]);
  const [selectedTab, setSelectedTab] = useState("content");
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, [selectedTab]);

  const loadContent = async () => {
    try {
      setLoading(true);
      
      if (selectedTab === "content" || selectedTab === "all") {
        // Since mrc_content isn't in the DB schema, we'll use pdf_documents as a workaround
        // and filter for web content type
        const { data: contentData, error: contentError } = await supabase
          .from('pdf_documents')
          .select('*')
          .eq('document_type', 'web')
          .order('created_at', { ascending: false });
        
        if (contentError) throw contentError;
        
        // Transform data to fit ContentItem type
        const transformedContent: ContentItem[] = (contentData || []).map(item => ({
          id: item.id,
          title: item.title,
          content_type: item.document_type,
          url: item.file_url || '',
          created_at: item.created_at,
          indexed: Boolean(item.status === 'indexed')
        }));
        
        setContent(transformedContent);
      }
      
      if (selectedTab === "pdf" || selectedTab === "all") {
        const { data: pdfData, error: pdfError } = await supabase
          .from('pdf_documents')
          .select('*')
          .eq('document_type', 'pdf')
          .order('created_at', { ascending: false });
        
        if (pdfError) throw pdfError;
        
        // Transform to match PDFDocument type
        const transformedPdfs: PDFDocument[] = (pdfData || []).map(item => ({
          id: item.id,
          title: item.title,
          document_type: item.document_type,
          file_url: item.file_url || '',
          created_at: item.created_at,
          indexed: Boolean(item.status === 'indexed')
        }));
        
        setPdfDocuments(transformedPdfs);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger le contenu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleScrapeWebsite = async () => {
    if (!scrapingUrl) {
      toast({
        title: "URL requise",
        description: "Veuillez entrer une URL à analyser",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Call the edge function to scrape the website
      const { data, error } = await supabase.functions.invoke('optimize-seo', {
        body: { action: 'scrape_website', url: scrapingUrl }
      });
      
      if (error) throw error;
      
      toast({
        title: "Site analysé avec succès",
        description: `Le contenu de ${scrapingUrl} a été extrait et indexé`,
      });
      
      // Refresh content
      loadContent();
      setScrapingUrl("");
    } catch (error) {
      console.error('Error scraping website:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le site web",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzePDF = async () => {
    if (!pdfUrl) {
      toast({
        title: "URL requise",
        description: "Veuillez entrer une URL du document PDF",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // Insert directly into pdf_documents table
      const { data, error } = await supabase
        .from('pdf_documents')
        .insert({
          title: `PDF Document - ${new Date().toLocaleDateString()}`,
          document_type: 'pdf',
          file_url: pdfUrl,
          status: 'pending',
          content: {}
        })
        .select();
      
      if (error) throw error;
      
      toast({
        title: "PDF ajouté avec succès",
        description: `Le document ${pdfUrl} a été ajouté à l'index`,
      });
      
      // Refresh content
      loadContent();
      setPdfUrl("");
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'analyser le document PDF",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSEO = async (id: string, type: 'content' | 'pdf') => {
    try {
      setLoading(true);
      
      // Get the URL based on the item type
      let url = '';
      if (type === 'content') {
        const item = content.find(c => c.id === id);
        if (!item) throw new Error('Item not found');
        url = item.url;
      } else {
        const item = pdfDocuments.find(p => p.id === id);
        if (!item) throw new Error('Item not found');
        url = item.file_url;
      }
      
      // Call the edge function to generate SEO metadata
      const { data, error } = await supabase.functions.invoke('optimize-seo', {
        body: { action: 'generate_seo', url }
      });
      
      if (error) throw error;
      
      // Update the document status to indexed
      await supabase
        .from('pdf_documents')
        .update({ status: 'indexed' })
        .eq('id', id);
      
      toast({
        title: "SEO généré avec succès",
        description: `Les métadonnées SEO ont été générées pour ${url}`,
      });
      
      // Refresh content
      loadContent();
    } catch (error) {
      console.error('Error generating SEO:', error);
      toast({
        title: "Erreur",
        description: "Impossible de générer les métadonnées SEO",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id: string, type: 'content' | 'pdf') => {
    try {
      setLoading(true);
      
      // For both types, delete from pdf_documents table
      const { error } = await supabase
        .from('pdf_documents')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Élément supprimé",
        description: "L'élément a été supprimé avec succès",
      });
      
      // Refresh content
      loadContent();
    } catch (error) {
      console.error('Error removing item:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'élément",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gestionnaire de Contenu MRC</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Analyser un site web</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="URL du site à analyser" 
              value={scrapingUrl} 
              onChange={(e) => setScrapingUrl(e.target.value)}
              disabled={loading}
            />
            <Button 
              onClick={handleScrapeWebsite} 
              disabled={loading || !scrapingUrl}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Analyser
            </Button>
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Ajouter un document PDF</h3>
          <div className="flex gap-2">
            <Input 
              placeholder="URL du document PDF" 
              value={pdfUrl} 
              onChange={(e) => setPdfUrl(e.target.value)}
              disabled={loading}
            />
            <Button 
              onClick={handleAnalyzePDF} 
              disabled={loading || !pdfUrl}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Ajouter
            </Button>
          </div>
        </Card>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="content">Contenu Web</TabsTrigger>
          <TabsTrigger value="pdf">Documents PDF</TabsTrigger>
          <TabsTrigger value="all">Tout</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content">
          <ContentTable 
            items={content} 
            type="content"
            onGenerateSEO={handleGenerateSEO}
            onRemove={handleRemoveItem}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="pdf">
          <PDFTable 
            items={pdfDocuments} 
            onGenerateSEO={handleGenerateSEO}
            onRemove={handleRemoveItem}
            loading={loading}
          />
        </TabsContent>
        
        <TabsContent value="all">
          <h3 className="text-xl font-semibold mb-2">Contenu Web</h3>
          <ContentTable 
            items={content} 
            type="content"
            onGenerateSEO={handleGenerateSEO}
            onRemove={handleRemoveItem}
            loading={loading}
          />
          
          <h3 className="text-xl font-semibold mb-2 mt-6">Documents PDF</h3>
          <PDFTable 
            items={pdfDocuments} 
            onGenerateSEO={handleGenerateSEO}
            onRemove={handleRemoveItem}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

type ContentTableProps = {
  items: ContentItem[];
  type: 'content';
  onGenerateSEO: (id: string, type: 'content' | 'pdf') => void;
  onRemove: (id: string, type: 'content' | 'pdf') => void;
  loading: boolean;
}

const ContentTable: React.FC<ContentTableProps> = ({ items, type, onGenerateSEO, onRemove, loading }) => {
  if (!items.length) {
    return <p className="text-center p-4">Aucun contenu trouvé</p>;
  }
  
  return (
    <Table>
      <TableCaption>Liste du contenu web</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Indexé</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.content_type}</TableCell>
            <TableCell>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate block max-w-xs"
              >
                {item.url}
              </a>
            </TableCell>
            <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
            <TableCell>{item.indexed ? 'Oui' : 'Non'}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onGenerateSEO(item.id, type)}
                  disabled={loading}
                >
                  Générer SEO
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onRemove(item.id, type)}
                  disabled={loading}
                >
                  Supprimer
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type PDFTableProps = {
  items: PDFDocument[];
  onGenerateSEO: (id: string, type: 'content' | 'pdf') => void;
  onRemove: (id: string, type: 'content' | 'pdf') => void;
  loading: boolean;
}

const PDFTable: React.FC<PDFTableProps> = ({ items, onGenerateSEO, onRemove, loading }) => {
  if (!items.length) {
    return <p className="text-center p-4">Aucun document PDF trouvé</p>;
  }
  
  return (
    <Table>
      <TableCaption>Liste des documents PDF</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Titre</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>URL</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Indexé</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.document_type}</TableCell>
            <TableCell>
              <a 
                href={item.file_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate block max-w-xs"
              >
                {item.file_url}
              </a>
            </TableCell>
            <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
            <TableCell>{item.indexed ? 'Oui' : 'Non'}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onGenerateSEO(item.id, 'pdf')}
                  disabled={loading}
                >
                  Générer SEO
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onRemove(item.id, 'pdf')}
                  disabled={loading}
                >
                  Supprimer
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MRCContentManager;
