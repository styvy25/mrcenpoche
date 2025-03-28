
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Video, YoutubeIcon } from 'lucide-react';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import { ChatInput } from '@/components/ui/chat-input';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';
import { useToast } from '@/components/ui/use-toast';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type YouTubeResult = {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
};

const AssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Bonjour ! Je suis votre assistant MRC. Je peux vous aider avec des informations sur le MRC, Maurice Kamto, et les actualités du Cameroun. Je peux aussi rechercher des vidéos YouTube pour vous. Comment puis-je vous aider aujourd'hui ?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [youtubeResults, setYoutubeResults] = useState<YouTubeResult[]>([]);
  const [isSearchingYouTube, setIsSearchingYouTube] = useState(false);
  const { canSendChatMessage, incrementChatMessages, hasChatLimit } = usePlanLimits();
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if the user can send a message based on their plan limits
    if (!canSendChatMessage()) {
      setIsPremiumDialogOpen(true);
      return;
    }
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Increment the usage counter
    incrementChatMessages();
    
    // Check if the user is asking for YouTube videos
    if (input.toLowerCase().includes('vidéo') || input.toLowerCase().includes('video') || input.toLowerCase().includes('youtube')) {
      // Extract search terms (remove words like "video", "youtube", etc.)
      const searchTerms = input
        .toLowerCase()
        .replace(/vidéo|video|youtube|cherche|trouve|recherche|montre/g, '')
        .trim();
      
      handleYouTubeSearch(searchTerms);
    } else {
      // Regular message response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          content: getAiResponse(input),
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
      }, 1000);
    }
  };
  
  const handleYouTubeSearch = (query: string) => {
    setIsSearchingYouTube(true);
    
    // Mock YouTube search - in a real app, this would call an API
    setTimeout(() => {
      // Mock results for MRC and Kamto videos
      const mockResults: YouTubeResult[] = [
        {
          id: "abc123",
          title: "Maurice Kamto - Discours officiel MRC 2023",
          thumbnail: "https://via.placeholder.com/120x90.png?text=MRC+Kamto",
          channelTitle: "MRC Officiel"
        },
        {
          id: "def456",
          title: "Analyse politique: La situation au Cameroun avec le MRC",
          thumbnail: "https://via.placeholder.com/120x90.png?text=Analyse+MRC",
          channelTitle: "Politique Africaine"
        },
        {
          id: "ghi789",
          title: "Interview exclusive avec Maurice Kamto",
          thumbnail: "https://via.placeholder.com/120x90.png?text=Interview+Kamto",
          channelTitle: "Afrique Media"
        }
      ];
      
      setYoutubeResults(mockResults);
      
      // Add AI response about the search
      const aiResponse: Message = {
        id: messages.length + 2,
        content: `Voici quelques vidéos sur ${query} que j'ai trouvées pour vous :`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setIsSearchingYouTube(false);
    }, 1500);
  };
  
  const handleVideoSelect = (videoId: string, title: string) => {
    // In a real app, this would play the video or redirect to YouTube
    const aiResponse: Message = {
      id: messages.length + 1,
      content: `Voici la vidéo "${title}" que vous avez sélectionnée.`,
      sender: 'ai',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, aiResponse]);
    setYoutubeResults([]);
    
    toast({
      title: "Vidéo sélectionnée",
      description: `Vous avez sélectionné la vidéo: ${title}`,
    });
  };
  
  // Simple AI response generator
  const getAiResponse = (query: string): string => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('mrc')) {
      return "Le MRC (Mouvement pour la Renaissance du Cameroun) est un parti politique camerounais fondé en 2012. Son président est Maurice Kamto. Le parti prône des valeurs démocratiques et une meilleure gouvernance pour le Cameroun.";
    }
    
    if (lowercaseQuery.includes('kamto')) {
      return "Maurice Kamto est un homme politique camerounais, président du MRC et ancien candidat à l'élection présidentielle de 2018. Il est également juriste international et a été ministre délégué à la Justice du Cameroun de 2004 à 2011.";
    }
    
    if (lowercaseQuery.includes('cameroun')) {
      return "Le Cameroun est un pays d'Afrique centrale. Sa capitale politique est Yaoundé et sa capitale économique est Douala. Le pays fait face à divers défis politiques et économiques, avec plusieurs partis politiques actifs dont le MRC.";
    }
    
    if (lowercaseQuery.includes('bonjour') || lowercaseQuery.includes('salut') || lowercaseQuery.includes('hello')) {
      return "Bonjour ! Comment puis-je vous aider aujourd'hui concernant le MRC ou les actualités du Cameroun ?";
    }
    
    return "Je n'ai pas d'information spécifique sur ce sujet. Pourriez-vous préciser votre question concernant le MRC ou le Cameroun ? Je peux aussi rechercher des vidéos YouTube pour vous si vous le souhaitez.";
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Assistant MRC</h1>
        
        <div className="max-w-3xl mx-auto h-[70vh] flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-mrc-blue" />
                <div>
                  <CardTitle className="text-lg">Assistant MRC</CardTitle>
                  <CardDescription>Posez vos questions sur le MRC et le Cameroun</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-hidden flex flex-col">
              <ChatMessageList className="flex-1">
                {messages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    <ChatBubbleAvatar
                      className="h-8 w-8 shrink-0"
                      src={message.sender === "user" ? undefined : "/assets/mrc-logo.png"}
                      fallback={message.sender === "user" ? "U" : "MRC"}
                    />
                    <ChatBubbleMessage
                      variant={message.sender === "user" ? "sent" : "received"}
                    >
                      {message.content}
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))}
                
                {isLoading && (
                  <ChatBubble variant="received">
                    <ChatBubbleAvatar
                      className="h-8 w-8 shrink-0"
                      src="/assets/mrc-logo.png"
                      fallback="MRC"
                    />
                    <ChatBubbleMessage isLoading />
                  </ChatBubble>
                )}
              </ChatMessageList>
              
              {youtubeResults.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <YoutubeIcon className="h-4 w-4 mr-1 text-red-600" />
                    Résultats YouTube
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {youtubeResults.map((result) => (
                      <div 
                        key={result.id}
                        className="border rounded-md p-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
                        onClick={() => handleVideoSelect(result.id, result.title)}
                      >
                        <div className="relative aspect-video mb-1">
                          <img 
                            src={result.thumbnail} 
                            alt={result.title}
                            className="w-full h-full object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-80">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                        <h4 className="text-xs font-medium line-clamp-2">{result.title}</h4>
                        <p className="text-xs text-muted-foreground">{result.channelTitle}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {hasChatLimit() && <PremiumBanner type="chat" className="mt-auto mb-4" />}
              
              <div className="mt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <ChatInput
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question ou demandez des vidéos..."
                    onSubmit={handleSendMessage}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim() || isSearchingYouTube}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <PremiumDialog 
        isOpen={isPremiumDialogOpen} 
        onClose={() => setIsPremiumDialogOpen(false)} 
      />
    </MainLayout>
  );
};

export default AssistantPage;
