
import React from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

const MeetingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Réunions</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Consultez et planifiez vos réunions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-mrc-blue" />
            <h2 className="text-xl font-semibold">Réunions à venir</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Aucune réunion programmée pour le moment. Consultez le calendrier pour planifier une nouvelle réunion.
          </p>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8 text-mrc-blue" />
            <h2 className="text-xl font-semibold">Participants récents</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Aucun participant récent à afficher.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MeetingsPage;
