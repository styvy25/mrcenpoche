
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Book, FilePdf } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityService';

interface CourseGenerationFormProps {
  onSubmit?: (courseData: any) => void;
}

const CourseGenerationForm: React.FC<CourseGenerationFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('histoire');
  const [keywords, setKeywords] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const { toast } = useToast();

  const generateCourseContent = async () => {
    if (!title || !description) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Hardcoded API key for demo purposes - in production use environment variables or Supabase edge functions
      const apiKey = ""; // You'll need to add your Perplexity API key here
      
      const prompt = `Génère un cours détaillé sur le thème suivant pour la plateforme MRC LearnScape:
        
Titre: ${title}
Description: ${description}
Catégorie: ${category}
Mots-clés: ${keywords}

Le cours doit avoir la structure suivante:
1. Introduction (présentation du sujet et objectifs d'apprentissage)
2. Contexte historique ou théorique
3. Points clés (3-5 sections principales)
4. Applications pratiques
5. Conclusion
6. Références et ressources additionnelles

Assure-toi que le contenu est politiquement neutre mais informatif, précis et adapté pour la formation politique des militants du MRC au Cameroun. Format en markdown.`;

      const response = await getPerplexityResponse(apiKey, prompt);
      setGeneratedContent(response);
      
      if (onSubmit) {
        onSubmit({
          title,
          description,
          category,
          keywords: keywords.split(',').map(k => k.trim()),
          content: response,
          createdAt: new Date()
        });
      }
      
      toast({
        title: "Contenu généré avec succès",
        description: "Le contenu du cours a été créé.",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du contenu.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePDF = () => {
    // Function to create PDF from the generated content
    toast({
      title: "PDF en cours de création",
      description: "Cette fonctionnalité sera disponible prochainement.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Créer un nouveau cours</CardTitle>
        <CardDescription>
          Utilisez l'IA pour générer du contenu de cours sur la politique camerounaise et le MRC
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Titre du cours</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Histoire du MRC au Cameroun"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement le sujet et les objectifs du cours"
            rows={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="histoire">Histoire du MRC</SelectItem>
              <SelectItem value="programme">Programme politique</SelectItem>
              <SelectItem value="ideologie">Idéologie et valeurs</SelectItem>
              <SelectItem value="mobilisation">Techniques de mobilisation</SelectItem>
              <SelectItem value="communication">Communication politique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keywords">Mots-clés (séparés par des virgules)</Label>
          <Input
            id="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Ex: démocratie, élections, réformes"
          />
        </div>
        
        {generatedContent && (
          <div className="mt-6 border rounded-md p-4">
            <h3 className="text-lg font-medium mb-2">Aperçu du contenu généré</h3>
            <div className="max-h-60 overflow-y-auto prose prose-sm">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={generateCourseContent} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Génération en cours...
            </>
          ) : (
            <>
              <Book className="mr-2 h-4 w-4" />
              Générer le contenu
            </>
          )}
        </Button>
        
        {generatedContent && (
          <Button variant="outline" onClick={handleCreatePDF}>
            <FilePdf className="mr-2 h-4 w-4" />
            Créer un PDF
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseGenerationForm;
