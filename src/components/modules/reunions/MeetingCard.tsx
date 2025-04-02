
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { VirtualMeeting } from '@/services/meetings/virtualMeetingsService';

interface MeetingCardProps {
  meeting: VirtualMeeting;
  onJoinMeeting?: (id: string) => void;
  onWatchRecording?: (id: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({ 
  meeting, 
  onJoinMeeting, 
  onWatchRecording 
}) => {
  const isUpcoming = meeting.status === 'upcoming';
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  return (
    <Card className="bg-white dark:bg-gray-800 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{meeting.title}</CardTitle>
          <Badge 
            variant="outline" 
            className={isUpcoming 
              ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300" 
              : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
            }
          >
            {isUpcoming ? 'À venir' : 'Complété'}
          </Badge>
        </div>
        <CardDescription>
          {meeting.organizer}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{formatDate(meeting.date)} • {meeting.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="mr-2 h-4 w-4" />
            <span>Durée: {meeting.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{meeting.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Users className="mr-2 h-4 w-4" />
            <span>{meeting.attendees} participants {isUpcoming ? 'inscrits' : ''}</span>
          </div>
        </div>
        {meeting.description && <p className="mt-3 text-sm">{meeting.description}</p>}
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-900 pt-3">
        {isUpcoming && onJoinMeeting ? (
          <Button 
            className="w-full bg-mrc-blue hover:bg-blue-700"
            onClick={() => onJoinMeeting(meeting.id)}
          >
            Rejoindre la réunion
          </Button>
        ) : onWatchRecording && meeting.recording ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onWatchRecording(meeting.id)}
          >
            <Video className="mr-2 h-4 w-4" />
            Voir l'enregistrement
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default MeetingCard;
