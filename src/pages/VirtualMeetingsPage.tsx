
import React, { useState, useEffect } from 'react';
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Users, Calendar, Video, Link as LinkIcon } from "lucide-react";
import { Link } from 'react-router-dom';
import { getMeetings, VirtualMeeting } from '@/services/meetings/virtualMeetingsService';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

const VirtualMeetingsPage: React.FC = () => {
  const [meetings, setMeetings] = useState<VirtualMeeting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const data = await getMeetings();
        setMeetings(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load meetings:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les réunions virtuelles.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [toast]);

  const upcomingMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate >= new Date();
  });

  const pastMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.date);
    return meetingDate < new Date();
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy');
    } catch (error) {
      return dateString;
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
            <p className="text-gray-600 dark:text-gray-400">Participez aux réunions virtuelles pour échanger avec d'autres militants</p>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              À venir
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center">
              <Video className="mr-2 h-4 w-4" />
              Passées
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="bg-gray-100 dark:bg-gray-800 h-32"></CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : upcomingMeetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingMeetings.map(meeting => (
                  <Card key={meeting.id} className="overflow-hidden">
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Users className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg mb-1">{meeting.title}</h3>
                      <div className="flex items-center text-sm mb-2 text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" /> {formatDate(meeting.date)} • {meeting.time}
                      </div>
                      <div className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                        {meeting.description || 'Aucune description disponible.'}
                      </div>
                      <Button className="w-full bg-mrc-blue">
                        <LinkIcon className="h-4 w-4 mr-2" /> Rejoindre la réunion
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  <Calendar className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune réunion à venir</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Il n'y a pas de réunions virtuelles prévues pour le moment.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader className="bg-gray-100 dark:bg-gray-800 h-32"></CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : pastMeetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastMeetings.map(meeting => (
                  <Card key={meeting.id} className="overflow-hidden">
                    <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-bold text-lg mb-1">{meeting.title}</h3>
                      <div className="flex items-center text-sm mb-2 text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" /> {formatDate(meeting.date)} • {meeting.time}
                      </div>
                      <div className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-400">
                        {meeting.description || 'Aucune description disponible.'}
                      </div>
                      {meeting.recording ? (
                        <Button className="w-full bg-mrc-blue">
                          <Video className="h-4 w-4 mr-2" /> Voir l'enregistrement
                        </Button>
                      ) : (
                        <Button className="w-full" variant="outline" disabled>
                          Aucun enregistrement disponible
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center justify-center py-8">
                  <Video className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucune réunion passée</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Il n'y a pas encore d'enregistrements de réunions passées.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default VirtualMeetingsPage;
