
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateTimePicker } from "@/components/ui/datetime-picker-demo";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Video, FileVideo, Calendar, Link } from "lucide-react";

interface TrainingResource {
  id: string;
  title: string;
  type: "video" | "meeting";
  description?: string;
  date?: Date;
  url?: string;
  file?: string;
  createdAt: Date;
}

const TrainingStorage = () => {
  const [resources, setResources] = useState<TrainingResource[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [meetingDate, setMeetingDate] = useState<Date>();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const { toast } = useToast();

  // Load resources from localStorage on component mount
  useEffect(() => {
    const savedResources = localStorage.getItem("trainingResources");
    if (savedResources) {
      setResources(JSON.parse(savedResources));
    }
  }, []);

  // Save resources to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trainingResources", JSON.stringify(resources));
  }, [resources]);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const saveVideoResource = () => {
    if (!title) {
      toast({
        title: "Titre requis",
        description: "Veuillez entrer un titre pour cette vidéo",
        variant: "destructive",
      });
      return;
    }

    if (!videoFile) {
      toast({
        title: "Fichier requis",
        description: "Veuillez sélectionner une vidéo à télécharger",
        variant: "destructive",
      });
      return;
    }

    // Store video as data URL
    const reader = new FileReader();
    reader.readAsDataURL(videoFile);
    reader.onload = () => {
      const newResource: TrainingResource = {
        id: Date.now().toString(),
        title,
        type: "video",
        description,
        file: reader.result as string,
        createdAt: new Date(),
      };

      setResources(prev => [newResource, ...prev]);
      resetForm();
      
      toast({
        title: "Vidéo sauvegardée",
        description: "Votre vidéo a été enregistrée localement",
      });
    };
  };

  const saveMeetingLink = () => {
    if (!title) {
      toast({
        title: "Titre requis",
        description: "Veuillez entrer un titre pour cette réunion",
        variant: "destructive",
      });
      return;
    }

    if (!url) {
      toast({
        title: "Lien requis",
        description: "Veuillez entrer un lien pour cette réunion",
        variant: "destructive",
      });
      return;
    }

    if (!meetingDate) {
      toast({
        title: "Date requise",
        description: "Veuillez sélectionner une date pour cette réunion",
        variant: "destructive",
      });
      return;
    }

    const newResource: TrainingResource = {
      id: Date.now().toString(),
      title,
      type: "meeting",
      description,
      url,
      date: meetingDate,
      createdAt: new Date(),
    };

    setResources(prev => [newResource, ...prev]);
    resetForm();
    
    toast({
      title: "Réunion enregistrée",
      description: "Votre lien de réunion a été enregistré localement",
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setVideoFile(null);
    setMeetingDate(undefined);
    // Reset file input by recreating it
    const fileInput = document.getElementById("video-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const deleteResource = (id: string) => {
    setResources(prev => prev.filter(resource => resource.id !== id));
    toast({
      title: "Ressource supprimée",
      description: "La ressource a été supprimée",
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Stockage des Formations</h1>
      <p className="text-gray-500 dark:text-gray-400">
        Gérez vos vidéos de formation et liens de réunion Zoom stockés localement.
      </p>

      <Tabs defaultValue="videos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">
            <FileVideo className="mr-2 h-4 w-4" />
            Vidéos de Formation
          </TabsTrigger>
          <TabsTrigger value="meetings">
            <Calendar className="mr-2 h-4 w-4" />
            Réunions Zoom
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter une vidéo de formation</CardTitle>
              <CardDescription>
                Téléchargez une vidéo de formation qui sera stockée localement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input 
                  id="title" 
                  placeholder="Titre de la vidéo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Input 
                  id="description" 
                  placeholder="Description de la vidéo"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="video-upload">Fichier vidéo</Label>
                <Input 
                  id="video-upload" 
                  type="file" 
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>Annuler</Button>
              <Button onClick={saveVideoResource}>Sauvegarder</Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vos vidéos de formation</h3>
            {resources
              .filter(resource => resource.type === "video")
              .map(video => (
                <Card key={video.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{video.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteResource(video.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        Supprimer
                      </Button>
                    </div>
                    <CardDescription>
                      {new Date(video.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {video.description && <p className="mb-4">{video.description}</p>}
                    {video.file && (
                      <video controls className="w-full rounded-md">
                        <source src={video.file} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture vidéo.
                      </video>
                    )}
                  </CardContent>
                </Card>
              ))}
            {resources.filter(resource => resource.type === "video").length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                Aucune vidéo de formation n'a été ajoutée.
              </p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="meetings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ajouter un lien de réunion Zoom</CardTitle>
              <CardDescription>
                Enregistrez un lien pour une formation à venir.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meeting-title">Titre</Label>
                <Input 
                  id="meeting-title" 
                  placeholder="Titre de la réunion"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-description">Description (optionnel)</Label>
                <Input 
                  id="meeting-description" 
                  placeholder="Description de la réunion"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meeting-url">Lien Zoom</Label>
                <Input 
                  id="meeting-url" 
                  placeholder="https://zoom.us/j/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date et heure de la réunion</Label>
                <DateTimePicker />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetForm}>Annuler</Button>
              <Button onClick={saveMeetingLink}>Sauvegarder</Button>
            </CardFooter>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Vos réunions planifiées</h3>
            {resources
              .filter(resource => resource.type === "meeting")
              .map(meeting => (
                <Card key={meeting.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{meeting.title}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteResource(meeting.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                      >
                        Supprimer
                      </Button>
                    </div>
                    <CardDescription>
                      {meeting.date && new Date(meeting.date).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {meeting.description && <p className="mb-4">{meeting.description}</p>}
                    {meeting.url && (
                      <a 
                        href={meeting.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:underline"
                      >
                        <Link className="mr-2 h-4 w-4" />
                        Rejoindre la réunion Zoom
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            {resources.filter(resource => resource.type === "meeting").length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center py-10">
                Aucune réunion n'a été planifiée.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingStorage;
