
import { useState, useEffect, useRef } from "react";
import FuturisticUserChat from "@/components/chat/FuturisticUserChat";
import AIChat from "@/components/assistant/AIChat";
import { Button } from "@/components/ui/button";
import { Bot, Users, Info, Video, BookOpen, X, Mic, MicOff, Camera, CameraOff } from "lucide-react";
import AuthDialog, { useAuth } from "@/components/auth/AuthDialog";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/custom-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

// Mock data for video meeting participants
const MOCK_PARTICIPANTS = [
  { id: 1, name: "Jean Nguembock", avatar: "", online: true, speaking: false },
  { id: 2, name: "Maurice Kamto", avatar: "", online: true, speaking: true },
  { id: 3, name: "Styvy 237", avatar: "", online: true, speaking: false },
  { id: 4, name: "Guillaume Soro", avatar: "", online: true, speaking: false },
  { id: 5, name: "Vous", avatar: "", online: true, speaking: false, isYou: true },
];

const ModuleChatView = () => {
  const [activeTab, setActiveTab] = useState<"chat" | "video" | "immersive">("chat");
  const [chatType, setChatType] = useState<"user" | "ai">("user");
  const [showAPIKeyDialog, setShowAPIKeyDialog] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState(MOCK_PARTICIPANTS);
  const [roomCode, setRoomCode] = useState("MRC-TRAINING-1234");
  const [speakingUserId, setSpeakingUserId] = useState(2); // Default to Maurice Kamto speaking
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Check if API keys are defined
  useEffect(() => {
    if (chatType === "ai") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        setShowAPIKeyDialog(true);
      }
    }
  }, [chatType]);

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

  const handleSwitchChat = (type: "user" | "ai") => {
    if (type === "ai") {
      const apiKeys = localStorage.getItem("api_keys");
      if (!apiKeys || !JSON.parse(apiKeys).youtube || !JSON.parse(apiKeys).perplexity) {
        setShowAPIKeyDialog(true);
      }
    }
    setChatType(type);
  };

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

  const endMeeting = () => {
    setActiveTab("chat");
    toast({
      title: "Réunion terminée",
      description: "Vous avez quitté la réunion.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="mb-6">
        <div className="flex flex-col items-center justify-center p-10 bg-gray-900/50 rounded-lg border border-white/10">
          <Info size={48} className="text-mrc-blue mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connexion requise</h3>
          <p className="text-center text-muted-foreground mb-6">
            Vous devez être connecté pour accéder aux espaces de discussion
          </p>
          <AuthDialog />
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-mrc-blue to-mrc-green animate-gradient">
          Espace de collaboration
        </h2>
        
        <div className="flex gap-2">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "chat" | "video" | "immersive")}>
            <TabsList>
              <TabsTrigger value="chat" className="flex items-center gap-1">
                <Users size={14} />
                <span className="hidden sm:inline">Discussion</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video size={14} />
                <span className="hidden sm:inline">Réunion</span>
              </TabsTrigger>
              <TabsTrigger value="immersive" className="flex items-center gap-1">
                <BookOpen size={14} />
                <span className="hidden sm:inline">Formation immersive</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <TabsContent value="chat" className="mt-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Zone de discussion</h3>
          <div className="flex gap-2">
            <Button 
              variant={chatType === "user" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSwitchChat("user")}
              className={chatType === "user" ? "bg-mrc-blue hover:bg-mrc-blue/90" : ""}
            >
              <Users size={16} className="mr-2" />
              <span className="hidden sm:inline">Apprenants</span>
            </Button>
            <Button 
              variant={chatType === "ai" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSwitchChat("ai")}
              className={chatType === "ai" ? "bg-mrc-green hover:bg-mrc-green/90" : ""}
            >
              <Bot size={16} className="mr-2" />
              <span className="hidden sm:inline">Assistant IA</span>
            </Button>
          </div>
        </div>
        
        {chatType === "user" ? <FuturisticUserChat /> : <AIChat />}
      </TabsContent>
      
      <TabsContent value="video" className="mt-0">
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
            <Button variant="destructive" size="sm" className="h-8 gap-1" onClick={endMeeting}>
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
                className={isMicOn ? "bg-mrc-blue hover:bg-mrc-blue/90" : ""}
              >
                {isMicOn ? <Mic size={16} className="mr-2" /> : <MicOff size={16} className="mr-2" />}
                Micro
              </Button>
              <Button 
                variant={isCameraOn ? "default" : "secondary"} 
                size="sm" 
                onClick={toggleCamera}
                className={isCameraOn ? "bg-mrc-green hover:bg-mrc-green/90" : ""}
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
      </TabsContent>
      
      <TabsContent value="immersive" className="mt-0">
        <ImmersiveTrainingSpace />
      </TabsContent>

      <Dialog open={showAPIKeyDialog} onOpenChange={setShowAPIKeyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clés API requises</DialogTitle>
            <DialogDescription>
              Pour utiliser l'assistant IA, vous devez configurer vos clés API YouTube et Perplexity
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Veuillez vous rendre dans les paramètres de l'application pour configurer vos clés API.
          </p>
          <DialogFooter>
            <Button 
              onClick={() => {
                setShowAPIKeyDialog(false);
                setChatType("user");
                toast({
                  title: "Configuration nécessaire",
                  description: "Veuillez configurer vos clés API dans les paramètres",
                  variant: "destructive"
                });
              }}
            >
              Compris
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Immersive Training Space Component
const ImmersiveTrainingSpace = () => {
  const [level, setLevel] = useState(1);
  const [activeScenario, setActiveScenario] = useState<number | null>(null);
  const { toast } = useToast();
  
  const scenarios = [
    {
      id: 1,
      title: "Initiation au porte-à-porte",
      level: 1,
      description: "Apprenez à présenter efficacement les idées du MRC lors de visites porte-à-porte.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      completed: true
    },
    {
      id: 2,
      title: "Argumentaire politique",
      level: 1,
      description: "Maîtrisez l'art de débattre et défendre les positions du MRC face à l'opposition.",
      image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
      completed: false
    },
    {
      id: 3,
      title: "Organisation d'événements locaux",
      level: 2,
      description: "Apprenez à planifier et exécuter des événements MRC dans votre communauté.",
      image: "https://images.unsplash.com/photo-1623517272043-cae1572afc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      completed: false,
      locked: true
    }
  ];
  
  const handleStartScenario = (id: number) => {
    const scenario = scenarios.find(s => s.id === id);
    if (scenario && scenario.locked) {
      toast({
        title: "Scénario verrouillé",
        description: "Vous devez compléter les scénarios précédents pour débloquer celui-ci.",
        variant: "destructive"
      });
      return;
    }
    
    setActiveScenario(id);
    toast({
      title: "Scénario démarré",
      description: `Vous avez commencé le scénario: ${scenario?.title}`,
    });
  };
  
  const handleCompleteScenario = () => {
    setActiveScenario(null);
    toast({
      title: "Scénario terminé",
      description: "Félicitations! Vous avez complété ce scénario de formation.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white mb-2">Formation politique immersive</h2>
          <p className="text-gray-300">Développez vos compétences politiques à travers des scénarios virtuels interactifs</p>
          
          <div className="mt-4 bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="bg-mrc-blue rounded-full p-2 h-10 w-10 flex items-center justify-center">
                <Trophy size={20} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-300">Niveau actuel: <span className="text-mrc-blue font-semibold">Militant niveau {level}</span></p>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-1 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-mrc-blue to-mrc-green" 
                    style={{ width: "35%" }}
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">1500 XP / 4000 XP pour le niveau suivant</p>
              </div>
            </div>
          </div>
        </div>
        
        {activeScenario ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-4 text-white"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{scenarios.find(s => s.id === activeScenario)?.title}</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveScenario(null)} className="text-xs h-7">
                Retour aux scénarios
              </Button>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6 mb-4">
              <div className="flex flex-col items-center justify-center text-center space-y-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <BookOpen size={48} className="text-mrc-blue" />
                </motion.div>
                <h3 className="text-lg font-semibold">Scénario virtuel en cours</h3>
                <p className="text-sm text-gray-400">
                  Explorez ce scénario interactif pour développer vos compétences politiques. 
                  Prenez des décisions, interagissez avec des personnages virtuels et voyez les conséquences 
                  de vos choix en temps réel.
                </p>
                
                <motion.div 
                  className="mt-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={handleCompleteScenario} className="bg-mrc-green hover:bg-mrc-green/90">
                    Terminer le scénario
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className={`overflow-hidden transition-all duration-300 ${
                  scenario.locked ? 'opacity-60' : 'hover:shadow-lg hover:shadow-mrc-blue/10'
                }`}
              >
                <div className="relative h-32">
                  <img 
                    src={scenario.image} 
                    alt={scenario.title} 
                    className="w-full h-full object-cover" 
                  />
                  {scenario.locked && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Lock size={24} className="text-gray-400" />
                    </div>
                  )}
                  {scenario.completed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-mrc-green">Complété</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <Badge variant="outline" className="bg-mrc-blue/20 text-white border-none">
                      Niveau {scenario.level}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{scenario.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{scenario.description}</p>
                  <Button 
                    variant={scenario.locked ? "outline" : "default"}
                    className={!scenario.locked ? "bg-mrc-blue hover:bg-mrc-blue/90 w-full" : "w-full"}
                    disabled={scenario.locked}
                    onClick={() => handleStartScenario(scenario.id)}
                  >
                    {scenario.locked ? "Verrouillé" : (scenario.completed ? "Rejouer" : "Commencer")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Trophy Icon Component
const Trophy = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

// Lock Icon Component
const Lock = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default ModuleChatView;
