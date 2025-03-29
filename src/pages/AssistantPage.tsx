
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Download, Send, Video, YoutubeIcon } from 'lucide-react';
import { ChatMessageList } from '@/components/ui/chat-message-list';
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import PremiumBanner from '@/components/premium/PremiumBanner';
import PremiumDialog from '@/components/premium/PremiumDialog';
import { useToast } from '@/components/ui/use-toast';
import { getPerplexityResponse } from '@/components/assistant/services/perplexityChat';
import { searchMRCVideos } from '@/components/assistant/services/youtubeService';
import { useApiKeys } from '@/hooks/useApiKeys';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  downloadable?: boolean;
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
      content: "Bonjour ! Je suis Styvy-237, votre assistant MRC. Je peux vous aider avec des informations sur le MRC, Maurice Kamto, et les actualités du Cameroun. Je peux aussi rechercher des vidéos YouTube pour vous. Comment puis-je vous aider aujourd'hui ?",
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
  const { keys, keyStatus } = useApiKeys();

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
      // Use Perplexity API if key is available
      if (keyStatus.perplexity && keys.perplexity) {
        try {
          const aiResponse = await getPerplexityResponse(keys.perplexity, input);
          
          const responseMessage: Message = {
            id: messages.length + 2,
            content: aiResponse,
            sender: 'ai',
            timestamp: new Date(),
            downloadable: true
          };
          
          setMessages(prev => [...prev, responseMessage]);
        } catch (error) {
          console.error("Error getting Perplexity response:", error);
          // Fallback to offline response
          const fallbackResponse: Message = {
            id: messages.length + 2,
            content: getAiResponse(input),
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, fallbackResponse]);
        }
      } else {
        // Fallback to offline response if no API key
        const aiResponse: Message = {
          id: messages.length + 2,
          content: getAiResponse(input),
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }
      setIsLoading(false);
    }
  };
  
  const handleYouTubeSearch = async (query: string) => {
    setIsSearchingYouTube(true);
    
    if (keyStatus.youtube && keys.youtube) {
      try {
        const results = await searchMRCVideos(keys.youtube, query);
        
        if (results && results.length > 0) {
          // Format results for display
          const formattedResults: YouTubeResult[] = results.map(video => ({
            id: video.id,
            title: video.title,
            thumbnail: video.thumbnail,
            channelTitle: video.channelTitle
          }));
          
          setYoutubeResults(formattedResults);
          
          // Add AI response about the search
          const aiResponse: Message = {
            id: messages.length + 2,
            content: `Voici quelques vidéos sur "${query}" que j'ai trouvées pour vous :`,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
        } else {
          // No results found
          const aiResponse: Message = {
            id: messages.length + 2,
            content: `Je n'ai pas trouvé de vidéos concernant "${query}". Pouvez-vous essayer avec d'autres termes de recherche ?`,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, aiResponse]);
        }
      } catch (error) {
        console.error("Error searching YouTube:", error);
        // Fallback to mock response
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
          }
        ];
        
        setYoutubeResults(mockResults);
        
        const aiResponse: Message = {
          id: messages.length + 2,
          content: `Voici quelques vidéos sur ${query} que j'ai trouvées pour vous (mode hors-ligne) :`,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiResponse]);
      }
    } else {
      // No YouTube API key, use mock data
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
        }
      ];
      
      setYoutubeResults(mockResults);
      
      const aiResponse: Message = {
        id: messages.length + 2,
        content: `Voici quelques vidéos sur ${query} que j'ai trouvées pour vous (mode démo) :`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }
    
    setIsLoading(false);
    setIsSearchingYouTube(false);
  };
  
  const handleVideoSelect = (videoId: string, title: string) => {
    // In a real app, this would play the video or redirect to YouTube
    const aiResponse: Message = {
      id: messages.length + 1,
      content: `Voici la vidéo "${title}" que vous avez sélectionnée. Vous pouvez la regarder sur YouTube: https://www.youtube.com/watch?v=${videoId}`,
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
  
  const handleDownloadPDF = (content: string) => {
    try {
      const doc = new jsPDF();
      
      // Add MRC logo and title
      doc.setFontSize(22);
      doc.setTextColor(0, 82, 164); // MRC blue
      doc.text("MRC en Poche", 105, 20, { align: "center" });
      
      doc.setFontSize(16);
      doc.setTextColor(100, 100, 100);
      doc.text("Rapport généré par Styvy-237", 105, 30, { align: "center" });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      const date = new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      doc.text(`Généré le ${date}`, 105, 40, { align: "center" });
      
      // Add content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Split content into paragraphs and format for PDF
      const splitText = doc.splitTextToSize(content, 180);
      doc.text(splitText, 15, 60);
      
      // Save the PDF
      doc.save("MRC_Rapport.pdf");
      
      toast({
        title: "PDF généré",
        description: "Le rapport a été téléchargé avec succès",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF",
        variant: "destructive"
      });
    }
  };
  
  // Simple AI response generator for offline mode
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

  // Load configuration from API keys
  useEffect(() => {
    // Check if we have valid API keys
    if (!keyStatus.perplexity && !keyStatus.youtube) {
      toast({
        title: "Configuration requise",
        description: "Pour une expérience optimale, configurez vos clés API dans les paramètres.",
        variant: "default",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.location.href = '/settings'}
          >
            Configurer
          </Button>
        )
      });
    }
  }, [keyStatus, toast]);

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
                  <CardTitle className="text-lg">Styvy-237</CardTitle>
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
                    <div className="flex flex-col w-full">
                      <ChatBubbleMessage
                        variant={message.sender === "user" ? "sent" : "received"}
                      >
                        {message.content}
                      </ChatBubbleMessage>
                      
                      {message.downloadable && message.sender === 'ai' && (
                        <div className="flex justify-end mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center gap-1 text-xs"
                            onClick={() => handleDownloadPDF(message.content)}
                          >
                            <Download className="h-3 w-3" />
                            Télécharger en PDF
                          </Button>
                        </div>
                      )}
                    </div>
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
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question ou demandez des vidéos..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={1}
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
