
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Clock, Award, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import ConnectedUsers from './ConnectedUsers';

// Mock data for connected users
const mockUsers = [
  {
    user_id: '1',
    name: 'Jean Mendoza',
    avatar: 'https://i.pravatar.cc/150?img=1',
    online_at: new Date().toISOString(),
    score: 450,
  },
  {
    user_id: '2',
    name: 'Alice Kamga',
    avatar: 'https://i.pravatar.cc/150?img=2',
    online_at: new Date().toISOString(),
    score: 370,
  },
  {
    user_id: '3',
    name: 'François Biya',
    avatar: 'https://i.pravatar.cc/150?img=3',
    online_at: new Date().toISOString(),
    score: 320,
  },
];

const DailyChallenge = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState('');
  const [connectedUsers, setConnectedUsers] = useState(mockUsers);
  const [challengeStarted, setChallengeStarted] = useState(false);

  // Calculate countdown to next challenge (12:00 PM and 6:00 PM each day)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const noon = new Date(now);
      noon.setHours(12, 0, 0, 0);
      
      const evening = new Date(now);
      evening.setHours(18, 0, 0, 0);
      
      let nextChallenge;
      if (now < noon) {
        nextChallenge = noon;
      } else if (now < evening) {
        nextChallenge = evening;
      } else {
        nextChallenge = new Date(now);
        nextChallenge.setDate(nextChallenge.getDate() + 1);
        nextChallenge.setHours(12, 0, 0, 0);
      }
      
      const diff = nextChallenge.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown(`${hours}h ${minutes}m`);
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Add current user to connected users if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      const userExists = connectedUsers.some(u => u.user_id === user.id);
      
      if (!userExists) {
        // Get user name from user object, fallback to email
        const name = user.email || 'Anonymous User';
        
        const newUser = {
          user_id: user.id,
          name: name,
          avatar: user.user_metadata?.avatar_url,
          online_at: new Date().toISOString(),
          score: Math.floor(Math.random() * 200) + 200, // Random score for demo
        };
        
        setConnectedUsers(prev => [...prev, newUser]);
      }
    }
  }, [isAuthenticated, user]);

  const handleStartChallenge = () => {
    if (!isAuthenticated) {
      // Handle non-authenticated users
      navigate('/login');
      return;
    }
    
    setChallengeStarted(true);
    // Navigate to quiz challenge
    navigate('/quiz');
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center text-mrc-blue">
          <Trophy className="mr-2 h-5 w-5" />
          Défi quotidien
        </CardTitle>
        <CardDescription>
          Testez vos connaissances et gagnez des points
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        {!challengeStarted && (
          <div className="flex flex-col">
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="mr-2 h-4 w-4" />
              Prochain défi dans: <span className="font-bold ml-1">{countdown}</span>
            </div>
            
            <div className="bg-muted p-3 rounded-md mb-4">
              <h4 className="font-medium mb-1">Thème du jour: Histoire du MRC</h4>
              <p className="text-sm text-muted-foreground">
                10 questions sur l'histoire et les principes du MRC
              </p>
            </div>
          </div>
        )}
        
        <ConnectedUsers users={connectedUsers} />
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleStartChallenge} 
          className="w-full"
          variant={challengeStarted ? "outline" : "default"}
        >
          {challengeStarted ? "Continuer le défi" : "Commencer le défi"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
