
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, FilePlus, FileText } from 'lucide-react';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityService';
import { useToast } from '@/components/ui/use-toast';

interface CourseData {
  title: string;
  description: string;
  content: string;
  category: string;
  keywords: string[];
}

interface CourseGenerationFormProps {
  onSubmit: (courseData: CourseData) => void;
}

const CourseGenerationForm: React.FC<CourseGenerationFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [courseTitle, setCourseTitle] = useState<string>('');
  const [courseDescription, setCourseDescription] = useState<string>('');
  const [courseCategory, setCourseCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [keywords, setKeywords] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const categories = [
    { id: 'democratic-principles', name: 'Principes Démocratiques' },
    { id: 'electoral-system', name: 'Système Electoral Camerounais' },
    { id: 'mrc-history', name: 'Histoire du MRC' },
    { id: 'political-activism', name: 'Activisme Politique' },
    { id: 'political-communication', name: 'Communication Politique' },
  ];

  const generateCourseContent = async () => {
    if (!courseTitle || !courseDescription || !courseCategory) {
      toast({
        title: "Informations incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const prompt = `Génère un cours éducatif détaillé sur le sujet suivant:
      
Titre: ${courseTitle}
Description: ${courseDescription}
Catégorie: ${categories.find(cat => cat.id === courseCategory)?.name || courseCategory}
Mots-clés: ${keywords}

Le cours doit inclure:
1. Une introduction claire
2. 3 à 5 sections principales avec des sous-sections 
3. Des exemples pratiques et cas d'études pertinents
4. Une conclusion et résumé des points clés
5. Des références à la politique camerounaise et au MRC (Mouvement pour la Renaissance du Cameroun) si pertinent

Formate le texte en markdown.`;

      const content = await getPerplexityResponse("", prompt);
      setGeneratedContent(content);
      
      toast({
        title: "Contenu généré avec succès",
        description: "Le contenu du cours a été généré. Vous pouvez maintenant l'enregistrer.",
      });
    } catch (error) {
      console.error("Failed to generate course content:", error);
      toast({
        title: "Erreur de génération",
        description: "Une erreur s'est produite lors de la génération du contenu. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!generatedContent) {
      toast({
        title: "Contenu manquant",
        description: "Veuillez d'abord générer le contenu du cours.",
        variant: "destructive",
      });
      return;
    }
    
    const keywordsArray = keywords.split(',').map(k => k.trim()).filter(k => k);
    
    const courseData = {
      title: courseTitle,
      description: courseDescription,
      content: generatedContent,
      category: courseCategory,
      keywords: keywordsArray
    };
    
    onSubmit(courseData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title">Titre du cours</Label>
              <Input
                id="title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Entrez le titre du cours"
                required
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={courseCategory} onValueChange={setCourseCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                placeholder="Décrivez brièvement le contenu du cours"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-3 md:col-span-2">
              <Label htmlFor="keywords">Mots-clés (séparés par des virgules)</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="démocratie, élections, MRC, etc."
              />
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-between">
            <Button 
              type="button" 
              onClick={generateCourseContent}
              disabled={loading}
              className="bg-mrc-blue hover:bg-blue-700 space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Génération en cours...</span>
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4" />
                  <span>Générer le contenu</span>
                </>
              )}
            </Button>
            
            <Button 
              type="submit" 
              disabled={!generatedContent || loading}
              className="space-x-2"
            >
              <FilePlus className="h-4 w-4" />
              <span>Enregistrer le cours</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {generatedContent && (
        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-4">Contenu généré</h3>
            <div className="prose prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br/>') }} />
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
};

export default CourseGenerationForm;
