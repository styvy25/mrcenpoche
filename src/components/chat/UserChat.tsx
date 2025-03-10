
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Users, Clock } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

// Dummy data for demonstration
const CURRENT_USER_ID = "user_1";
const dummyUsers: User[] = [
  { id: "user_1", name: "Vous", avatar: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png", isOnline: true },
  { id: "user_2", name: "Thierry Kamto", avatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png", isOnline: true },
  { id: "user_3", name: "Marie Ngoh", avatar: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png", isOnline: false, lastSeen: new Date(Date.now() - 25 * 60 * 1000) },
  { id: "user_4", name: "Paul Biya", isOnline: true },
  { id: "user_5", name: "Kamto Maurice", isOnline: false, lastSeen: new Date(Date.now() - 120 * 60 * 1000) },
];

const initialMessages: Message[] = [
  {
    id: "msg_1",
    senderId: "user_2",
    senderName: "Thierry Kamto",
    senderAvatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
    content: "Salut! Comment avancez-vous avec les modules de formation?",
    timestamp: new Date(Date.now() - 35 * 60 * 1000)
  },
  {
    id: "msg_2",
    senderId: "user_1",
    senderName: "Vous",
    senderAvatar: "/lovable-uploads/0a7e7325-0ab5-4f67-b830-1e1b22984ac8.png",
    content: "Ça avance bien! J'ai terminé le module sur l'histoire du MRC. Je trouve le contenu très intéressant.",
    timestamp: new Date(Date.now() - 34 * 60 * 1000)
  },
  {
    id: "msg_3",
    senderId: "user_3",
    senderName: "Marie Ngoh",
    senderAvatar: "/lovable-uploads/e326c83f-f666-44e5-9da1-72639a1027e0.png",
    content: "J'ai eu quelques difficultés avec le quiz de communication politique. Les questions sont assez techniques!",
    timestamp: new Date(Date.now() - 28 * 60 * 1000)
  },
  {
    id: "msg_4",
    senderId: "user_2",
    senderName: "Thierry Kamto",
    senderAvatar: "/lovable-uploads/487ae071-af40-445e-b753-7fea7f39e90f.png",
    content: "C'est vrai que ce module est plus complexe. N'hésitez pas à utiliser l'assistant AI pour des explications supplémentaires!",
    timestamp: new Date(Date.now() - 20 * 60 * 1000)
  }
];

const UserChat = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState<User[]>(dummyUsers);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: CURRENT_USER_ID,
      senderName: "Vous",
      senderAvatar: dummyUsers.find(u => u.id === CURRENT_USER_ID)?.avatar,
      content: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate response (for demo)
    if (messages.length % 3 === 0) {
      setTimeout(() => {
        const responderId = activeUsers.filter(u => u.id !== CURRENT_USER_ID && u.isOnline)[
          Math.floor(Math.random() * (activeUsers.filter(u => u.id !== CURRENT_USER_ID && u.isOnline).length))
        ].id;
        
        const responder = activeUsers.find(u => u.id === responderId);
        
        const response: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: responderId,
          senderName: responder?.name || "Utilisateur",
          senderAvatar: responder?.avatar,
          content: "Merci pour votre message. Continuons cette discussion sur les modules de formation du MRC!",
          timestamp: new Date()
        };

        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatLastSeen = (date?: Date) => {
    if (!date) return "il y a longtemps";
    
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    
    if (minutes < 60) return `il y a ${minutes} min`;
    if (minutes < 24 * 60) return `il y a ${Math.floor(minutes / 60)} h`;
    return `il y a ${Math.floor(minutes / (60 * 24))} j`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-3 flex flex-col h-full">
        <CardHeader className="pb-3 pt-4">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users size={20} className="text-mrc-blue" />
            Discussion entre apprenants
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col h-full p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.senderId === CURRENT_USER_ID ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.senderId === CURRENT_USER_ID ? 'flex-row-reverse' : 'flex-row'}`}>
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      {message.senderAvatar ? (
                        <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      ) : (
                        <AvatarFallback className="bg-mrc-blue text-white">
                          {message.senderName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      message.senderId === CURRENT_USER_ID
                        ? 'bg-mrc-blue text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <div className="font-medium text-xs mb-1">
                        {message.senderId !== CURRENT_USER_ID ? message.senderName : 'Vous'}
                      </div>
                      <p>{message.content}</p>
                      <div className="text-xs opacity-70 mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!newMessage.trim()}
                className="bg-mrc-blue hover:bg-blue-700"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      <Card className="h-full hidden md:flex flex-col">
        <CardHeader className="pb-3 pt-4">
          <CardTitle className="text-lg">Utilisateurs actifs</CardTitle>
        </CardHeader>
        <CardContent className="px-2">
          <ScrollArea className="h-full">
            <div className="space-y-2 px-2">
              {activeUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="relative">
                    <Avatar>
                      {user.avatar ? (
                        <AvatarImage src={user.avatar} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-mrc-blue text-white">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span 
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-800 ${
                        user.isOnline ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium text-sm truncate">
                      {user.name}
                      {user.id === CURRENT_USER_ID && " (Vous)"}
                    </p>
                    {!user.isOnline && user.lastSeen && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <Clock size={12} className="mr-1" />
                        Vu {formatLastSeen(user.lastSeen)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserChat;
