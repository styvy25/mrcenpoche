
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

interface YouTubeUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

const YouTubeUrlInput: React.FC<YouTubeUrlInputProps> = ({
  onSubmit,
  isLoading,
  disabled = false
}) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          type="text"
          placeholder="Entrez l'URL d'une vidéo YouTube..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading || disabled}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={!url.trim() || isLoading || disabled}
          className={`whitespace-nowrap ${disabled ? '' : 'bg-red-600 hover:bg-red-700 text-white'}`}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Vérifier
        </Button>
      </div>
    </form>
  );
};

export default YouTubeUrlInput;
