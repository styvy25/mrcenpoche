
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, BookOpen, Tags, Save, RefreshCw } from "lucide-react";
import { COURSE_CATEGORIES, generateCourseContent, saveCourse } from "@/services/courseService";
import NewsApiKeyPrompt from "@/components/news/NewsApiKeyPrompt";

interface CourseCreationFormProps {
  onSuccess?: (courseId: string) => void;
}

const CourseCreationForm: React.FC<CourseCreationFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(false);
  const { toast } = useToast();

  // Check if API key exists
  React.useEffect(() => {
    try {
      const apiKeys = localStorage.getItem("api_keys");
      if (apiKeys) {
        const keys = JSON.parse(apiKeys);
        setHasApiKey(!!keys.perplexity);
      }
    } catch (error) {
      console.error("Error checking API key:", error);
    }
  }, []);

  const handleGenerateContent = async () => {
    if (!title || !category) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir le titre et sélectionner une catégorie",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const selectedCategory = COURSE_CATEGORIES.find(c => c.id === category);
      const generatedContent = await generateCourseContent(
        title, 
        selectedCategory?.description || "Politique camerounaise et MRC"
      );
      
      if (generatedContent) {
        setContent(generatedContent);
        toast({
          title: "Contenu généré",
          description: "Le contenu du cours a été généré avec succès",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de générer le contenu",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la génération du contenu",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !content) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag);
      
      const newCourse = saveCourse({
        title,
        description,
        category,
        content,
        author: "Généré par IA",
        tags: tagArray,
      });
      
      toast({
        title: "Cours créé",
        description: "Le cours a été créé avec succès",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setContent("");
      setTags("");
      
      // Call success callback
      if (onSuccess) {
        onSuccess(newCourse.id);
      }
    } catch (error) {
      console.error("Error submitting course:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la création du cours",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApiKeySubmit = () => {
    setHasApiKey(true);
  };

  if (!hasApiKey) {
    return <NewsApiKeyPrompt onApiKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Créer un nouveau cours</CardTitle>
        <CardDescription>
          Remplissez les informations ou utilisez l'IA pour générer le contenu
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Titre du cours *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Histoire du MRC"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {COURSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brève description du contenu du cours"
              required
              className="min-h-[80px]"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Contenu du cours *</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleGenerateContent}
                disabled={isGenerating || !title || !category}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Générer avec l'IA
                  </>
                )}
              </Button>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenu détaillé du cours..."
              required
              className="min-h-[300px]"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
            <div className="flex items-center">
              <Tags className="mr-2 h-4 w-4 text-gray-500" />
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Ex: MRC, Histoire, Politique, Kamto"
              />
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Aperçu
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer le cours
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CourseCreationForm;
