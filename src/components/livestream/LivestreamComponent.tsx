
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Camera, Mic, Video, Youtube, ArrowUpRight, X, Play, Pause, Settings, Download } from 'lucide-react';

interface LivestreamComponentProps {
  title?: string;
  description?: string;
}

const LivestreamComponent: React.FC<LivestreamComponentProps> = ({
  title = "Livestream MRC",
  description = "Diffusez en direct avec notre plateforme intégrée"
}) => {
  const [activeMode, setActiveMode] = useState<'local' | 'youtube'>('local');
  const [streamingLocal, setStreamingLocal] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [prompterVisible, setPrompterVisible] = useState(false);
  const [prompterText, setPrompterText] = useState('');
  const [prompterSpeed, setPrompterSpeed] = useState([5]); // Default speed
  const [prompterSize, setPrompterSize] = useState([16]); // Default size in pixels
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const startLocalStream = async () => {
    try {
      const constraints = {
        video: true,
        audio: true
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      
      setStreamingLocal(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert('Impossible d\'accéder à la caméra ou au microphone. Veuillez vérifier vos permissions.');
    }
  };

  const stopLocalStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    
    setStreamingLocal(false);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopLocalStream();
    };
  }, []);

  // Handle valid YouTube URL
  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };
  
  // Animation effect for teleprompter
  useEffect(() => {
    if (!prompterVisible) return;

    const prompterElement = document.getElementById('teleprompter-content');
    if (!prompterElement) return;
    
    let position = 0;
    const speed = prompterSpeed[0] / 10; // Convert to reasonable speed
    
    const animate = () => {
      if (!prompterVisible || !prompterElement) return;
      
      position += speed;
      prompterElement.style.transform = `translateY(${-position}px)`;
      
      // Reset if reached end
      if (position > prompterElement.scrollHeight) {
        position = 0;
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [prompterVisible, prompterSpeed, prompterText]);

  const embedUrl = getYoutubeEmbedUrl(youtubeUrl);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <Tabs defaultValue="local" className="w-full" onValueChange={(value) => setActiveMode(value as 'local' | 'youtube')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="local" className="flex gap-2 items-center">
              <Camera className="h-4 w-4" />
              <span>Mode Local</span>
            </TabsTrigger>
            <TabsTrigger value="youtube" className="flex gap-2 items-center">
              <Youtube className="h-4 w-4" />
              <span>YouTube Live</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="local" className="mt-6">
            <div className="relative">
              <div className="aspect-video bg-gray-900 rounded-md overflow-hidden">
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline
                  muted={false}
                  className="w-full h-full object-cover"
                ></video>
                
                {!streamingLocal && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-400 mb-4">Cliquez sur Démarrer pour accéder à votre caméra</p>
                    <Button onClick={startLocalStream} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span>Démarrer</span>
                    </Button>
                  </div>
                )}
                
                {prompterVisible && streamingLocal && (
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div 
                      id="teleprompter-container"
                      className="absolute bottom-0 left-0 right-0 text-center p-6 max-h-full overflow-hidden"
                    >
                      <div 
                        id="teleprompter-content"
                        className="text-white font-bold whitespace-pre-line"
                        style={{ fontSize: `${prompterSize[0]}px` }}
                      >
                        {prompterText}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {streamingLocal && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button variant="destructive" onClick={stopLocalStream} className="flex items-center gap-2">
                    <Pause className="h-4 w-4" />
                    <span>Arrêter</span>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="youtube" className="mt-6">
            <div className="mb-4">
              <Label htmlFor="youtube-url">URL YouTube Live</Label>
              <div className="flex gap-2 mt-1">
                <Input 
                  id="youtube-url"
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                <Button variant="outline" className="shrink-0">
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="aspect-video bg-gray-900 rounded-md overflow-hidden">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Youtube className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-400">Entrez une URL YouTube valide pour intégrer le stream</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardHeader>
      
      <CardContent>
        <div className="border-t pt-4 mt-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Téléprompter</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="prompter-switch" 
                  checked={prompterVisible}
                  onCheckedChange={setPrompterVisible}
                />
                <Label htmlFor="prompter-switch">
                  {prompterVisible ? 'Visible' : 'Masqué'}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="prompter-text">Texte du téléprompter</Label>
              <Textarea 
                id="prompter-text"
                placeholder="Entrez le texte qui défilera dans le téléprompter..."
                value={prompterText}
                onChange={(e) => setPrompterText(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="prompter-speed" className="mb-2 block">Vitesse</Label>
                <Slider 
                  id="prompter-speed"
                  min={1} 
                  max={10} 
                  step={1}
                  value={prompterSpeed}
                  onValueChange={setPrompterSpeed}
                />
              </div>
              
              <div>
                <Label htmlFor="prompter-size" className="mb-2 block">Taille du texte</Label>
                <Slider 
                  id="prompter-size"
                  min={12} 
                  max={32} 
                  step={1}
                  value={prompterSize}
                  onValueChange={setPrompterSize}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Paramètres</span>
        </Button>
        
        <Button className="bg-mrc-blue flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Télécharger l'enregistrement</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LivestreamComponent;
