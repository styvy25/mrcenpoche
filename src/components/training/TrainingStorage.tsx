
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Video, Link, Calendar, User, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Training {
  id: string;
  title: string;
  type: 'video' | 'zoom';
  url: string;
  date?: string;
  instructor?: string;
}

const TrainingStorage: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [newTraining, setNewTraining] = useState<Training>({
    id: '',
    title: '',
    type: 'video',
    url: '',
    date: '',
    instructor: ''
  });
  const { toast } = useToast();

  // Charger les formations depuis le stockage local
  useEffect(() => {
    const storedTrainings = localStorage.getItem('mrc_trainings');
    if (storedTrainings) {
      try {
        setTrainings(JSON.parse(storedTrainings));
      } catch (error) {
        console.error('Erreur lors du chargement des formations:', error);
      }
    }
  }, []);

  // Sauvegarder les formations dans le stockage local
  const saveTrainings = (updatedTrainings: Training[]) => {
    localStorage.setItem('mrc_trainings', JSON.stringify(updatedTrainings));
    setTrainings(updatedTrainings);
  };

  // Ajouter une nouvelle formation
  const handleAddTraining = () => {
    if (!newTraining.title || !newTraining.url) {
      toast({
        title: "Champs manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const training = {
      ...newTraining,
      id: Date.now().toString()
    };

    const updatedTrainings = [...trainings, training];
    saveTrainings(updatedTrainings);

    // Réinitialiser le formulaire
    setNewTraining({
      id: '',
      title: '',
      type: 'video',
      url: '',
      date: '',
      instructor: ''
    });

    toast({
      title: "Formation ajoutée",
      description: "La formation a été ajoutée avec succès."
    });
  };

  // Supprimer une formation
  const handleDeleteTraining = (id: string) => {
    const updatedTrainings = trainings.filter(training => training.id !== id);
    saveTrainings(updatedTrainings);

    toast({
      title: "Formation supprimée",
      description: "La formation a été supprimée avec succès."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-mrc-blue">Mes Formations</h2>
      </div>

      {/* Formulaire d'ajout */}
      <Card>
        <CardHeader>
          <CardTitle>Ajouter une formation</CardTitle>
          <CardDescription>
            Ajoutez une vidéo de formation ou un lien de réunion Zoom
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                value={newTraining.title}
                onChange={e => setNewTraining({...newTraining, title: e.target.value})}
                placeholder="Titre de la formation"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                value={newTraining.type}
                onChange={e => setNewTraining({...newTraining, type: e.target.value as 'video' | 'zoom'})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="video">Vidéo</option>
                <option value="zoom">Réunion Zoom</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={newTraining.url}
              onChange={e => setNewTraining({...newTraining, url: e.target.value})}
              placeholder={newTraining.type === 'video' ? 'https://youtube.com/...' : 'https://zoom.us/j/...'}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date (optionnel)</Label>
              <Input
                id="date"
                type="datetime-local"
                value={newTraining.date}
                onChange={e => setNewTraining({...newTraining, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Formateur (optionnel)</Label>
              <Input
                id="instructor"
                value={newTraining.instructor}
                onChange={e => setNewTraining({...newTraining, instructor: e.target.value})}
                placeholder="Nom du formateur"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleAddTraining}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Ajouter
          </Button>
        </CardFooter>
      </Card>

      {/* Liste des formations */}
      {trainings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainings.map(training => (
            <Card key={training.id} className="overflow-hidden">
              <CardHeader className="bg-mrc-blue/10 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base line-clamp-1">{training.title}</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                    onClick={() => handleDeleteTraining(training.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <CardDescription className="flex items-center gap-1">
                  {training.type === 'video' ? (
                    <Video size={14} className="text-mrc-blue" />
                  ) : (
                    <Link size={14} className="text-mrc-green" />
                  )}
                  <span>
                    {training.type === 'video' ? 'Vidéo de formation' : 'Lien de réunion Zoom'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="py-4">
                <div className="space-y-2">
                  {training.date && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar size={14} />
                      <span>{new Date(training.date).toLocaleString()}</span>
                    </div>
                  )}
                  {training.instructor && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User size={14} />
                      <span>{training.instructor}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => window.open(training.url, '_blank')}
                >
                  {training.type === 'video' ? 'Regarder' : 'Rejoindre'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
            <Video className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Aucune formation</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Vous n'avez pas encore ajouté de formations. Utilisez le formulaire ci-dessus pour ajouter vos vidéos de formation ou liens Zoom.
          </p>
        </div>
      )}
    </div>
  );
};

export default TrainingStorage;
