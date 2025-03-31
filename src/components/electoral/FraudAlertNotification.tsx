
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle, MapPin, Camera, Video } from 'lucide-react';
import { subscribeToFraudAlerts, FraudAlert } from './services/alertService';
import { useToast } from '@/hooks/use-toast';

const FraudAlertNotification: React.FC = () => {
  const [latestAlert, setLatestAlert] = useState<FraudAlert | null>(null);
  const [viewedAlerts, setViewedAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Subscribe to fraud alerts
    const unsubscribe = subscribeToFraudAlerts((alerts) => {
      // Only show new alerts that haven't been viewed
      const newAlerts = alerts.filter(alert => !viewedAlerts.includes(alert.id));
      
      if (newAlerts.length > 0) {
        // Update with latest alert
        setLatestAlert(newAlerts[0]);
        
        // Show a toast notification
        toast({
          title: "Alerte de fraude électorale",
          description: `Nouvelle alerte de ${newAlerts[0].location}`,
          variant: "destructive",
        });
      }
    });
    
    // Clean up subscription
    return () => {
      unsubscribe();
    };
  }, [viewedAlerts, toast]);

  const handleDismiss = () => {
    if (latestAlert) {
      // Add to viewed alerts
      setViewedAlerts(prev => [...prev, latestAlert.id]);
      // Clear current alert
      setLatestAlert(null);
    }
  };

  const handleViewDetails = () => {
    // In a real app, navigate to alert details page
    console.log("View details for alert:", latestAlert);
    handleDismiss();
  };

  if (!latestAlert) return null;

  return (
    <Card className="border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 shadow-lg max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-center">
          <Badge variant="destructive" className="mb-1">Alert</Badge>
          <span className="text-xs text-muted-foreground">
            {latestAlert.timestamp.toLocaleTimeString()}
          </span>
        </div>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-red-500" />
          <span>Alerte de fraude électorale</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start">
          <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-1 flex-shrink-0" />
          <span>{latestAlert.location}</span>
        </div>
        
        <AlertDescription>
          {latestAlert.description}
        </AlertDescription>
        
        {latestAlert.mediaType && (
          <div className="flex items-center mt-2">
            {latestAlert.mediaType === 'photo' ? (
              <Camera className="h-4 w-4 mr-2 text-blue-500" />
            ) : (
              <Video className="h-4 w-4 mr-2 text-blue-500" />
            )}
            <span className="text-sm text-muted-foreground">
              {latestAlert.mediaType === 'photo' ? 'Photo disponible' : 'Vidéo disponible'}
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="sm" onClick={handleDismiss}>
          Ignorer
        </Button>
        <Button variant="default" size="sm" onClick={handleViewDetails}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Examiner
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FraudAlertNotification;
