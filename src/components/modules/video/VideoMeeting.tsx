
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import VideoHeader from "./VideoHeader";
import VideoParticipant, { Participant } from "./VideoParticipant";
import VideoControls from "./VideoControls";

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
      <VideoHeader 
        roomCode={roomCode}
        participantsCount={participants.length}
        onCopyRoomCode={copyRoomCode}
        onEndMeeting={onEndMeeting}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {participants.map((participant) => (
          <VideoParticipant
            key={participant.id}
            participant={participant}
            isMicOn={participant.isYou ? isMicOn : true}
            isCameraOn={participant.isYou ? isCameraOn : false}
            toggleMicrophone={participant.isYou ? toggleMicrophone : undefined}
            toggleCamera={participant.isYou ? toggleCamera : undefined}
            videoRef={participant.isYou ? videoRef : undefined}
          />
        ))}
      </div>
      
      <VideoControls 
        isMicOn={isMicOn}
        isCameraOn={isCameraOn}
        isScreenSharing={isScreenSharing}
        onToggleMicrophone={toggleMicrophone}
        onToggleCamera={toggleCamera}
        onToggleScreenSharing={toggleScreenSharing}
        onEndMeeting={onEndMeeting}
      />
    </div>
  );
};

export default VideoMeeting;
