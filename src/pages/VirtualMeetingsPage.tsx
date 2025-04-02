
import React, { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { usePoints } from "@/hooks/usePoints";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award, Calendar, Video, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingCard from "@/components/modules/reunions/MeetingCard";
import CreateMeetingCard from "@/components/modules/reunions/CreateMeetingCard";
import { VirtualMeeting, getUpcomingMeetings, getPastMeetings } from "@/services/meetings/virtualMeetingsService";

const VirtualMeetingsPage: React.FC = () => {
  const { toast } = useToast();
  const { addPoints } = usePoints();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingMeetings, setUpcomingMeetings] = useState<VirtualMeeting[]>([]);
  const [pastMeetings, setPastMeetings] = useState<VirtualMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadMeetings = async () => {
      setLoading(true);
      try {
        if (activeTab === 'upcoming') {
          const data = await getUpcomingMeetings();
          setUpcomingMeetings(data);
        } else {
          const data = await getPastMeetings();
          setPastMeetings(data);
        }
      } catch (error) {
        console.error(`Error loading ${activeTab} meetings:`, error);
        toast({
          title: "Erreur de chargement",
          description: `Impossible de charger les réunions ${activeTab === 'upcoming' ? 'à venir' : 'passées'}.`,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadMeetings();
  }, [activeTab, toast]);
  
  const handleJoinMeeting = (meetingId: string) => {
    toast({
      title: "Connexion à la réunion",
      description: "Vous allez être redirigé vers la plateforme de visioconférence",
    });
    // In a real app, this would redirect to the actual meeting
  };
  
  const handleWatchRecording = (meetingId: string) => {
    toast({
      title: "Lecture de l'enregistrement",
      description: "Vous allez visionner l'enregistrement de la réunion",
    });
    // In a real app, this would play the recording
    
    // Award points for watching a recording
    addPoints(10);
  };
  
  const handleCreateMeeting = () => {
    toast({
      title: "Création de réunion",
      description: "La fonctionnalité sera disponible prochainement",
    });
  };
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-mrc-blue" />
          <span className="ml-3 text-gray-400">Chargement des réunions...</span>
        </div>
      );
    }
    
    if (activeTab === 'upcoming') {
      if (upcomingMeetings.length === 0) {
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucune réunion à venir pour le moment.</p>
            <Button variant="outline" className="mt-4" onClick={handleCreateMeeting}>
              Créer une réunion
            </Button>
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingMeetings.map((meeting) => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting} 
              onJoinMeeting={handleJoinMeeting} 
            />
          ))}
          
          <CreateMeetingCard onCreateMeeting={handleCreateMeeting} />
        </div>
      );
    } else {
      if (pastMeetings.length === 0) {
        return (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun enregistrement de réunion disponible.</p>
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pastMeetings.map((meeting) => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting}
              onWatchRecording={handleWatchRecording} 
            />
          ))}
        </div>
      );
    }
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
            <Link to="/training">
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
              À venir
            </TabsTrigger>
            <TabsTrigger value="past">
              Enregistrements
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {renderContent()}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {renderContent()}
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
