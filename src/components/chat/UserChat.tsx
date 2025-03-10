
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Send, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  userAvatar?: string;
  content: string;
  timestamp: Date;
}

interface ChatUser {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

// Utilisateurs fictifs pour la démo
const demoUsers: ChatUser[] = [
  { id: "user1", name: "Jean Kamto", role: "Militant", avatar: "", isOnline: true },
  { id: "user2", name: "Marie Ngo", role: "Cadre", avatar: "", isOnline: true },
  { id: "user3", name: "Paul Mbarga", role: "Sympathisant", avatar: "", isOnline: false, lastSeen: new Date(Date.now() - 25 * 60000) },
  { id: "user4", name: "Sophie Ateba", role: "Formatrice", avatar: "", isOnline: true },
  { id: "user5", name: "Robert Tabi", role: "Militant", avatar: "", isOnline: false, lastSeen: new Date(Date.now() - 120 * 60000) },
];

// Messages fictifs pour la démo
const initialMessages: Message[] = [
  {
    id: "msg1",
    userId: "user1",
    userName: "Jean Kamto",
    userRole: "Militant",
    content: "Bonjour à tous ! Quelqu'un peut me donner des conseils pour organiser une réunion de sensibilisation dans mon quartier ?",
    timestamp: new Date(Date.now() - 45 * 60000)
  },
  {
    id: "msg2",
    userId: "user4",
    userName: "Sophie Ateba",
    userRole: "Formatrice",
    content: "Bonjour Jean ! Je recommande de commencer par identifier un lieu accessible à tous et de préparer des supports visuels simples. N'oublie pas d'inviter personnellement les leaders communautaires.",
    timestamp: new Date(Date.now() - 40 * 60000)
  },
  {
    id: "msg3",
    userId: "user2",
    userName: "Marie Ngo",
    userRole: "Cadre",
    content: "Aussi, prépare quelques questions pour stimuler la discussion. C'est important que les participants se sentent écoutés.",
    timestamp: new Date(Date.now() - 35 * 60000)
  },
  {
    id: "msg4",
    userId: "user1",
    userName: "Jean Kamto",
    userRole: "Militant",
    content: "Merci beaucoup pour ces conseils ! Je vais commencer à organiser ça pour la semaine prochaine.",
    timestamp: new Date(Date.now() - 30 * 60000)
  },
];

const UserChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [activeUsers, setActiveUsers] = useState<ChatUser[]>(demoUsers);
  const [currentUser, setCurrentUser] = useState<ChatUser>({
    id: "currentUser",
    name: "Vous",
    role: "Militant",
    isOnline: true,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date >= today) {
      return "Aujourd'hui";
    } else if (date >= yesterday) {
      return "Hier";
    } else {
      return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const newMsg: Message = {
      id: `msg${messages.length + 1}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      userAvatar: currentUser.avatar,
      content: newMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simuler une réponse après quelques secondes
    setTimeout(() => {
      const responseMsg: Message = {
        id: `msg${messages.length + 2}`,
        userId: "user4",
        userName: "Sophie Ateba",
        userRole: "Formatrice",
        content: "C'est une excellente initiative ! N'hésitez pas à consulter les modules de formation sur la communication politique pour plus d'idées.",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, responseMsg]);
    }, 8000);
  };

  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";
    let currentGroup: Message[] = [];
    
    messages.forEach(message => {
      const messageDate = formatDate(message.timestamp);
      
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: currentGroup });
        }
        currentDate = messageDate;
        currentGroup = [message];
      } else {
        currentGroup.push(message);
      }
    });
    
    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }
    
    return groups;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-mrc-blue" />
              Chat communautaire MRC
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-[60vh]">
              {groupMessagesByDate().map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  <div className="flex justify-center mb-4">
                    <Badge variant="outline" className="bg-gray-50">
                      {group.date}
                    </Badge>
                  </div>
                  
                  {group.messages.map((msg, index) => (
                    <div 
                      key={msg.id}
                      className={`flex mb-4 ${msg.userId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.userId !== currentUser.id && (
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={msg.userAvatar} />
                          <AvatarFallback className="bg-mrc-blue text-white">
                            {msg.userName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div className={`max-w-[80%] ${msg.userId === currentUser.id ? 'bg-mrc-blue text-white' : 'bg-gray-100'} rounded-lg px-4 py-2`}>
                        {msg.userId !== currentUser.id && (
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-sm">{msg.userName}</span>
                            <Badge variant="outline" className="text-xs bg-white/10 ml-2">
                              {msg.userRole}
                            </Badge>
                          </div>
                        )}
                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        <div className={`text-xs mt-1 text-right ${msg.userId === currentUser.id ? 'text-white/70' : 'text-gray-500'}`}>
                          {formatTimestamp(msg.timestamp)}
                        </div>
                      </div>
                      
                      {msg.userId === currentUser.id && (
                        <Avatar className="h-8 w-8 ml-2">
                          <AvatarImage src={currentUser.avatar} />
                          <AvatarFallback className="bg-green-600 text-white">
                            {currentUser.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex w-full gap-2">
              <Input
                placeholder="Écrivez votre message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={newMessage.trim() === ""}
                className="bg-mrc-blue"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <div className="hidden lg:block">
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-mrc-blue" />
              Membres en ligne
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[60vh]">
              <div className="space-y-4">
                {activeUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-mrc-blue text-white">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-white"></span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{user.name}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {user.role}
                        </Badge>
                        {!user.isOnline && user.lastSeen && (
                          <p className="text-xs text-gray-500">
                            Vu il y a {Math.round((Date.now() - user.lastSeen.getTime()) / 60000)} min
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserChat;
