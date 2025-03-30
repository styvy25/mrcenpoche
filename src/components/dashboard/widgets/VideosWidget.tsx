
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

const VideosWidget = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Vidéos téléchargées</span>
        <Badge variant="outline">{Math.floor(Math.random() * 10) + 1}</Badge>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Espace utilisé</span>
        <Badge variant="outline">{(Math.random() * 500).toFixed(1)} MB</Badge>
      </div>
      <Button variant="outline" size="sm" className="mt-2 w-full">
        <Youtube className="h-4 w-4 mr-2 text-red-500" />
        Télécharger une vidéo
      </Button>
    </div>
  );
};

export default VideosWidget;
