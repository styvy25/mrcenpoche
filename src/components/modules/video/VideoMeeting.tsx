
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Mic, MicOff, Camera, CameraOff, Video } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Participant {
  id: number;
  name: string;
  avatar: string;
  online: boolean;
  speaking: boolean;
  isYou?: boolean;
}

interface VideoMeetingProps {
  onEndMeeting: () => void;
}

const VideoMeeting = ({ onEndMeeting }: VideoMeetingProps) => {
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [roomCode, setRoomCode] = useState("MRC-TRAINING-1234");
  const [speakingUserId, setSpeakingUserId] = useState(2); // Default to Maurice Kamto speaking
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 1, name: "Jean Nguembock", avatar: "", online: true, speaking: false },
    { id: 2, name: "Maurice Kamto", avatar: "", online: true, speaking: true },
    { id: 3, name: "Styvy 237", avatar: "", online: true, speaking: false },
    { id: 4, name: "Guillaume Soro", avatar: "", online: true, speaking: false },
    { id: 5, name: "Vous", avatar: "", online: true, speaking: false, isYou: true },
  ]);
  
  const { toast } = useToast();  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Simulated video stream for demo purposes
  useEffect(() => {
    if (isCameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          toast({
            title: "Erreur de caméra",
            description: "Impossible d'accéder à votre caméra. Vérifiez vos paramètres.",
            variant: "destructive"
          });
          setIsCameraOn(false);
        });
    }
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isCameraOn, toast]);

  useEffect(() => {
    // Simulate someone speaking every few seconds
    const speakingInterval = setInterval(() => {
      const randomUserId = Math.floor(Math.random() * participants.length) + 1;
      setSpeakingUserId(randomUserId);
      
      setParticipants(prev => prev.map(p => ({
        ...p,
        speaking: p.id === randomUserId
      })));
    }, 5000);
    
    return () => clearInterval(speakingInterval);
  }, [participants]);

  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn);
    toast({
      title: !isMicOn ? "Microphone activé" : "Microphone désactivé",
      description: !isMicOn ? "Les autres participants peuvent vous entendre." : "Les autres participants ne peuvent plus vous entendre.",
    });
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast({
      title: !isCameraOn ? "Caméra activée" : "Caméra désactivée",
      description: !isCameraOn ? "Les autres participants peuvent vous voir." : "Les autres participants ne peuvent plus vous voir.",
    });
  };

  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    toast({
      title: !isScreenSharing ? "Partage d'écran activé" : "Partage d'écran désactivé",
      description: !isScreenSharing ? "Vous partagez votre écran avec les participants." : "Vous avez arrêté de partager votre écran.",
    });
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
    toast({
      title: "Code de salle copié",
      description: "Le code a été copié dans votre presse-papiers.",
    });
  };

  return (
    <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-mrc-blue/20 rounded-full p-2"
          >
            <Video size={18} className="text-mrc-blue" />
          </motion.div>
          <div>
            <h3 className="font-semibold">Réunion locale MRC</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs bg-gray-800 gap-1 cursor-pointer hover:bg-gray-700 transition-colors" onClick={copyRoomCode}>
                <span>{roomCode}</span>
                <span className="text-[10px] text-mrc-blue">Cliquez pour copier</span>
              </Badge>
              <Badge variant="outline" className="text-xs bg-mrc-blue/20 text-mrc-blue">
                {participants.length} participants
              </Badge>
            </div>
          </div>
        </div>
        <Button variant="destructive" size="sm" className="h-8 gap-1" onClick={onEndMeeting}>
          <X size={14} />
          <span className="hidden sm:inline">Quitter</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {participants.map((participant) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`relative rounded-lg overflow-hidden ${
              participant.isYou ? "col-span-1 md:col-span-2 lg:col-span-1" : ""
            }`}
          >
            {participant.isYou && isCameraOn ? (
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                playsInline
                className="w-full h-48 object-cover bg-black"
              />
            ) : (
              <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                <Avatar className="h-24 w-24">
                  {participant.avatar ? (
                    <AvatarImage src={participant.avatar} />
                  ) : (
                    <AvatarFallback className="bg-mrc-blue/30 text-gray-100 text-2xl">
                      {participant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm truncate max-w-[120px]">{participant.name}</span>
                {participant.speaking && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-2 w-2 rounded-full bg-green-500"
                  />
                )}
              </div>
              
              {participant.isYou && (
                <div className="flex gap-1">
                  <button 
                    onClick={toggleMicrophone}
                    className={`p-1 rounded-full ${isMicOn ? 'bg-mrc-blue' : 'bg-gray-700'}`}
                  >
                    {isMicOn ? <Mic size={14} /> : <MicOff size={14} />}
                  </button>
                  <button 
                    onClick={toggleCamera}
                    className={`p-1 rounded-full ${isCameraOn ? 'bg-mrc-green' : 'bg-gray-700'}`}
                  >
                    {isCameraOn ? <Camera size={14} /> : <CameraOff size={14} />}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="border-t border-gray-800 p-4 flex justify-center">
        <div className="flex gap-3">
          <Button 
            variant={isMicOn ? "default" : "secondary"} 
            size="sm" 
            onClick={toggleMicrophone}
            className={isMicOn ? "bg-mrc-blue hover:bg-mrc-blue/90 mic-active" : ""}
          >
            {isMicOn ? <Mic size={16} className="mr-2" /> : <MicOff size={16} className="mr-2" />}
            Micro
          </Button>
          <Button 
            variant={isCameraOn ? "default" : "secondary"} 
            size="sm" 
            onClick={toggleCamera}
            className={isCameraOn ? "bg-mrc-green hover:bg-mrc-green/90 camera-active" : ""}
          >
            {isCameraOn ? <Camera size={16} className="mr-2" /> : <CameraOff size={16} className="mr-2" />}
            Caméra
          </Button>
          <Button 
            variant={isScreenSharing ? "destructive" : "outline"} 
            size="sm" 
            onClick={toggleScreenSharing}
          >
            <span className="mr-2">🖥️</span>
            {isScreenSharing ? "Arrêter" : "Partager l'écran"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoMeeting;
