
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Send, Download, Bot, User } from "lucide-react";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: Date;
}

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Bonjour, je suis Styvy237, votre assistant IA pour la formation MRC. Comment puis-je vous aider aujourd'hui?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      let response: Message;
      
      if (input.toLowerCase().includes("pdf") || input.toLowerCase().includes("document")) {
        response = {
          role: "assistant",
          content: "Je peux vous aider à générer un PDF sur les modules de formation que vous avez suivis. Cliquez sur le bouton de téléchargement pour obtenir votre support de formation personnalisé.",
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes("module") || input.toLowerCase().includes("formation")) {
        response = {
          role: "assistant",
          content: "Le MRC propose plusieurs modules de formation, notamment sur l'historique du parti, les stratégies de mobilisation, les enjeux politiques au Cameroun, et les techniques de communication politique. Quel sujet vous intéresse particulièrement?",
          timestamp: new Date()
        };
      } else if (input.toLowerCase().includes("mrc") || input.toLowerCase().includes("parti")) {
        response = {
          role: "assistant",
          content: "Le Mouvement pour la Renaissance du Cameroun (MRC) est un parti politique camerounais fondé en 2012. Il prône la démocratie, la bonne gouvernance et la modernisation du Cameroun à travers des réformes institutionnelles profondes.",
          timestamp: new Date()
        };
      } else {
        response = {
          role: "assistant",
          content: "Merci pour votre question. En tant qu'assistant de formation pour le MRC, je peux vous aider sur les thèmes relatifs à l'histoire du parti, ses valeurs, ses propositions politiques, et les techniques de mobilisation. N'hésitez pas à me poser des questions spécifiques sur ces sujets.",
          timestamp: new Date()
        };
      }
      
      setMessages(prev => [...prev, response]);
      setIsLoading(false);
    }, 1500);
  };

  const handleGeneratePDF = () => {
    toast({
      title: "PDF en cours de génération",
      description: "Votre document sera téléchargé automatiquement dans quelques instants.",
    });
    
    // Simulate PDF generation
    setTimeout(() => {
      toast({
        title: "PDF généré avec succès",
        description: "Votre document a été téléchargé.",
        variant: "default",
      });
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="bg-mrc-blue text-white p-4">
        <h2 className="text-xl font-bold flex items-center">
          <Bot className="mr-2" /> Assistant IA Styvy237
        </h2>
        <p className="text-sm opacity-80">Votre guide personnalisé pour la formation MRC</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <Card key={index} className={`p-4 max-w-[80%] ${
            message.role === "assistant" 
              ? "bg-blue-50 dark:bg-blue-900/30 ml-0" 
              : "bg-green-50 dark:bg-green-900/30 ml-auto"
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "assistant" ? "bg-mrc-blue text-white" : "bg-mrc-green text-white"
              }`}>
                {message.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {message.role === "assistant" ? "Styvy237" : "Vous"}
                </p>
                <p className="mt-1 text-sm">{message.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </Card>
        ))}
        {isLoading && (
          <Card className="p-4 max-w-[80%] bg-blue-50 dark:bg-blue-900/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </Card>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t bg-white dark:bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question à Styvy237..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-mrc-blue hover:bg-blue-700"
          >
            <Send size={18} />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleGeneratePDF}
            title="Générer un PDF"
          >
            <Download size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
