
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, Download, Save, RefreshCw, FileText, Youtube, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface AIScriptAssistantProps {
  title?: string;
  description?: string;
}

const AIScriptAssistant: React.FC<AIScriptAssistantProps> = ({
  title = "Assistant IA de Scripts",
  description = "Générez des scripts et tutoriels pour vos live streams"
}) => {
  const [prompt, setPrompt] = useState('');
  const [scriptContent, setScriptContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('script');
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const generateScript = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt requis",
        description: "Veuillez entrer un prompt pour générer le script",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Example script content - in a real app this would come from Perplexity or Gemini API
    setTimeout(() => {
      const generatedContent = `# Script sur "${prompt}"

## Introduction
Bonjour à tous et bienvenue dans ce live stream du MRC. Aujourd'hui, nous allons parler de ${prompt}.

## Points clés à aborder
1. Contexte historique du sujet
2. Importance pour le Cameroun actuel
3. Position du MRC sur cette question
4. Actions concrètes proposées

## Développement
### Contexte historique
Le contexte de ${prompt} remonte à plusieurs années. Il est important de comprendre les origines de cette situation pour mieux appréhender les enjeux actuels.

### Importance pour le Cameroun
Cette question est cruciale pour l'avenir du Cameroun car elle touche directement à la vie quotidienne des citoyens et au développement économique du pays.

### Position du MRC
Le Mouvement pour la Renaissance du Cameroun a toujours défendu une position claire sur ce sujet. Notre approche se base sur les principes suivants...

### Actions concrètes
Voici les mesures que nous proposons pour adresser efficacement cette problématique:
- Première proposition d'action
- Deuxième proposition d'action
- Troisième proposition d'action

## Conclusion
En conclusion, ${prompt} représente un enjeu majeur que le MRC est prêt à adresser avec des solutions concrètes et innovantes. Nous comptons sur votre soutien pour faire avancer ces idées.

## Appel à l'action
N'oubliez pas de partager ce live stream et de vous abonner à notre chaîne pour rester informés des actualités du MRC.`;

      setScriptContent(generatedContent);
      setIsGenerating(false);
      setActiveTab('edit');
      
      toast({
        title: "Script généré avec succès",
        description: "Vous pouvez maintenant éditer et utiliser votre script",
      });
    }, 3000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(scriptContent);
    setIsCopied(true);
    
    toast({
      title: "Copié!",
      description: "Le script a été copié dans le presse-papier",
    });
    
    setTimeout(() => setIsCopied(false), 2000);
  };

  const downloadScript = () => {
    const blob = new Blob([scriptContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `script-mrc-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Téléchargement en cours",
      description: "Le script est en cours de téléchargement",
    });
  };

  const createQuiz = () => {
    toast({
      title: "Génération du quiz",
      description: "Un quiz basé sur ce contenu est en cours de création",
    });
    // Implement quiz generation logic
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {title}
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="script" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            <span>Générer</span>
          </TabsTrigger>
          <TabsTrigger value="edit" className="flex gap-2 items-center" disabled={!scriptContent}>
            <FileText className="h-4 w-4" />
            <span>Éditer</span>
          </TabsTrigger>
          <TabsTrigger value="youtube" className="flex gap-2 items-center">
            <Youtube className="h-4 w-4" />
            <span>Vidéos</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="script" className="mt-6">
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Décrivez votre sujet</h3>
                <Textarea
                  placeholder="Ex: Les enjeux politiques actuels au Cameroun et la vision du MRC pour les élections de 2025..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-50">Politique</Badge>
                  </h4>
                  <p className="text-sm text-gray-500">Discours politiques, analyses électorales, vision du MRC</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50">Économie</Badge>
                  </h4>
                  <p className="text-sm text-gray-500">Développement économique, finances, commerce, emploi</p>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Badge variant="outline" className="bg-yellow-50">Social</Badge>
                  </h4>
                  <p className="text-sm text-gray-500">Éducation, santé, jeunesse, culture, sport</p>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-4">
            <Button
              onClick={generateScript}
              disabled={isGenerating || !prompt.trim()}
              className="bg-mrc-blue flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Générer un script</span>
                </>
              )}
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="edit" className="mt-6">
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Titre du script"
                defaultValue={prompt ? `Script sur "${prompt}"` : ""}
                className="font-semibold"
              />
              
              <Textarea
                value={scriptContent}
                onChange={(e) => setScriptContent(e.target.value)}
                className="min-h-[400px] font-mono text-sm"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Copié!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copier</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={downloadScript}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>Télécharger</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={createQuiz}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span>Créer un Quiz</span>
              </Button>
            </div>
            
            <Button className="bg-mrc-blue flex items-center gap-2">
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </Button>
          </CardFooter>
        </TabsContent>
        
        <TabsContent value="youtube" className="mt-6">
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-2">Rechercher des vidéos MRC</h3>
              <div className="flex gap-2">
                <Input placeholder="Rechercher des vidéos YouTube..." defaultValue={prompt} />
                <Button variant="outline">Rechercher</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi/placeholder1/hqdefault.jpg"
                    alt="Placeholder thumbnail"
                    className="w-full h-40 object-cover bg-gray-200"
                  />
                  <div className="p-3">
                    <h4 className="font-medium">Discours de Maurice Kamto</h4>
                    <p className="text-sm text-gray-500 mt-1">Durée: 23:15 • 15K vues</p>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <img
                    src="https://i.ytimg.com/vi/placeholder2/hqdefault.jpg"
                    alt="Placeholder thumbnail"
                    className="w-full h-40 object-cover bg-gray-200"
                  />
                  <div className="p-3">
                    <h4 className="font-medium">Analyse politique - MRC</h4>
                    <p className="text-sm text-gray-500 mt-1">Durée: 15:30 • 8.2K vues</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AIScriptAssistant;
