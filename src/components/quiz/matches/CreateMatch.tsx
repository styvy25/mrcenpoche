
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createMatch, generateWhatsAppInvite } from "@/services/matchService";
import { useNavigate } from "react-router-dom";
import { Share2 } from "lucide-react";

interface CreateMatchProps {
  onClose?: () => void;
}

const CreateMatch: React.FC<CreateMatchProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("test");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateMatch = async () => {
    if (!title || !category || !name) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    try {
      const match = createMatch(title, category, name);
      if (match) {
        const whatsappLink = generateWhatsAppInvite(match.id, category, name);
        // Store the invite link
        const matches = JSON.parse(localStorage.getItem('mrc_matches') || '[]');
        const matchIndex = matches.findIndex((m: any) => m.id === match.id);
        if (matchIndex !== -1) {
          matches[matchIndex].inviteLink = whatsappLink;
          localStorage.setItem('mrc_matches', JSON.stringify(matches));
        }

        toast.success("Match créé avec succès!");
        if (onClose) onClose();
        navigate(`/quiz-match/${match.id}`);
      } else {
        toast.error("Erreur lors de la création du match");
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Créer un match d'incollables</CardTitle>
        <CardDescription>
          Créez un nouveau match et invitez vos amis à jouer contre vous!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Titre du match
          </label>
          <Input
            id="title"
            placeholder="Ex: Les experts du MRC"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Catégorie
          </label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">MRC Test</SelectItem>
              <SelectItem value="politique">Politique Camerounaise</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Votre nom
          </label>
          <Input
            id="name"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
        )}
        <Button onClick={handleCreateMatch} disabled={loading}>
          {loading ? "Création..." : "Créer le match"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateMatch;
