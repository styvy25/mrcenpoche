
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface VideoFormProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isDisabled: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({
  url,
  setUrl,
  onSubmit,
  isLoading,
  isDisabled
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Collez l'URL de la vidéo YouTube ici"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
        disabled={isDisabled}
      />
      <Button 
        type="submit" 
        variant="secondary"
        disabled={!url.trim() || isDisabled}
      >
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vérifier"}
      </Button>
    </form>
  );
};

export default VideoForm;
