
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CreateMeetingCardProps {
  onCreateMeeting: () => void;
}

const CreateMeetingCard: React.FC<CreateMeetingCardProps> = ({ onCreateMeeting }) => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center p-6">
      <Plus className="h-12 w-12 text-gray-400 mb-2" />
      <h3 className="font-medium text-lg mb-1">Organiser une réunion</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Créez une nouvelle réunion et invitez les membres
      </p>
      <Button variant="outline" onClick={onCreateMeeting}>Créer une réunion</Button>
    </Card>
  );
};

export default CreateMeetingCard;
