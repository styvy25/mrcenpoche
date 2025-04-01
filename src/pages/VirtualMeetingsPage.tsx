
import React, { useState } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Calendar, Clock, MapPin, Plus, Users, Video } from "lucide-react";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for meetings
const UPCOMING_MEETINGS = [
  {
    id: 1,
    title: "Réunion des coordinateurs locaux",
    date: "2023-09-15",
    time: "18:00",
    duration: "1h30",
    location: "Virtuel (Zoom)",
    organizer: "Bureau National",
    status: "upcoming",
    attendees: 34,
    description: "Discussion sur les stratégies de mobilisation pour les élections à venir."
  },
  {
    id: 2,
    title: "Formation des délégués",
    date: "2023-09-20",
    time: "19:00",
    duration: "2h",
    location: "Virtuel (Teams)",
    organizer: "Département Formation",
    status: "upcoming",
    attendees: 56,
    description: "Formation sur le rôle et les responsabilités des délégués lors des élections."
  },
  {
    id: 3,
    title: "Atelier juridique",
    date: "2023-09-25",
    time: "17:30",
    duration: "1h",
    location: "Virtuel (Zoom)",
    organizer: "Département Juridique",
    status: "upcoming",
    attendees: 28,
    description: "Présentation des aspects juridiques à connaître pour la protection du vote."
  }
];

const PAST_MEETINGS = [
  {
    id: 4,
    title: "Assemblée générale mensuelle",
    date: "2023-08-30",
    time: "18:00", 
    duration: "2h",
    location: "Virtuel (Zoom)",
    organizer: "Bureau National",
    status: "completed",
    attendees: 112,
    recording: "https://example.com/recording/ag-aout"
  },
  {
    id: 5,
    title: "Formation communication politique",
    date: "2023-08-25",
    time: "19:00",
    duration: "1h30",
    location: "Virtuel (Teams)",
    organizer: "Département Communication",
    status: "completed",
    attendees: 78,
    recording: "https://example.com/recording/formation-comm"
  }
];

const VirtualMeetingsPage: React.FC = () => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const handleJoinMeeting = (meetingId: number) => {
    toast({
      title: "Connexion à la réunion",
      description: "Vous allez être redirigé vers la plateforme de visioconférence",
    });
    // In a real app, this would redirect to the actual meeting
  };
  
  const handleWatchRecording = (meetingId: number) => {
    toast({
      title: "Lecture de l'enregistrement",
      description: "Vous allez visionner l'enregistrement de la réunion",
    });
    // In a real app, this would play the recording
    
    // Award points for watching a recording
    addPoints(10);
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link to="/modules">
              <Button variant="outline" size="sm" className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour aux modules
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-mrc-blue">Réunions Virtuelles</h1>
            <p className="text-gray-600 dark:text-gray-400">Participez aux réunions et formations en ligne</p>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Mon calendrier
            </Button>
            <Link to="/modules/training">
              <Button variant="default" size="sm" className="bg-mrc-blue">
                <Video className="mr-2 h-4 w-4" />
                Formation immersive
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="upcoming" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Réunions à venir
            </TabsTrigger>
            <TabsTrigger value="past">
              <Video className="mr-2 h-4 w-4" />
              Enregistrements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {UPCOMING_MEETINGS.map((meeting) => (
                <Card key={meeting.id} className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">{meeting.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        À venir
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
                        <span>{new Date(meeting.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} • {meeting.time}</span>
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
                        <span>{meeting.attendees} participants inscrits</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">{meeting.description}</p>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-900 pt-3">
                    <Button 
                      className="w-full bg-mrc-blue hover:bg-blue-700"
                      onClick={() => handleJoinMeeting(meeting.id)}
                    >
                      Rejoindre la réunion
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Add meeting card */}
              <Card className="bg-white dark:bg-gray-800 border-dashed border-2 border-gray-300 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center text-center p-6">
                <Plus className="h-12 w-12 text-gray-400 mb-2" />
                <h3 className="font-medium text-lg mb-1">Organiser une réunion</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Créez une nouvelle réunion et invitez les membres
                </p>
                <Button variant="outline">Créer une réunion</Button>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PAST_MEETINGS.map((meeting) => (
                <Card key={meeting.id} className="bg-white dark:bg-gray-800 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">{meeting.title}</CardTitle>
                      <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                        Complété
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
                        <span>{new Date(meeting.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })} • {meeting.time}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Durée: {meeting.duration}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Users className="mr-2 h-4 w-4" />
                        <span>{meeting.attendees} participants</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 dark:bg-gray-900 pt-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleWatchRecording(meeting.id)}
                    >
                      <Video className="mr-2 h-4 w-4" />
                      Voir l'enregistrement
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 flex items-center">
          <Award className="h-10 w-10 text-mrc-blue mr-4" />
          <div>
            <h3 className="font-medium text-lg">Gagnez des points en participant</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Regardez les enregistrements des réunions passées pour gagner des points d'expérience.
              Participez aux réunions en direct pour débloquer des badges spéciaux.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VirtualMeetingsPage;
