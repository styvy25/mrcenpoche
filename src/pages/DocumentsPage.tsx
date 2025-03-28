
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Check, AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { useToast } from '@/components/ui/use-toast';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';

type DocumentTemplate = {
  id: string;
  title: string;
  description: string;
  documentType: string;
  icon: React.ReactNode;
};

const DocumentsPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    location: '',
    reason: '',
    details: '',
    documentType: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<string | null>(null);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { canGeneratePdf, incrementPdfGenerations } = usePlanLimits();
  const { toast } = useToast();

  const documentTemplates: DocumentTemplate[] = [
    {
      id: 'complaint',
      title: 'Plainte électorale',
      description: 'Document officiel pour signaler une irrégularité électorale',
      documentType: 'legal',
      icon: <FileText className="h-12 w-12 text-mrc-blue" />
    },
    {
      id: 'declaration',
      title: 'Déclaration de candidature',
      description: 'Formulaire officiel pour se présenter à une élection',
      documentType: 'legal',
      icon: <FileText className="h-12 w-12 text-mrc-green" />
    },
    {
      id: 'observe',
      title: 'Rapport d\'observation',
      description: 'Document pour rapporter vos observations électorales',
      documentType: 'report',
      icon: <FileText className="h-12 w-12 text-mrc-red" />
    }
  ];

  const handleSelectTemplate = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setFormData(prev => ({
      ...prev,
      documentType: template.id
    }));
    setGeneratedDocument(null);
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setGeneratedDocument(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateDocument = async () => {
    // Check if the user can generate a PDF based on their plan
    if (!canGeneratePdf()) {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    setIsGenerating(true);
    
    // Increment the PDF generation counter
    incrementPdfGenerations();
    
    // Simulate document generation with timeout
    setTimeout(() => {
      setIsGenerating(false);
      
      // Create a fake document content based on the template and form data
      const documentContent = generateDocumentContent();
      setGeneratedDocument(documentContent);
      
      toast({
        title: "Document généré",
        description: "Votre document a été généré avec succès.",
      });
    }, 2000);
  };

  const generateDocumentContent = (): string => {
    const date = new Date().toLocaleDateString('fr-FR');
    
    let content = '';
    
    if (selectedTemplate?.id === 'complaint') {
      content = `
PLAINTE ÉLECTORALE

Date: ${date}

À l'attention du Président d'ELECAM,

Je soussigné, ${formData.fullName}, domicilié à ${formData.location}, vous adresse cette plainte formelle concernant des irrégularités électorales observées.

Motif de la plainte: ${formData.reason}

Détails:
${formData.details}

Je vous prie de bien vouloir examiner cette plainte et de prendre les mesures nécessaires pour remédier à cette situation.

Veuillez agréer, Monsieur le Président, l'expression de mes salutations distinguées.

${formData.fullName}
Email: ${formData.email}
      `;
    } else if (selectedTemplate?.id === 'declaration') {
      content = `
DÉCLARATION DE CANDIDATURE

Date: ${date}

Je soussigné, ${formData.fullName}, né(e) le [date de naissance], domicilié(e) à ${formData.location}, déclare par la présente ma candidature pour les élections [type d'élection].

Motif de candidature: 
${formData.reason}

Informations complémentaires:
${formData.details}

Je certifie sur l'honneur que toutes les informations fournies sont exactes et que je remplis toutes les conditions d'éligibilité requises par la loi.

Fait à ${formData.location}, le ${date}

${formData.fullName}
Email: ${formData.email}
      `;
    } else if (selectedTemplate?.id === 'observe') {
      content = `
RAPPORT D'OBSERVATION ÉLECTORALE

Date: ${date}
Lieu: ${formData.location}
Observateur: ${formData.fullName}

Type d'observation: ${formData.reason}

Détails de l'observation:
${formData.details}

Ce rapport est transmis conformément aux procédures établies pour l'observation électorale indépendante.

Fait par ${formData.fullName}
Contact: ${formData.email}
      `;
    }
    
    return content;
  };

  const handleDownloadDocument = () => {
    if (!generatedDocument) return;
    
    // Create a blob from the document content
    const blob = new Blob([generatedDocument], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.id || 'document'}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Téléchargement démarré",
      description: "Votre document a été téléchargé.",
    });
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Documents</h1>
        
        <div className="max-w-4xl mx-auto">
          {!selectedTemplate ? (
            <div>
              <p className="text-center text-muted-foreground mb-6">
                Sélectionnez un modèle de document pour commencer
              </p>
              
              <PremiumBanner type="pdf" className="mb-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {documentTemplates.map((template) => (
                  <Card 
                    key={template.id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <CardHeader className="text-center">
                      <div className="mx-auto mb-2">{template.icon}</div>
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="justify-center">
                      <Button>Sélectionner</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <Button variant="ghost" onClick={handleBackToTemplates} className="mb-4">
                ← Retour aux modèles
              </Button>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {selectedTemplate.icon}
                    <div>
                      <CardTitle>{selectedTemplate.title}</CardTitle>
                      <CardDescription>{selectedTemplate.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {!generatedDocument ? (
                    <div className="space-y-6">
                      <PremiumBanner type="pdf" className="mb-6" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Nom complet</Label>
                          <Input 
                            id="fullName" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleInputChange}
                            placeholder="Ex: Jean Dupont" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email"
                            value={formData.email} 
                            onChange={handleInputChange}
                            placeholder="Ex: jean.dupont@example.com" 
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Localisation</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={formData.location} 
                          onChange={handleInputChange}
                          placeholder="Ex: Yaoundé, Quartier X" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reason">
                          {selectedTemplate.id === 'complaint' ? 'Motif de la plainte' : 
                           selectedTemplate.id === 'declaration' ? 'Motif de candidature' : 
                           'Type d\'observation'}
                        </Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange(value, 'reason')}
                          value={formData.reason}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un motif" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedTemplate.id === 'complaint' && (
                              <>
                                <SelectItem value="irregularite_bureau">Irrégularité dans un bureau de vote</SelectItem>
                                <SelectItem value="bourrage_urne">Bourrage d'urne</SelectItem>
                                <SelectItem value="intimidation">Intimidation d'électeurs</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </>
                            )}
                            
                            {selectedTemplate.id === 'declaration' && (
                              <>
                                <SelectItem value="election_municipale">Élection municipale</SelectItem>
                                <SelectItem value="election_legislative">Élection législative</SelectItem>
                                <SelectItem value="election_regionale">Élection régionale</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </>
                            )}
                            
                            {selectedTemplate.id === 'observe' && (
                              <>
                                <SelectItem value="ouverture_bureau">Ouverture du bureau de vote</SelectItem>
                                <SelectItem value="deroulement_vote">Déroulement du vote</SelectItem>
                                <SelectItem value="depouillement">Dépouillement</SelectItem>
                                <SelectItem value="autre">Autre</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="details">Détails</Label>
                        <Textarea 
                          id="details" 
                          name="details"
                          value={formData.details}
                          onChange={handleInputChange}
                          placeholder="Décrivez en détail votre situation..." 
                          rows={6}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-2 text-green-600 mb-4">
                        <Check className="h-6 w-6" />
                        <span className="text-lg font-medium">Document généré avec succès</span>
                      </div>
                      
                      <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap font-mono text-sm">
                        {generatedDocument}
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  {!generatedDocument ? (
                    <Button 
                      onClick={handleGenerateDocument}
                      disabled={isGenerating || !formData.fullName || !formData.email || !formData.location || !formData.reason || !formData.details}
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Génération en cours...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Générer le document
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button onClick={handleDownloadDocument}>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </MainLayout>
  );
};

export default DocumentsPage;
