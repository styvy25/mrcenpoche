
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquareText, Sparkles, Send, Mic, Paperclip } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatState } from "./hooks/useChatState";
import AmazonBooksAd from "@/components/assistant/ads/AmazonBooksAd";
import { AnimatedBackground } from "@/components/ui/animated-background";
import ActiveUsersList from "./ActiveUsersList";

const FuturisticUserChat = () => {
  const { 
    messages, 
    activeUsers, 
    CURRENT_USER_ID, 
    handleSendMessage, 
    formatTime, 
    formatLastSeen 
  } = useChatState();
  
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    handleSendMessage(newMessage);
    setNewMessage("");
  };

  // Simuler la reconnaissance vocale
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setNewMessage(prev => prev + " Message vocal transcrit");
      }, 3000);
    }
  };

  // Détermine si une pub doit être affichée après un message
  const shouldShowAdAfterMessage = (index: number) => {
    return (index + 1) % 5 === 0 && index !== messages.length - 1;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-3 flex flex-col h-full bg-gradient-to-br from-gray-900 to-gray-900 border-white/10 overflow-hidden relative">
        {/* Background animé pour la discussion */}
        <div className="absolute inset-0 z-0">
          <AnimatedBackground 
            numberOfOrbs={6}
            blur={90}
            intensity={0.5}
          />
        </div>
        
        <CardHeader className="pb-3 pt-4 border-b border-white/10 relative z-10">
          <CardTitle className="text-xl flex items-center gap-2 text-white">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="p-1.5 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green"
            >
              <Users size={18} className="text-white" />
            </motion.div>
            <span className="bg-gradient-to-r from-mrc-blue via-mrc-red to-mrc-green bg-clip-text text-transparent animate-gradient">
              Discussion entre apprenants
            </span>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, 0, -5, 0]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5,
                repeatDelay: 3
              }}
              className="ml-2"
            >
              <Sparkles size={14} className="text-mrc-blue" />
            </motion.div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-0 relative z-10">
          <ScrollArea className="h-full pt-4 px-4 pb-16">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-gray-400">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                  >
                    <MessageSquareText size={40} className="text-mrc-blue/50 mb-3" />
                    <p className="text-lg font-medium mb-2">Aucun message</p>
                    <p className="text-sm text-gray-500">Commencez la conversation avec les autres apprenants</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <div key={message.id}>
                      <motion.div 
                        className={`flex ${message.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'} group`}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.05, 
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <div className={`flex gap-2 max-w-[85%] ${message.senderId === CURRENT_USER_ID ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className="relative">
                            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-offset-gray-900 ring-white/20">
                              {message.senderAvatar ? (
                                <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                              ) : (
                                <AvatarFallback className={`${
                                  message.senderId === CURRENT_USER_ID ? 'bg-mrc-green' : 'bg-mrc-blue'
                                } text-white`}>
                                  {message.senderName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-gray-900"></span>
                          </div>
                          
                          <div className={`rounded-2xl px-4 py-3 text-sm backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg ${
                            message.senderId === CURRENT_USER_ID
                              ? 'bg-gradient-to-r from-mrc-green/20 to-green-950/30 border-mrc-green/30 text-white hover:border-mrc-green/50'
                              : 'bg-gradient-to-r from-mrc-blue/20 to-blue-950/30 border-mrc-blue/30 text-white hover:border-mrc-blue/50'
                          }`}>
                            <div className="font-medium text-xs mb-1 flex items-center gap-1">
                              {message.senderId !== CURRENT_USER_ID ? message.senderName : 'Vous'}
                              {message.senderId === CURRENT_USER_ID && (
                                <span className="inline-flex items-center text-[10px] opacity-60">(vous)</span>
                              )}
                            </div>
                            <p className="leading-relaxed">{message.content}</p>
                            <div className="text-xs opacity-70 mt-1 text-right flex items-center justify-end gap-1">
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green"
                              ></motion.div>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                      
                      {shouldShowAdAfterMessage(index) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="my-6"
                        >
                          <AmazonBooksAd compact={true} />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-white/10 bg-gray-900/80 backdrop-blur-lg">
            <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="ghost"
                className="hidden sm:flex h-10 w-10 rounded-full"
              >
                <Paperclip size={18} className="text-mrc-blue" />
                <span className="sr-only">Joindre un fichier</span>
              </Button>
              
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 bg-gray-800/70 border-white/20 focus:border-mrc-blue/50 focus:ring-1 focus:ring-mrc-blue/30 rounded-full h-10 px-4"
              />
              
              <Button 
                type="button" 
                size="icon"
                variant="ghost"
                onClick={toggleRecording}
                className={`h-10 w-10 rounded-full ${isRecording ? 'bg-red-500/20 text-red-500' : ''}`}
              >
                <Mic size={18} className={isRecording ? "text-red-500 animate-pulse" : "text-mrc-green"} />
                <span className="sr-only">Enregistrer un message</span>
              </Button>
              
              <Button 
                type="submit" 
                size="icon"
                disabled={!newMessage.trim()}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-mrc-blue to-mrc-green hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
                <span className="sr-only">Envoyer</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <ActiveUsersList 
        users={activeUsers}
        currentUserId={CURRENT_USER_ID}
        formatLastSeen={formatLastSeen}
      />
    </div>
  );
};

export default FuturisticUserChat;
