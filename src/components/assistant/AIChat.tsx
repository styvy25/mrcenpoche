
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Send, Download, Bot, User, Key, Youtube, Info } from "lucide-react";
import { APIKeyForm } from "../settings/APIKeyForm";

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
    
    const apiKeys = localStorage.getItem("api_keys");
    if (!apiKeys) {
      toast({
        title: "Configuration requise",
        description: "Veuillez d'abord configurer vos clés API.",
        variant: "destructive",
      });
      return;
    }

    const { perplexity } = JSON.parse(apiKeys);
    
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${perplexity}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `Tu es Styvy237, un assistant spécialisé dans la formation politique du MRC (Mouvement pour la Renaissance du Cameroun). 
              
Ton rôle est d'accompagner les militants et sympathisants dans leur formation politique en:
- Répondant à toutes les questions liées au MRC, son histoire, son programme et ses activités
- Expliquant les valeurs et principes défendus par le parti
- Fournissant des informations sur l'actualité politique camerounaise
- Donnant des conseils sur l'engagement militant
- Orientant vers des ressources utiles (documents, vidéos, articles)

Sois précis, factuel et professionnel dans tes réponses. 
Utilise un ton engageant mais respectueux. Évite tout parti pris ou déclaration qui pourrait être perçue comme provocatrice.`
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.2,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur API');
      }

      const data = await response.json();
      const aiMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la communication avec l'assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl overflow-hidden border border-white/10">
      {!localStorage.getItem("api_keys") && (
        <div className="p-4">
          <APIKeyForm />
        </div>
      )}
      
      <div className="bg-gradient-mrc text-white p-4 backdrop-blur-lg border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Bot className="mr-2" /> Assistant IA Styvy237
          </h2>
          <p className="text-sm opacity-80">Votre guide personnalisé pour la formation MRC</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20" onClick={handleGeneratePDF}>
            <Download size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/60">
        {messages.map((message, index) => (
          <Card key={index} className={`p-4 max-w-[85%] ${
            message.role === "assistant" 
              ? "bg-mrc-blue/20 backdrop-blur-sm border border-mrc-blue/30 text-white ml-0" 
              : "bg-mrc-green/20 backdrop-blur-sm border border-mrc-green/30 text-white ml-auto"
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
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </Card>
        ))}
        {isLoading && (
          <Card className="p-4 max-w-[85%] bg-mrc-blue/20 backdrop-blur-sm border border-mrc-blue/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 rounded-full bg-mrc-blue animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </Card>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez votre question à Styvy237..."
            className="flex-1 bg-gray-800/70 border-white/20"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-mrc-blue hover:bg-mrc-blue/80"
          >
            <Send size={18} />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleGeneratePDF}
            title="Générer un PDF"
            className="bg-gray-800/70 border-white/20 hover:bg-gray-700/70"
          >
            <Download size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
