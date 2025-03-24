
import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle } from "lucide-react";
import MediaCapture from "../../chat/MediaCapture";
import { Button } from "@/components/ui/button";

interface AlertFormProps {
  description: string;
  setDescription: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  mediaFile: Blob | null;
  setMediaFile: (file: Blob | null) => void;
  mediaType: 'photo' | 'audio' | null;
  setMediaType: (type: 'photo' | 'audio' | null) => void;
}

const AlertForm = ({
  description, 
  setDescription, 
  location, 
  setLocation,
  mediaFile,
  setMediaFile,
  mediaType,
  setMediaType
}: AlertFormProps) => {
  
  const handleMediaCapture = (blob: Blob, type: 'photo' | 'audio') => {
    setMediaFile(blob);
    setMediaType(type);
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="flex items-center text-mrc-red mb-2">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <h3 className="text-lg font-medium">Signaler une fraude électorale</h3>
      </div>
      
      <Textarea
        placeholder="Décrivez la fraude observée..."
        className="resize-none min-h-[100px]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <Textarea
        placeholder="Lieu (bureau de vote, ville...)"
        className="resize-none"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-500">Ajouter une preuve:</p>
        <div className="flex gap-2">
          <MediaCapture onCapture={handleMediaCapture} type="photo" />
        </div>
      </div>
      
      {mediaFile && (
        <div className="border rounded-md p-3 bg-gray-100">
          <p className="text-sm font-medium mb-2">
            {mediaType === 'photo' ? 'Photo attachée' : 'Audio attaché'}
          </p>
          {mediaType === 'photo' && (
            <img 
              src={URL.createObjectURL(mediaFile)} 
              alt="Evidence" 
              className="w-full h-32 object-cover rounded"
            />
          )}
          {mediaType === 'audio' && (
            <audio src={URL.createObjectURL(mediaFile)} controls className="w-full" />
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-2 text-red-500 hover:text-red-700"
            onClick={() => {
              setMediaFile(null);
              setMediaType(null);
            }}
          >
            Supprimer
          </Button>
        </div>
      )}
    </div>
  );
};

export default AlertForm;
